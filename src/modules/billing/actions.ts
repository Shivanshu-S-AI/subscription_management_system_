"use server";

import { revalidatePath } from "next/cache";
import { runRecurringBilling } from "@/lib/data/store";

export async function runBillingAction() {
  runRecurringBilling();
  revalidatePath("/admin/billing");
  revalidatePath("/admin/invoices");
  revalidatePath("/admin/subscriptions");
  revalidatePath("/admin");
}
