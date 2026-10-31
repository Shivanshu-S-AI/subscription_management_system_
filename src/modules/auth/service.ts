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
  try {
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
      user,
      profile: null,
      role: "customer",
    };
  }
}

/**
 * Resolves the destination URL for a given role.
 */
export function getRoleDestination(role: UserRole): string {
  return ROLE_DESTINATIONS[role] || "/portal";
}
