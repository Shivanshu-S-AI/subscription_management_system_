import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createProductAction } from "@/modules/products/actions";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Products</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Create New Product
        </h1>
        <p className="text-xs text-body mt-1">
          Add a software service, standalone add-on, and optional pricing variants.
        </p>
      </div>

      <form action={createProductAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Product Name *
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Brightloop Statistical Engine"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Product Type *
            </label>
            <select
              name="type"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="software">Software</option>
              <option value="service">Service</option>
              <option value="addon">Add-on</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Sales Price ($) *
            </label>
            <input
              name="sales_price"
              type="number"
              step="0.01"
              required
              placeholder="1200.00"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Cost Price ($)
            </label>
            <input
              name="cost_price"
              type="number"
              step="0.01"
              placeholder="350.00"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Internal Notes / Description
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Operational notes, specifications, or usage boundaries..."
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        {/* Variant Configuration */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-1">
            Configurable Variant (Optional)
          </span>
          <p className="text-[11px] text-mute mb-3">
            Add a variant with dedicated pricing adjustments (e.g. Odoo brand adding $560).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-ink mb-1">
                Variant Name
              </label>
              <input
                name="variant_name"
                placeholder="e.g. Odoo Brand Integration"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-ink mb-1">
                Price Adjustment ($)
              </label>
              <input
                name="variant_adjustment"
                type="number"
                step="0.01"
                placeholder="560.00"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/products"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}

