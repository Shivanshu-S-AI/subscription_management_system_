"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createDiscount, updateDiscount } from "@/lib/data/store";
import type { DiscountType, DiscountApplicability } from "@/types/admin";

export async function createDiscountAction(formData: FormData) {
  const code = (formData.get("code") as string)?.trim().toUpperCase();
  const description = (formData.get("description") as string) || "";
  const discount_type = (formData.get("discount_type") as DiscountType) || "percentage";
  const discount_value = parseFloat(formData.get("discount_value") as string) || 0;
  const min_purchase_amount = formData.get("min_purchase_amount")
    ? parseFloat(formData.get("min_purchase_amount") as string)
    : undefined;
  const min_quantity = formData.get("min_quantity")
    ? parseInt(formData.get("min_quantity") as string)
    : undefined;
  const start_date = (formData.get("start_date") as string) || undefined;
  const end_date = (formData.get("end_date") as string) || undefined;
  const usage_limit = formData.get("usage_limit")
    ? parseInt(formData.get("usage_limit") as string)
    : undefined;
  const applies_to = (formData.get("applies_to") as DiscountApplicability) || "all_subscriptions";
  const product_id = (formData.get("product_id") as string) || undefined;

  createDiscount({
    code,
    description,
    discount_type,
    discount_value,
    min_purchase_amount,
    min_quantity,
    start_date,
    end_date,
    usage_limit,
    applies_to,
    product_id,
    is_active: true,
  });

  revalidatePath("/admin/discounts");
  redirect("/admin/discounts");
}

