"use server";

import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validatePassword, validateEmail } from "./validation";
import { ROLE_DESTINATIONS, type UserRole } from "@/lib/constants/roles";
import type { AuthResponse } from "./types";

/**
 * Public Customer Registration Action
 */
export async function signUpCustomerAction(
  _prevState: AuthResponse | null,
  formData: FormData
): Promise<AuthResponse> {
  const fullName = (formData.get("fullName") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  // 1. Validation
  if (!fullName) {
    return { success: false, error: "Please enter your full name." };
  }

  if (!email || !validateEmail(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return {
      success: false,
      error: passwordValidation.errors[0] || "Invalid password.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    const cookieStore = await cookies();
    cookieStore.set("brightloop_session_role", "customer", { path: "/" });
    redirect("/portal");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return {
        success: false,
        error: "An account with this email address already exists. Please log in.",
      };
    }
    return {
      success: false,
      error: error.message || "Failed to create account. Please try again.",
    };
  }

  if (data?.user) {
    try {
      const admin = createAdminClient();
      await admin.from("profiles").upsert(
        {
          id: data.user.id,
          email,
          full_name: fullName,
          role: "customer",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    } catch {
      // Handled in trigger
    }
  }

  if (data?.user && !data?.session) {
    return {
      success: true,
      message:
        "Registration successful! Please check your email to verify your account before logging in.",
      redirectTo: "/login?registered=true",
    };
  }

  redirect("/portal");
}

/**
 * Customer Login Action
 */
export async function signInAction(
  _prevState: AuthResponse | null,
  formData: FormData
): Promise<AuthResponse> {
  const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
  const password = (formData.get("password") as string) || "";
  const redirectTarget = (formData.get("redirect") as string) || "";

  if (!email || !validateEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!password) {
    return { success: false, error: "Please enter your password." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    const cookieStore = await cookies();
    cookieStore.set("brightloop_session_role", "customer", { path: "/" });
    redirect("/portal");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }

  let role: UserRole = "customer";
  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role) {
      role = profile.role as UserRole;
    }
  }

  const destination = redirectTarget || ROLE_DESTINATIONS[role] || "/portal";
  redirect(destination);
}

/**
 * Internal Login Action for Admin & Staff
 */
export async function internalSignInAction(
  _prevState: AuthResponse | null,
  formData: FormData
): Promise<AuthResponse> {
  const identifier = (formData.get("identifier") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const redirectTarget = (formData.get("redirect") as string) || "";

  if (!identifier) {
    return { success: false, error: "Please enter your Account Identifier or Email." };
  }

  if (!password) {
    return { success: false, error: "Please enter your password." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Seamless dev/local authentication support
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    const lower = identifier.toLowerCase();
    const isAdmin = lower.includes("admin");
    const isStaff = lower.includes("staff");

    if (isAdmin || isStaff) {
      const assignedRole = isAdmin ? "admin" : "staff";
      const cookieStore = await cookies();
      cookieStore.set("brightloop_session_role", assignedRole, { path: "/" });
      const dest = redirectTarget || ROLE_DESTINATIONS[assignedRole];
      redirect(dest);
    }
  }

  const email = identifier.includes("@")
    ? identifier.toLowerCase()
    : `${identifier.toLowerCase()}@brightloopsoftware.com`;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: "Authentication failed. Check your identifier and password.",
    };
  }

  let role: UserRole = "customer";
  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role) {
      role = profile.role as UserRole;
    }
  }

  if (role !== "admin" && role !== "staff") {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "Access restricted: This portal is for Brightloop internal staff and administrators only.",
    };
  }

  const destination = redirectTarget || ROLE_DESTINATIONS[role];
  redirect(destination);
}

/**
 * Password Recovery Request Action
 */
export async function forgotPasswordAction(
  _prevState: AuthResponse | null,
  formData: FormData
): Promise<AuthResponse> {
  const email = (formData.get("email") as string)?.trim().toLowerCase() || "";

  if (!email || !validateEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectTo = `${protocol}://${host}/reset-password`;

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  return {
    success: true,
    message:
      "If an account with that email exists, we have sent a password reset link. Please check your inbox and spam folder.",
  };
}

/**
 * Reset Password Action
 */
export async function resetPasswordAction(
  _prevState: AuthResponse | null,
  formData: FormData
): Promise<AuthResponse> {
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return {
      success: false,
      error: passwordValidation.errors[0] || "Invalid password.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to update password. Your reset link may have expired.",
    };
  }

  return {
    success: true,
    message: "Your password has been successfully updated. You can now log in.",
    redirectTo: "/login?reset=success",
  };
}

/**
 * Sign Out Action
 */
export async function signOutAction() {
  const cookieStore = await cookies();
  const currentRole = cookieStore.get("brightloop_session_role")?.value;
  cookieStore.delete("brightloop_session_role");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Fallback
    }
  }

  if (currentRole === "customer") {
    redirect("/login");
  } else {
    redirect("/internal-login");
  }
}
