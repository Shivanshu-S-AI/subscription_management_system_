"use server";

import { revalidatePath } from "next/cache";
import { updateInvoiceStatus, markInvoiceSent } from "@/lib/data/store";
import type { InvoiceStatus } from "@/types/admin";

export async function updateInvoiceStatusAction(
  invoiceId: string,
  newStatus: InvoiceStatus
): Promise<void> {
  updateInvoiceStatus(invoiceId, newStatus);
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin");
  revalidatePath("/staff/invoices");
  revalidatePath(`/staff/invoices/${invoiceId}`);
  revalidatePath("/staff");
}

export async function sendInvoiceAction(invoiceId: string): Promise<void> {
  markInvoiceSent(invoiceId);
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/staff/invoices");
  revalidatePath(`/staff/invoices/${invoiceId}`);
}
