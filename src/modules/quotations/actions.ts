"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createQuotationTemplate,
  createQuotation,
  convertQuotationToSubscription,
} from "@/lib/data/store";
import { getCurrentUser } from "@/modules/auth/service";

export async function createTemplateAction(formData: FormData) {
  const { role } = await getCurrentUser();
  if (role !== "admin") {
    throw new Error("Unauthorized: Only administrators can create quotation templates.");
  }

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string) || "";
  const plan_id = formData.get("plan_id") as string;
  const validity_days = parseInt(formData.get("validity_days") as string) || 30;

  const product_id = formData.get("product_id") as string;
  const variant_id = (formData.get("variant_id") as string) || undefined;
  const quantity = parseInt(formData.get("quantity") as string) || 1;

  createQuotationTemplate({
    name,
    description,
    plan_id,
    validity_days,
    lines: product_id ? [{ product_id, variant_id, quantity }] : [],
  });

  revalidatePath("/admin/quotation-templates");
  redirect("/admin/quotation-templates");
}

export async function createQuotationAction(formData: FormData) {
  const workspace = (formData.get("workspace") as string) || "admin";
  const customer_id = formData.get("customer_id") as string;
  const plan_id = formData.get("plan_id") as string;
  const template_id = (formData.get("template_id") as string) || undefined;
  const validity_days = parseInt(formData.get("validity_days") as string) || 30;
  const notes = (formData.get("notes") as string) || "";

  const product_id = formData.get("product_id") as string;
  const variant_id = (formData.get("variant_id") as string) || undefined;
  const quantity = parseInt(formData.get("quantity") as string) || 1;
  const tax_rate = parseFloat(formData.get("tax_rate") as string) || 10.0;

  const newQuote = createQuotation({
    customer_id,
    plan_id,
    template_id,
    validity_days,
    notes,
    lines: [
      {
        product_id,
        variant_id,
        quantity,
        tax_rate,
      },
    ],
  });

  revalidatePath("/admin/quotations");
  revalidatePath("/staff/quotations");
  revalidatePath("/admin");
  revalidatePath("/staff");

  if (workspace === "staff") {
    redirect(`/staff/quotations/${newQuote.id}`);
  } else {
    redirect(`/admin/quotations/${newQuote.id}`);
  }
}

export async function convertQuoteAction(quoteId: string, workspace: "admin" | "staff" = "admin") {
  const ws = typeof workspace === "string" ? workspace : "admin";
  const sub = convertQuotationToSubscription(quoteId);
  revalidatePath("/admin/quotations");
  revalidatePath(`/admin/quotations/${quoteId}`);
  revalidatePath("/admin/subscriptions");
  revalidatePath("/staff/quotations");
  revalidatePath(`/staff/quotations/${quoteId}`);
  revalidatePath("/staff/subscriptions");
  revalidatePath("/admin");
  revalidatePath("/staff");

  if (sub) {
    if (ws === "staff") {
      redirect(`/staff/subscriptions/${sub.id}`);
    } else {
      redirect(`/admin/subscriptions/${sub.id}`);
    }
  }
}
