"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validatePassword, validateEmail } from "./validation";
import { ROLE_DESTINATIONS, type UserRole } from "@/lib/constants/roles";
import type { AuthResponse } from "./types";

/**
 * Public Customer Registration Action
 * Enforces email uniqueness, strict password rules, and assigns customer role on server.
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

  const supabase = await createClient();

  // 2. Perform Supabase Sign Up
  // Notice we explicitly store full_name in user metadata, and our DB trigger sets role = 'customer'
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

  // 3. Ensure profile exists with customer role
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
      // Background trigger will also guarantee role
    }
  }

  // If email confirmation is required by Supabase:
  if (data?.user && !data?.session) {
    return {
      success: true,
      message:
        "Registration successful! Please check your email to verify your account before logging in.",
      redirectTo: "/login?registered=true",
    };
  }

  // Direct login session established
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

  // Retrieve user role from profiles
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
 * Shared entry point for operational team members.
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

  // Support both standard email or Brightloop internal ID format
  const email = identifier.includes("@") ? identifier.toLowerCase() : `${identifier.toLowerCase()}@brightloopsoftware.com`;

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

  // Verify internal role
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
    // If a customer tries to log in through internal portal, log them out and inform them
    await supabase.auth.signOut();
    return {
      success: false,
      error: "Access restricted: This portal is for Brightloop internal staff and administrators only. Please use the Customer Login.",
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

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    // Don't leak whether an account exists or not for security
    console.error("Password reset error:", error);
  }

  return {
    success: true,
    message:
      "If an account with that email exists, we have sent a password reset link. Please check your inbox and spam folder.",
  };
}

/**
 * Reset Password Action (User is authenticated via the reset token link)
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
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
