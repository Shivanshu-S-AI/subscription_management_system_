import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getCustomers, getPlans, getProducts, getTaxRules } from "@/lib/data/store";
import { createSubscriptionAction } from "@/modules/subscriptions/actions";

export default function NewSubscriptionPage() {
  const customers = getCustomers();
  const plans = getPlans();
  const products = getProducts();
  const taxes = getTaxRules();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/admin/subscriptions"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Subscriptions</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Create New Subscription
        </h1>
        <p className="text-xs text-body mt-1">
          Directly provision a subscription contract with designated line items.
        </p>
      </div>

      <form action={createSubscriptionAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Select Customer *
          </label>
          <select
            name="customer_id"
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} ({c.company_name ? `${c.company_name} · ` : ""}{c.email})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Assigned Plan *
            </label>
            <select
              name="plan_id"
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Cadence *
            </label>
            <select
              name="billing_frequency"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Payment Terms
            </label>
            <select
              name="payment_terms"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
              <option value="Due upon receipt">Due upon receipt</option>
            </select>
          </div>
        </div>

        {/* Product & Variant Line Item */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            Primary Subscribed Line Item
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-ink mb-1">
                Product *
              </label>
              <select
                name="product_id"
                required
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.sales_price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ink mb-1">
                Variant (Optional)
              </label>
              <select
                name="variant_id"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                <option value="">Standard Edition ($0)</option>
                {products.flatMap((p) => p.variants).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (+${v.price_adjustment})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ink mb-1">
                Quantity *
              </label>
              <input
                name="quantity"
                type="number"
                defaultValue={1}
                min={1}
                required
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/subscriptions"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Create Subscription</span>
          </button>
        </div>
      </form>
    </div>
  );
}

