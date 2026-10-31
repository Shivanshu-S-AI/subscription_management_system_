import Link from "next/link";
import { getQuotations } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function QuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const quotes = getQuotations(status);

  return (
    <div className="space-y-7">
      {/* Page Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500 tracking-wider uppercase block">
            SALES &amp; CUSTOMERS
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mt-1 mb-2">
            Quotations
          </h1>
        </div>
        {/* Action Button */}
        <div>
          <Link
            href="/admin/quotations/new"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] ring-1 ring-white/10"
          >
            <svg
              className="w-4 h-4 text-gray-300 dark:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.25"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>New Quotation</span>
          </Link>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 border-b border-transparent">
        <Link
          href="/admin/quotations"
          className={`font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap transition-colors ${
            !status || status === "all"
              ? "bg-gray-900 text-white dark:bg-white dark:text-slate-900"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          All Quotes
        </Link>
        <Link
          href="/admin/quotations?status=draft"
          className={`font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap transition-colors ${
            status === "draft"
              ? "bg-gray-900 text-white dark:bg-white dark:text-slate-900"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/quotations?status=sent"
          className={`font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap transition-colors ${
            status === "sent"
              ? "bg-gray-900 text-white dark:bg-white dark:text-slate-900"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          Sent / Open
        </Link>
        <Link
          href="/admin/quotations?status=converted"
          className={`font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap transition-colors ${
            status === "converted"
              ? "bg-gray-900 text-white dark:bg-white dark:text-slate-900"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          Converted to Subscription
        </Link>
      </div>

      {/* BEGIN: QuotationsTableContainer */}
      <div
        className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden"
        data-purpose="quotations-table-wrapper"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[768px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/50 text-[11px] font-semibold text-gray-500 dark:text-slate-400 tracking-wider uppercase">
                <th className="py-3.5 px-6" scope="col">
                  QUOTE #
                </th>
                <th className="py-3.5 px-6" scope="col">
                  CUSTOMER
                </th>
                <th className="py-3.5 px-6" scope="col">
                  PLAN
                </th>
                <th className="py-3.5 px-6" scope="col">
                  TOTAL AMOUNT
                </th>
                <th className="py-3.5 px-6" scope="col">
                  VALID UNTIL
                </th>
                <th className="py-3.5 px-6" scope="col">
                  STATUS
                </th>
                <th className="py-3.5 px-6 text-right" scope="col">
                  ACTION
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Quote Number */}
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white text-sm font-mono">
                    <Link
                      href={`/admin/quotations/${q.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {q.quote_number}
                    </Link>
                  </td>
                  {/* Customer Details */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white leading-snug">
                        {q.customer?.full_name}
                      </span>
                      {q.customer?.company_name && (
                        <span className="text-xs text-gray-500 dark:text-slate-400">
                          {q.customer?.company_name}
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Plan */}
                  <td className="py-4 px-6 text-gray-600 dark:text-slate-300 font-normal">
                    {q.plan?.name || "Custom Plan"}
                  </td>
                  {/* Total Amount */}
                  <td className="py-4 px-6 font-bold text-gray-900 dark:text-white font-mono">
                    {formatCurrency(q.total_amount)}
                  </td>
                  {/* Valid Until */}
                  <td className="py-4 px-6 text-gray-600 dark:text-slate-400 font-normal font-mono">
                    {q.valid_until}
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase font-mono ${
                        q.status === "converted"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/20"
                          : q.status === "sent"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/20"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  {/* Action Link/Button */}
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/quotations/${q.id}`}
                      aria-label={`View quotation ${q.quote_number}`}
                      className="inline-flex items-center gap-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium shadow-2xs transition-all"
                    >
                      <span>View</span>
                      <span className="text-gray-400 font-sans text-xs">↗</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* END: QuotationsTableContainer */}
    </div>
  );
}
