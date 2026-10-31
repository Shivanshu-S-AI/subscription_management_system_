import Link from "next/link";
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
      {/* BEGIN: PageHeader */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4"
        data-purpose="page-headline"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Catalog &amp; Pricing
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Products &amp; Variants
          </h1>
        </div>
        <div className="flex items-center">
          {/* Add Product Action */}
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              />
            </svg>
            <span>Add Product</span>
          </Link>
        </div>
      </div>
      {/* END: PageHeader */}

      {/* BEGIN: SearchFilterBar */}
      <form
        method="GET"
        className="flex flex-col sm:flex-row gap-3"
        data-purpose="product-search-filters"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <input
            name="q"
            defaultValue={q || ""}
            placeholder="Search products by name or type..."
            type="search"
            className="block w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/20 focus:border-slate-900 dark:focus:border-white shadow-xs transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2 shrink-0"
        >
          Search
        </button>
      </form>
      {/* END: SearchFilterBar */}

      {/* BEGIN: ProductsTableContainer */}
      <div
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        data-purpose="products-table"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left">
            {/* Table Column Headers */}
            <thead>
              <tr className="bg-slate-50/75 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Product Name &amp; Notes
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Type
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Sales Price
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Cost Price
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Variants
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right"
                  scope="col"
                >
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body Content */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-sm">
              {products.map((p) => {
                const typeUpper = p.type?.toUpperCase() || "SOFTWARE";
                const badgeColor =
                  typeUpper === "SOFTWARE"
                    ? "bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-white border-blue-200/60 dark:border-white/20"
                    : typeUpper === "ADDON"
                    ? "bg-purple-50 dark:bg-white/10 text-purple-700 dark:text-white border-purple-200/60 dark:border-white/20"
                    : typeUpper === "SERVICE"
                    ? "bg-amber-50 dark:bg-white/10 text-amber-700 dark:text-white border-amber-200/60 dark:border-white/20"
                    : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white border-slate-200 dark:border-white/20";

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Name & Description */}
                    <td className="py-4 px-6 align-top max-w-sm">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {p.notes || "No notes"}
                      </div>
                    </td>
                    {/* Product Type Badge */}
                    <td className="py-4 px-6 align-top">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}
                      >
                        {typeUpper}
                      </span>
                    </td>
                    {/* Sales Price */}
                    <td className="py-4 px-6 align-top">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(p.sales_price)}
                      </span>
                    </td>
                    {/* Cost Price */}
                    <td className="py-4 px-6 align-top">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {formatCurrency(p.cost_price)}
                      </span>
                    </td>
                    {/* Configurable Variants List */}
                    <td className="py-4 px-6 align-top">
                      {p.variants.length === 0 ? (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          No variants
                        </span>
                      ) : (
                        <div className="space-y-1.5 max-w-xs">
                          {p.variants.map((v) => (
                            <div
                              key={v.id}
                              className="flex items-center justify-between text-xs gap-3"
                            >
                              <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                                {v.name}:
                              </span>
                              <span className="font-semibold text-emerald-600 dark:text-white shrink-0 font-mono">
                                +{formatCurrency(v.price_adjustment)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    {/* Edit Action */}
                    <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors shadow-2xs"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                        <span>Edit</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* END: ProductsTableContainer */}
    </div>
  );
}
