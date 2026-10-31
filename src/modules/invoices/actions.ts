"use server";

import { revalidatePath } from "next/cache";
import { updateInvoiceStatus } from "@/lib/data/store";
import type { InvoiceStatus } from "@/types/admin";

export async function updateInvoiceStatusAction(
  invoiceId: string,
  newStatus: InvoiceStatus
) {
  const result = updateInvoiceStatus(invoiceId, newStatus);
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin");
  return result;
}

