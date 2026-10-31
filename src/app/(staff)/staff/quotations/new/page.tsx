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

export const dynamic = "force-dynamic";

export default async function StaffNewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ customer_id?: string; template_id?: string; product_id?: string }>;
}) {
  const { customer_id, template_id, product_id } = await searchParams;
  const customers = getCustomers();
  const plans = getPlans();
  const products = getProducts();
  const taxes = getTaxRules();
  const templates = getQuotationTemplates();

  const selectedTemplate = template_id
    ? templates.find((t) => t.id === template_id)
    : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/staff/quotations"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Quotations</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Prepare Customer Quotation
        </h1>
        <p className="text-xs text-body mt-1">
          Select customer account, select plan or offer template, configure products & variant pricing, and calculate taxes.
        </p>
      </div>

      <form
        action={createQuotationAction}
        className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6"
      >
        <input type="hidden" name="workspace" value="staff" />

        {/* Step 1: Customer Selection */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            1. Customer Account *
          </span>
          <select
            name="customer_id"
            defaultValue={customer_id || ""}
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
              min={1}
              max={180}
              defaultValue={selectedTemplate?.validity_days || 30}
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink font-mono"
            />
          </div>
        </div>

        {/* Step 3: Quotation Template (Optional) */}
        {templates.length > 0 && (
          <div className="pt-4 border-t border-hairline-soft">
            <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
              3. Preset Offer Template (Optional)
            </span>
            <select
              name="template_id"
              defaultValue={template_id || ""}
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="">No template (Custom quotation)</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name} ({tpl.validity_days} days validity)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 4: Product Line & Brand Variant */}
        <div className="pt-4 border-t border-hairline-soft space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block">
            4. Product Line Configuration
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-medium text-ink block mb-1">
                Select Product *
              </label>
              <select
                name="product_id"
                defaultValue={product_id || products[0]?.id}
                required
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                {products.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} (${prod.sales_price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-ink block mb-1">
                Select Brand / Edition Variant (Optional)
              </label>
              <select
                name="variant_id"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                <option value="">Standard Base Edition</option>
                {products.flatMap((prod) =>
                  prod.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {prod.name} - {v.name} (+${v.price_adjustment})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-medium text-ink block mb-1">
                Quantity *
              </label>
              <input
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                required
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-ink block mb-1">
                Tax Rate *
              </label>
              <select
                name="tax_rate"
                defaultValue={taxes.find((t) => t.is_default)?.rate || 10}
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink font-mono"
              >
                {taxes.map((t) => (
                  <option key={t.id} value={t.rate}>
                    {t.name} ({t.rate}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 5: Commercial Notes */}
        <div className="pt-4 border-t border-hairline-soft">
          <label className="text-[11px] font-medium text-ink block mb-1">
            Notes / Payment Terms Agreement
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="e.g. Net 15 terms agreed. 20% introductory discount applied."
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline">
          <Link
            href="/staff/quotations"
            className="h-8 rounded-sm border border-hairline px-3 text-xs font-medium text-body hover:bg-canvas transition-colors inline-flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-4 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Save & Generate Quotation</span>
          </button>
        </div>
      </form>
    </div>
  );
}
