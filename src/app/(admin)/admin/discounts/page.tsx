import Link from "next/link";
import { getDiscounts, getProducts } from "@/lib/data/store";
import type { DiscountRule } from "@/types/admin";

function formatEligibility(d: DiscountRule): string {
  const conditions: string[] = [];
  if (d.min_purchase_amount) {
    conditions.push(`$${d.min_purchase_amount.toLocaleString()} min.`);
  }
  if (d.min_quantity) {
    conditions.push(
      `${d.min_quantity} seat${d.min_quantity === 1 ? "" : "s"} min.`
    );
  }
  return conditions.length > 0 ? conditions.join(" · ") : "None";
}

function formatDiscountValue(d: DiscountRule): string {
  if (d.discount_type === "percentage") {
    return `${d.discount_value}%`;
  }
  return `$${d.discount_value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function DiscountsPage() {
  const discounts = getDiscounts();
  const products = getProducts();

  return (
    <div className="space-y-6">
      {/* BEGIN: PageHeader */}
      <section data-purpose="header-section">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            {/* Eyebrow label */}
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase block mb-1">
              CATALOG &amp; PRICING
            </span>
            {/* Main Page Title */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Discount Rules
            </h1>
          </div>
          {/* Primary Action Button */}
          <div>
            <Link
              href="/admin/discounts/new"
              aria-label="Create new discount rule"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white active:scale-[0.98]"
            >
              <svg
                className="w-4 h-4 stroke-[2.5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4.5v15m7.5-7.5h-15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>New Discount</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: PageHeader */}

      {/* BEGIN: DiscountRulesTableContainer */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden"
        data-purpose="rules-table-card"
      >
        <div className="overflow-x-auto">
          <table
            className="w-full text-left border-collapse min-w-[768px]"
            id="discount-rules-table"
          >
            {/* Table Column Headers */}
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50">
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Code
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Value
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Eligibility
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Applies To
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Usage
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Validity
                </th>
              </tr>
            </thead>
            {/* Table Body Content */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {discounts.map((d) => {
                const targetProduct = d.product_id
                  ? products.find((p) => p.id === d.product_id)
                  : null;

                return (
                  <tr
                    key={d.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-150"
                  >
                    {/* Code Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-md border border-slate-200/70 dark:border-slate-700 inline-block shadow-2xs tracking-tight">
                        {d.code}
                      </span>
                    </td>
                    {/* Value Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatDiscountValue(d)}
                      </span>
                    </td>
                    {/* Eligibility Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {formatEligibility(d)}
                      </span>
                    </td>
                    {/* Applies To Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {d.applies_to === "all_subscriptions"
                          ? "All subscriptions"
                          : targetProduct?.name || "Specific product"}
                      </span>
                    </td>
                    {/* Usage Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 font-mono">
                          {d.times_used} / {d.usage_limit ?? "∞"}
                        </span>
                        {d.usage_limit && (
                          <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden md:block">
                            <div
                              className="bg-slate-400 dark:bg-slate-500 h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round(
                                    (d.times_used / d.usage_limit) * 100
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Validity Column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                        {d.start_date || "Active"} – {d.end_date || "Ongoing"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* END: DiscountRulesTableContainer */}
    </div>
  );
}
