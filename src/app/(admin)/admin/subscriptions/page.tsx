import Link from "next/link";
import { getSubscriptions } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; customerId?: string; planId?: string }>;
}) {
  const { status, customerId, planId } = await searchParams;
  const subscriptions = getSubscriptions({
    status,
    customer_id: customerId,
    plan_id: planId,
  });

  return (
    <div className="space-y-6">
      {/* BEGIN: PageHeaderSection */}
      <section
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-2"
        data-purpose="page-header"
      >
        <div className="space-y-1">
          {/* Category Eyebrow */}
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            SUBSCRIPTION OPERATIONS
          </p>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mt-1">
            All Subscriptions
          </h1>
        </div>
        {/* Primary Action Button */}
        <div>
          <Link
            href="/admin/subscriptions/new"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/20 active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4.5v15m7.5-7.5h-15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>New Subscription</span>
          </Link>
        </div>
      </section>
      {/* END: PageHeaderSection */}

      {/* BEGIN: FilterTabs */}
      <section data-purpose="status-filters">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/admin/subscriptions"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors mb-2 ${
              !status || status === "all"
                ? "bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>All</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                !status || status === "all"
                  ? "bg-slate-800 dark:bg-slate-200 text-slate-300 dark:text-slate-800"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {subscriptions.length}
            </span>
          </Link>

          <Link
            href="/admin/subscriptions?status=active"
            className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors mb-2 ${
              status === "active"
                ? "font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Active
          </Link>

          <Link
            href="/admin/subscriptions?status=confirmed"
            className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors mb-2 ${
              status === "confirmed"
                ? "font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Confirmed
          </Link>

          <Link
            href="/admin/subscriptions?status=paused"
            className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors mb-2 ${
              status === "paused"
                ? "font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Paused
          </Link>

          <Link
            href="/admin/subscriptions?status=closed"
            className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors mb-2 ${
              status === "closed"
                ? "font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Closed
          </Link>
        </div>
      </section>
      {/* END: FilterTabs */}

      {/* BEGIN: SubscriptionsDataTable */}
      <section
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        data-purpose="subscriptions-table-card"
      >
        <div className="overflow-x-auto">
          <table
            className="min-w-full text-left border-collapse min-w-[850px]"
            id="subscriptions-table"
          >
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800">
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  SUBSCRIPTION #
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  CUSTOMER
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  PLAN
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  CADENCE
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  NEXT BILLING
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  TOTAL AMOUNT
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  STATUS
                </th>
                <th
                  className="py-3.5 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right"
                  scope="col"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-sm">
              {subscriptions.map((s) => {
                const statusColor =
                  s.status === "active"
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60"
                    : s.status === "confirmed"
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60"
                    : s.status === "paused"
                    ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";

                return (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Subscription ID */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <Link
                        href={`/admin/subscriptions/${s.id}`}
                        className="font-mono font-bold text-slate-900 dark:text-white tracking-tight text-sm hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {s.subscription_number}
                      </Link>
                    </td>
                    {/* Customer Details */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <Link
                          href={`/admin/customers/${s.customer_id}`}
                          className="font-semibold text-slate-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {s.customer?.full_name}
                        </Link>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                          {s.customer?.company_name}
                        </span>
                      </div>
                    </td>
                    {/* Plan */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {s.plan?.name || "Standard Plan"}
                      </span>
                    </td>
                    {/* Cadence */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider border border-slate-200/60 dark:border-slate-700 font-mono">
                        {s.billing_frequency}
                      </span>
                    </td>
                    {/* Next Billing */}
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 font-medium font-mono">
                      {s.next_billing_date}
                    </td>
                    {/* Total Amount */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {formatCurrency(s.total_amount)}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide border uppercase ${statusColor}`}
                      >
                        {s.status}
                      </span>
                    </td>
                    {/* Action Button */}
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <Link
                        href={`/admin/subscriptions/${s.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all shadow-2xs"
                      >
                        <span>Manage</span>
                        <svg
                          className="w-3 h-3 text-slate-400 dark:text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* END: SubscriptionsDataTable */}
    </div>
  );
}
