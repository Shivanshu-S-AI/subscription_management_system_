import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import {
  getCustomers,
  getPlans,
  getProducts,
  getTaxRules,
  getQuotationTemplates,
} from "@/lib/data/store";
import { createQuotationAction } from "@/modules/quotations/actions";

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; templateId?: string }>;
}) {
  const { customerId, templateId } = await searchParams;
  const customers = getCustomers();
  const plans = getPlans();
  const products = getProducts();
  const taxes = getTaxRules();
  const templates = getQuotationTemplates();

  const selectedTemplate = templateId
    ? templates.find((t) => t.id === templateId)
    : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/admin/quotations"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Quotations</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Prepare Commercial Quotation
        </h1>
        <p className="text-xs text-body mt-1">
          Draft an offer with product lines, brand variants, and applicable tax rates.
        </p>
      </div>

      <form action={createQuotationAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        {/* Step 1: Customer Selection */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            1. Select Customer
          </span>
          <select
            name="customer_id"
            defaultValue={customerId || ""}
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
          >
            <option value="" disabled>Select customer...</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} ({c.company_name ? `${c.company_name} · ` : ""}{c.email})
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Plan & Template */}
        <div className="pt-4 border-t border-hairline-soft grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
              2. Subscription Plan *
            </span>
            <select
              name="plan_id"
              defaultValue={selectedTemplate?.plan_id || plans[0]?.id}
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price} / {p.billing_frequency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
              Quotation Validity (Days)
            </span>
            <input
              name="validity_days"
              type="number"
              defaultValue={selectedTemplate?.validity_days || 30}
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Step 3: Product and Variant Configuration */}
        <div className="pt-4 border-t border-hairline-soft space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block">
            3. Product & Brand Variant Lines
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
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
                Variant (e.g. Odoo +560)
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

        {/* Step 4: Tax Rate & Notes */}
        <div className="pt-4 border-t border-hairline-soft grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
              Applicable Tax Rule
            </span>
            <select
              name="tax_rate"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              {taxes.map((t) => (
                <option key={t.id} value={t.rate}>
                  {t.name} ({t.rate}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
              Proposal Notes
            </span>
            <textarea
              name="notes"
              rows={2}
              placeholder="Commercial terms, delivery timelines..."
              className="w-full rounded-sm border border-hairline bg-canvas p-2 text-xs text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/quotations"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Save & Generate Quote</span>
          </button>
        </div>
      </form>
    </div>
  );
}

