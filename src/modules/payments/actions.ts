"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { recordPayment } from "@/lib/data/store";
import type { PaymentMethod } from "@/types/admin";

export async function recordPaymentAction(formData: FormData) {
  const workspace = (formData.get("workspace") as string) || "admin";
  const invoice_id = formData.get("invoice_id") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const payment_method = (formData.get("payment_method") as PaymentMethod) || "bank_transfer";
  const payment_date = (formData.get("payment_date") as string) || undefined;
  const notes = (formData.get("notes") as string) || "";

  const result = recordPayment({
    invoice_id,
    amount,
    payment_method,
    payment_date,
    notes,
  });

  if (!result.success) {
    throw new Error(result.error || "Payment recording failed.");
  }

  revalidatePath("/admin/payments");
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${invoice_id}`);
  revalidatePath("/admin");
  revalidatePath("/staff/payments");
  revalidatePath("/staff/invoices");
  revalidatePath(`/staff/invoices/${invoice_id}`);
  revalidatePath("/staff");

  if (workspace === "staff") {
    redirect(`/staff/invoices/${invoice_id}`);
  } else {
    redirect(`/admin/invoices/${invoice_id}`);
  }
}
