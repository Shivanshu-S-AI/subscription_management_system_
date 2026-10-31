import Link from "next/link";
import { getPlans } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default function PlansPage() {
  const plans = getPlans();

  return (
    <div className="space-y-6">
      {/* BEGIN: HeaderSection */}
      <section
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2"
        data-purpose="page-header"
      >
        <div>
          <p className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
            CATALOG &amp; PRICING
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Subscription Plans
          </h1>
        </div>
        <div>
          <Link
            href="/admin/plans/new"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
          >
            <svg
              className="w-4 h-4 stroke-[2.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Create Plan</span>
          </Link>
        </div>
      </section>
      {/* END: HeaderSection */}

      {/* BEGIN: TableContainer */}
      <div
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden"
        data-purpose="plans-table-card"
      >
        <div className="overflow-x-auto">
          <table
            className="w-full text-left border-collapse min-w-[768px]"
            id="subscription-plans-table"
          >
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200/70 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-semibold">
                <th className="py-3.5 px-6" scope="col">
                  PLAN NAME
                </th>
                <th className="py-3.5 px-6" scope="col">
                  CADENCE
                </th>
                <th className="py-3.5 px-6" scope="col">
                  PRICE
                </th>
                <th className="py-3.5 px-6" scope="col">
                  MIN QTY
                </th>
                <th className="py-3.5 px-6" scope="col">
                  LIFECYCLE POLICIES
                </th>
                <th className="py-3.5 px-6 text-right" scope="col">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {plans.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors duration-150 group"
                >
                  {/* Plan Name & Duration */}
                  <td className="py-4 px-6 align-middle">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1 font-mono tracking-tight">
                      {p.start_date || "Anytime"} → {p.end_date || "Open-ended"}
                    </div>
                  </td>
                  {/* Cadence */}
                  <td className="py-4 px-6 align-middle">
                    <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 uppercase tracking-wide font-mono">
                      {p.billing_frequency}
                    </span>
                  </td>
                  {/* Price */}
                  <td className="py-4 px-6 align-middle whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                      {formatCurrency(p.price)}
                    </div>
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400 block mt-0.5">
                      / {p.billing_frequency}
                    </span>
                  </td>
                  {/* Min Quantity */}
                  <td className="py-4 px-6 align-middle whitespace-nowrap">
                    <div className="font-semibold text-slate-900 dark:text-white leading-tight text-sm">
                      {p.min_quantity}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      seat(s)
                    </span>
                  </td>
                  {/* Lifecycle Policies */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {p.auto_close ? (
                        <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs px-2.5 py-1 rounded-md font-medium">
                          Auto-close
                        </span>
                      ) : (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          Continuous
                        </span>
                      )}
                      {p.early_close_eligible && (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          Early Close
                        </span>
                      )}
                      {p.pause_eligible && (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          Pauseable
                        </span>
                      )}
                      {p.renewal_eligible && (
                        <span className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          Renewable
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Action Button */}
                  <td className="py-4 px-6 align-middle text-right whitespace-nowrap">
                    <Link
                      href={`/admin/plans/${p.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* END: TableContainer */}
    </div>
  );
}
