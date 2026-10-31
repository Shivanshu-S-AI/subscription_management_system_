"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSubscription,
  updateSubscriptionStatus,
} from "@/lib/data/store";
import type { SubscriptionStatus, BillingFrequency } from "@/types/admin";

export async function createSubscriptionAction(formData: FormData) {
  const workspace = (formData.get("workspace") as string) || "admin";
  const customer_id = formData.get("customer_id") as string;
  const plan_id = formData.get("plan_id") as string;
  const billing_frequency = (formData.get("billing_frequency") as BillingFrequency) || "monthly";
  const payment_terms = (formData.get("payment_terms") as string) || "Net 15";

  const product_id = formData.get("product_id") as string;
  const variant_id = (formData.get("variant_id") as string) || undefined;
  const quantity = parseInt(formData.get("quantity") as string) || 1;
  const tax_rate = parseFloat(formData.get("tax_rate") as string) || 10.0;

  const newSub = createSubscription({
    customer_id,
    plan_id,
    billing_frequency,
    payment_terms,
    lines: [
      {
        product_id,
        variant_id,
        quantity,
        tax_rate,
      },
    ],
  });

  revalidatePath("/admin/subscriptions");
  revalidatePath("/staff/subscriptions");
  revalidatePath("/admin");
  revalidatePath("/staff");

  if (workspace === "staff") {
    redirect(`/staff/subscriptions/${newSub.id}`);
  } else {
    redirect(`/admin/subscriptions/${newSub.id}`);
  }
}

export async function updateSubStatusAction(
  subscriptionId: string,
  newStatus: SubscriptionStatus
): Promise<void> {
  updateSubscriptionStatus(subscriptionId, newStatus);
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/subscriptions/${subscriptionId}`);
  revalidatePath("/staff/subscriptions");
  revalidatePath(`/staff/subscriptions/${subscriptionId}`);
  revalidatePath("/admin");
  revalidatePath("/staff");
}
