import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getPlans, getProducts } from "@/lib/data/store";
import { createTemplateAction } from "@/modules/quotations/actions";

export default function NewQuotationTemplatePage() {
  const plans = getPlans();
  const products = getProducts();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/quotation-templates"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Templates</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          New Quotation Template
        </h1>
        <p className="text-xs text-body mt-1">
          Preset bundle configurations to streamline repetitive sales workflows.
        </p>
      </div>

      <form action={createTemplateAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Template Name *
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Standard Corporate Data Bundle"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Assigned Subscription Plan *
            </label>
            <select
              name="plan_id"
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price}/{p.billing_frequency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Validity Days *
            </label>
            <input
              name="validity_days"
              type="number"
              defaultValue={30}
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Template Description
          </label>
          <textarea
            name="description"
            rows={2}
            placeholder="Commercial summary of items included in this proposal..."
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        {/* Preconfigured Item Lines */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            Primary Preconfigured Product
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                Default Qty *
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
            href="/admin/quotation-templates"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Template</span>
          </button>
        </div>
      </form>
    </div>
  );
}

