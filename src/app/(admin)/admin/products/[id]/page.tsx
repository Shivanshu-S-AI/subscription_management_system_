import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { getProductById } from "@/lib/data/store";
import { updateProductAction } from "@/modules/products/actions";
import { formatCurrency } from "@/lib/utils";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const updateWithId = updateProductAction.bind(null, product.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Products</span>
      </Link>

      <div className="border-b border-hairline pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Edit: {product.name}
          </h1>
          <p className="text-xs text-body mt-1">
            Update pricing, classification, and review active variants.
          </p>
        </div>
      </div>

      <form action={updateWithId} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Product Name *
          </label>
          <input
            name="name"
            defaultValue={product.name}
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Product Type *
            </label>
            <select
              name="type"
              defaultValue={product.type}
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
              defaultValue={product.sales_price}
              required
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
              defaultValue={product.cost_price}
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
            defaultValue={product.notes || ""}
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        {/* Existing Variants List */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            Active Variants ({product.variants.length})
          </span>
          {product.variants.length === 0 ? (
            <p className="text-xs text-mute font-mono">No variants configured for this product.</p>
          ) : (
            <div className="space-y-2">
              {product.variants.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-sm border border-hairline bg-canvas flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <span className="font-semibold text-ink">{v.name}</span>
                    {v.sku && <span className="text-mute ml-2">SKU: {v.sku}</span>}
                  </div>
                  <div className="text-emerald-600 font-semibold">
                    +{formatCurrency(v.price_adjustment)}
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <span>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}

