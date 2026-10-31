import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getProducts } from "@/lib/data/store";
import { createDiscountAction } from "@/modules/discounts/actions";

export default function NewDiscountPage() {
  const products = getProducts();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/discounts"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Discounts</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Create Discount Rule
        </h1>
        <p className="text-xs text-body mt-1">
          Only the administrator can configure discount rules, eligibility, and caps.
        </p>
      </div>

      <form action={createDiscountAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Discount Code *
            </label>
            <input
              name="code"
              required
              placeholder="e.g. VOLUME20"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono uppercase focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Discount Type *
            </label>
            <select
              name="discount_type"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Discount Value *
            </label>
            <input
              name="discount_value"
              type="number"
              step="0.01"
              required
              placeholder="20.00"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Min Purchase ($)
            </label>
            <input
              name="min_purchase_amount"
              type="number"
              step="0.01"
              placeholder="1000.00"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Min Quantity
            </label>
            <input
              name="min_quantity"
              type="number"
              placeholder="1"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Applicability *
            </label>
            <select
              name="applies_to"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="all_subscriptions">Entire Subscription</option>
              <option value="specific_products">Specific Product Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Target Product (if specific)
            </label>
            <select
              name="product_id"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="">None / All Products</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Start Date
            </label>
            <input
              name="start_date"
              type="date"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              End Date
            </label>
            <input
              name="end_date"
              type="date"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Usage Limit (Cap)
            </label>
            <input
              name="usage_limit"
              type="number"
              placeholder="e.g. 100"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Description / Reason
          </label>
          <textarea
            name="description"
            rows={2}
            placeholder="e.g. Special high-volume discount for contracts over $1,000"
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/discounts"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Discount Rule</span>
          </button>
        </div>
      </form>
    </div>
  );
}

