"use server";

import { revalidatePath } from "next/cache";
import { runRecurringBilling } from "@/lib/data/store";
import { getCurrentUser } from "@/modules/auth/service";

export async function runBillingAction() {
  const { role } = await getCurrentUser();
  if (role !== "admin") {
    throw new Error("Unauthorized: Only administrators can trigger recurring billing runs.");
  }

  runRecurringBilling();
  revalidatePath("/admin/billing");
  revalidatePath("/admin/invoices");
  revalidatePath("/admin/subscriptions");
  revalidatePath("/admin");
  revalidatePath("/staff/invoices");
  revalidatePath("/staff/subscriptions");
  revalidatePath("/staff");
}
