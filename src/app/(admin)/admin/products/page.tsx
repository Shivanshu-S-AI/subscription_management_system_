import Link from "next/link";
import { Package, Plus, Search, Layers, Edit } from "lucide-react";
import { getProducts } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = getProducts(q);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Catalog & Pricing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Products & Variants
          </h1>
          <p className="text-xs text-body mt-1">
            Software products, service offerings, and configurable brand variants.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search Bar */}
      <form method="GET" className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-mute" />
          <input
            name="q"
            defaultValue={q || ""}
            placeholder="Search products by name or type..."
            className="h-9 w-full rounded-sm border border-hairline bg-canvas-elevated pl-9 pr-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
        </div>
        <button
          type="submit"
          className="h-9 rounded-sm bg-ink px-4 text-xs font-medium text-white hover:bg-black transition-colors"
        >
          Search
        </button>
      </form>

      {/* Products Grid / Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Product Name & Notes</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Sales Price</th>
                <th className="px-5 py-3 font-medium">Cost Price</th>
                <th className="px-5 py-3 font-medium">Variants</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4 max-w-xs">
                    <span className="font-semibold text-ink text-sm block">
                      {p.name}
                    </span>
                    <span className="text-xs text-mute line-clamp-1 mt-0.5">
                      {p.notes || "No notes"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink">
                      {p.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {formatCurrency(p.sales_price)}
                  </td>
                  <td className="px-5 py-4 text-mute">
                    {formatCurrency(p.cost_price)}
                  </td>
                  <td className="px-5 py-4">
                    {p.variants.length === 0 ? (
                      <span className="text-mute font-mono text-[11px]">No variants</span>
                    ) : (
                      <div className="space-y-1">
                        {p.variants.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center gap-1.5 text-[11px] font-mono"
                          >
                            <span className="text-ink font-medium">{v.name}:</span>
                            <span className="text-emerald-600">
                              +{formatCurrency(v.price_adjustment)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <Edit className="h-3 w-3 text-mute" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

