"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createStaffMember } from "@/lib/data/store";
import { getCurrentUser } from "@/modules/auth/service";

export async function addStaffAction(formData: FormData) {
  const { role } = await getCurrentUser();
  if (role !== "admin") {
    throw new Error("Unauthorized: Only administrators can add team members.");
  }

  const full_name = (formData.get("full_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!full_name || !email) {
    throw new Error("Full name and email are required.");
  }

  const result = createStaffMember({
    full_name,
    email,
  });

  if (!result.success) {
    throw new Error(result.error || "Failed to add staff member.");
  }

  revalidatePath("/admin/team");
  redirect("/admin/team");
}
