"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPlan, updatePlan } from "@/lib/data/store";
import type { BillingFrequency } from "@/types/admin";

export async function createPlanAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const price = parseFloat(formData.get("price") as string) || 0;
  const billing_frequency = (formData.get("billing_frequency") as BillingFrequency) || "monthly";
  const min_quantity = parseInt(formData.get("min_quantity") as string) || 1;
  const start_date = (formData.get("start_date") as string) || undefined;
  const end_date = (formData.get("end_date") as string) || undefined;

  const auto_close = formData.get("auto_close") === "on";
  const early_close_eligible = formData.get("early_close_eligible") === "on";
  const pause_eligible = formData.get("pause_eligible") === "on";
  const renewal_eligible = formData.get("renewal_eligible") === "on";

  createPlan({
    name,
    price,
    billing_frequency,
    min_quantity,
    start_date,
    end_date,
    auto_close,
    early_close_eligible,
    pause_eligible,
    renewal_eligible,
    is_active: true,
  });

  revalidatePath("/admin/plans");
  redirect("/admin/plans");
}

export async function updatePlanAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const price = parseFloat(formData.get("price") as string) || 0;
  const billing_frequency = (formData.get("billing_frequency") as BillingFrequency) || "monthly";
  const min_quantity = parseInt(formData.get("min_quantity") as string) || 1;

  const auto_close = formData.get("auto_close") === "on";
  const early_close_eligible = formData.get("early_close_eligible") === "on";
  const pause_eligible = formData.get("pause_eligible") === "on";
  const renewal_eligible = formData.get("renewal_eligible") === "on";

  updatePlan(id, {
    name,
    price,
    billing_frequency,
    min_quantity,
    auto_close,
    early_close_eligible,
    pause_eligible,
    renewal_eligible,
  });

  revalidatePath("/admin/plans");
  revalidatePath(`/admin/plans/${id}`);
  redirect("/admin/plans");
}

