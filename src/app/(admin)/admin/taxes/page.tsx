import Link from "next/link";
import { getTaxRules } from "@/lib/data/store";

export default function TaxesPage() {
  const taxes = getTaxRules();

  return (
    <div className="space-y-6">
      {/* BEGIN: PageHeader */}
      <section
        className="pb-2 border-b border-slate-200/80 dark:border-slate-800"
        data-purpose="page-header"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2">
          <div>
            {/* Eyebrow label */}
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">
              Catalog &amp; Pricing
            </p>
            {/* Main title */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Tax Configuration
            </h1>
          </div>
          {/* Call to action button */}
          <div className="shrink-0">
            <Link
              href="/admin/taxes/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-sm font-semibold shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white cursor-pointer"
            >
              <svg
                className="h-4 w-4 stroke-[2.5]"
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
              <span>New Tax Rule</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: PageHeader */}

      {/* BEGIN: TaxRulesTableSection */}
      <section
        aria-labelledby="tax-rules-heading"
        data-purpose="tax-table-container"
      >
        <h2 className="sr-only" id="tax-rules-heading">
          Configured Tax Rules List
        </h2>
        {/* Table Card Wrapper */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th
                    className="py-3.5 pl-6 pr-6 sm:pl-8 w-1/4"
                    scope="col"
                  >
                    TAX RULE NAME
                  </th>
                  <th className="py-3.5 px-6 w-1/6" scope="col">
                    RATE (%)
                  </th>
                  <th className="py-3.5 px-6 w-5/12" scope="col">
                    DESCRIPTION
                  </th>
                  <th
                    className="py-3.5 pl-6 pr-6 sm:pr-8 text-right sm:text-left w-1/6"
                    scope="col"
                  >
                    DEFAULT RULE
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {taxes.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-6 sm:pl-8 align-middle">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-slate-950 dark:group-hover:text-white">
                        {t.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums font-mono">
                        {t.rate.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-normal leading-normal">
                        {t.description || "No description"}
                      </p>
                    </td>
                    <td className="py-4 pl-6 pr-6 sm:pr-8 align-middle text-right sm:text-left">
                      {t.is_default ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80">
                          <svg
                            className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="m4.5 12.75 6 6 9-13.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Default System Tax</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium pl-1 select-none font-mono">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* END: TaxRulesTableSection */}
    </div>
  );
}
