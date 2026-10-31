"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct, updateProduct } from "@/lib/data/store";

export async function createProductAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const type = (formData.get("type") as string) || "software";
  const sales_price = parseFloat(formData.get("sales_price") as string) || 0;
  const cost_price = parseFloat(formData.get("cost_price") as string) || 0;
  const notes = (formData.get("notes") as string) || "";

  // Variant fields
  const variantName = (formData.get("variant_name") as string)?.trim();
  const variantAdjustment = parseFloat(formData.get("variant_adjustment") as string) || 0;

  const variants = [];
  if (variantName) {
    variants.push({
      name: variantName,
      price_adjustment: variantAdjustment,
      cost_adjustment: 0,
    });
  }

  createProduct({
    name,
    type,
    sales_price,
    cost_price,
    notes,
    variants,
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const type = (formData.get("type") as string) || "software";
  const sales_price = parseFloat(formData.get("sales_price") as string) || 0;
  const cost_price = parseFloat(formData.get("cost_price") as string) || 0;
  const notes = (formData.get("notes") as string) || "";

  updateProduct(id, {
    name,
    type,
    sales_price,
    cost_price,
    notes,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  redirect("/admin/products");
}

