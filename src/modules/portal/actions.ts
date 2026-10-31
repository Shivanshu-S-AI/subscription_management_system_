"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/modules/auth/service";
import {
  getCustomerForUser,
  customerPauseSubscription,
  customerResumeSubscription,
  customerRenewSubscription,
} from "@/lib/data/store";

export async function customerPauseAction(subscriptionId: string): Promise<void> {
  const { user } = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please sign in.");

  const customer = getCustomerForUser(user.id || user.email);
  if (!customer) throw new Error("Customer profile not found.");

  const result = customerPauseSubscription(customer.id, subscriptionId);
  if (!result.success) {
    throw new Error(result.error || "Failed to pause subscription.");
  }

  revalidatePath("/portal");
  revalidatePath("/portal/subscriptions");
  revalidatePath(`/portal/subscriptions/${subscriptionId}`);
  revalidatePath("/admin/subscriptions");
  revalidatePath("/staff/subscriptions");
}

export async function customerResumeAction(subscriptionId: string): Promise<void> {
  const { user } = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please sign in.");

  const customer = getCustomerForUser(user.id || user.email);
  if (!customer) throw new Error("Customer profile not found.");

  const result = customerResumeSubscription(customer.id, subscriptionId);
  if (!result.success) {
    throw new Error(result.error || "Failed to resume subscription.");
  }

  revalidatePath("/portal");
  revalidatePath("/portal/subscriptions");
  revalidatePath(`/portal/subscriptions/${subscriptionId}`);
  revalidatePath("/admin/subscriptions");
  revalidatePath("/staff/subscriptions");
}

export async function customerRenewAction(subscriptionId: string): Promise<void> {
  const { user } = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please sign in.");

  const customer = getCustomerForUser(user.id || user.email);
  if (!customer) throw new Error("Customer profile not found.");

  const result = customerRenewSubscription(customer.id, subscriptionId);
  if (!result.success) {
    throw new Error(result.error || "Failed to renew subscription.");
  }

  revalidatePath("/portal");
  revalidatePath("/portal/subscriptions");
  revalidatePath(`/portal/subscriptions/${subscriptionId}`);
  revalidatePath("/admin/subscriptions");
  revalidatePath("/staff/subscriptions");
}

