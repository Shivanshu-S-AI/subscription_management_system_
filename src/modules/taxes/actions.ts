"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTaxRule, updateTaxRule } from "@/lib/data/store";

export async function createTaxAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const rate = parseFloat(formData.get("rate") as string) || 0;
  const description = (formData.get("description") as string) || "";
  const is_default = formData.get("is_default") === "on";

  createTaxRule({
    name,
    rate,
    description,
    is_active: true,
    is_default,
  });

  revalidatePath("/admin/taxes");
  redirect("/admin/taxes");
}

export async function updateTaxAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const rate = parseFloat(formData.get("rate") as string) || 0;
  const description = (formData.get("description") as string) || "";
  const is_default = formData.get("is_default") === "on";

  updateTaxRule(id, {
    name,
    rate,
    description,
    is_default,
  });

  revalidatePath("/admin/taxes");
  redirect("/admin/taxes");
}

