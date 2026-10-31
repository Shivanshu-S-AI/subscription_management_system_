import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ROLE_DESTINATIONS, type UserRole } from "@/lib/constants/roles";
import type { UserProfile } from "./types";

/**
 * Retrieves the current authenticated user along with their verified profile and role.
 */
export async function getCurrentUser(): Promise<{
  user: any | null;
  profile: UserProfile | null;
  role: UserRole | null;
}> {
  const cookieStore = await cookies();
  const devSessionRole = cookieStore.get("brightloop_session_role")?.value as UserRole | undefined;
  const devSessionUser = cookieStore.get("brightloop_session_user")?.value;

  // Support local dev / demo session
  if (devSessionRole === "admin" || devSessionRole === "staff" || devSessionRole === "customer") {
    const isDevAdmin = devSessionRole === "admin";
    const isDevStaff = devSessionRole === "staff";

    let adminName = "Brightloop Administrator";
    let adminEmail = "admin@brightloopsoftware.com";
    let adminId = "admin-dev-id";

    let staffName = "Alex Rivera";
    let staffEmail = "staff@brightloopsoftware.com";
    let staffId = "staff-001";

    if (devSessionUser) {
      const u = devSessionUser.toLowerCase().trim();
      if (u === "shivanshu" || u.startsWith("shivanshu@")) {
        adminName = "Shivanshu";
        adminEmail = "shivanshu@brightloopsoftware.com";
        adminId = "admin-shivanshu";
      } else if (u === "aryan" || u.startsWith("aryan@")) {
        adminName = "Aryan";
        adminEmail = "aryan@brightloopsoftware.com";
        adminId = "admin-aryan";
      } else if (u === "hiren" || u === "hirensir" || u.startsWith("hiren@")) {
        adminName = "Hiren Sir";
        adminEmail = "hiren@brightloopsoftware.com";
        adminId = "admin-hiren";
      } else if (u === "james" || u.startsWith("james@") || u.includes("james")) {
        staffName = "James Wilson";
        staffEmail = "james.ops@brightloopsoftware.com";
        staffId = "staff-002";
      } else if (u === "alex" || u.startsWith("alex@") || u.startsWith("staff@")) {
        staffName = "Alex Rivera";
        staffEmail = "staff@brightloopsoftware.com";
        staffId = "staff-001";
      }
    }

    let customerName = "Sarah Jenkins (Apex Cloud)";
    let customerEmail = "customer@brightloopsoftware.com";
    let customerId = "cust-001";

    if (!isDevAdmin && !isDevStaff && devSessionUser) {
      const lower = devSessionUser.toLowerCase().trim();
      if (lower.includes("customer") || lower.includes("apex") || lower.includes("sarah")) {
        customerName = "Sarah Jenkins (Apex Cloud)";
        customerEmail = lower.includes("@") ? lower : "customer@brightloopsoftware.com";
        customerId = "cust-001";
      } else if (lower.includes("chen") || lower.includes("nexus")) {
        customerName = "Michael Chen (Nexus Dynamics)";
        customerEmail = "ops@nexusdynamics.co";
        customerId = "cust-002";
      } else if (lower.includes("rostova") || lower.includes("strata")) {
        customerName = "Elena Rostova (Strata Labs)";
        customerEmail = "analytics@stratalabs.com";
        customerId = "cust-003";
      } else {
        customerName = "Sarah Jenkins (Apex Cloud)";
        customerEmail = lower;
        customerId = "cust-001";
      }
    }

    const devUser = {
      id: isDevAdmin ? adminId : isDevStaff ? staffId : customerId,
      email: isDevAdmin
        ? adminEmail
        : isDevStaff
        ? staffEmail
        : customerEmail,
    };
    const devProfile: UserProfile = {
      id: devUser.id,
      email: devUser.email,
      full_name: isDevAdmin
        ? adminName
        : isDevStaff
        ? staffName
        : customerName,
      role: devSessionRole,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return {
      user: devUser,
      profile: devProfile,
      role: devSessionRole,
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    return { user: null, profile: null, role: null };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, profile: null, role: null };
    }

    // Fetch verified profile from database
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      return {
        user,
        profile: profile as UserProfile,
        role: (profile.role as UserRole) || "customer",
      };
    }

    // Fallback: If profile row was not yet created by trigger, create it securely via admin client
    const admin = createAdminClient();
    const fallbackProfile = {
      id: user.id,
      email: user.email || "",
      full_name: (user.user_metadata?.full_name as string) || "",
      role: "customer" as UserRole,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await admin.from("profiles").upsert(fallbackProfile, { onConflict: "id" });

    return {
      user,
      profile: fallbackProfile as UserProfile,
      role: "customer",
    };
  } catch {
    return {
      user: null,
      profile: null,
      role: null,
    };
  }
}

/**
 * Resolves the destination URL for a given role.
 */
export function getRoleDestination(role: UserRole): string {
  return ROLE_DESTINATIONS[role] || "/portal";
}
