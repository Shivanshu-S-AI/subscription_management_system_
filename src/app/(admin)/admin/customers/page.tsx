import Link from "next/link";
import { getCustomers, getStore } from "@/lib/data/store";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const customers = getCustomers(q);
  const store = getStore();

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <section data-purpose="header-section">
        <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          Sales &amp; Customers
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 mb-2">
          Customer Directory
        </h1>
      </section>

      {/* Filter & Search Bar Area */}
      <section data-purpose="search-bar-section">
        <form
          method="GET"
          className="flex flex-col sm:flex-row gap-3 max-w-2xl"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              name="q"
              defaultValue={q || ""}
              placeholder="Search by customer name, email, or company..."
              type="search"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center items-center px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Search
          </button>
        </form>
      </section>

      {/* BEGIN: CustomerDirectoryTable */}
      <section
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        data-purpose="table-card-container"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                <th className="py-3.5 px-6" scope="col">
                  Customer / Company
                </th>
                <th className="py-3.5 px-6" scope="col">
                  Contact
                </th>
                <th className="py-3.5 px-6" scope="col">
                  Subscriptions
                </th>
                <th className="py-3.5 px-6" scope="col">
                  Invoices
                </th>
                <th className="py-3.5 px-6 text-right" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {customers.map((c) => {
                const subs = store.subscriptions.filter(
                  (s) => s.customer_id === c.id
                );
                const invs = store.invoices.filter((i) => i.customer_id === c.id);
                const activeSubs = subs.filter((s) => s.status === "active");

                return (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {c.full_name}
                      </div>
                      {c.company_name && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {/* Building Icon */}
                          <svg
                            className="h-3.5 w-3.5 text-slate-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{c.company_name}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs">
                        {/* Mail Icon */}
                        <svg
                          className="h-3.5 w-3.5 text-slate-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <a
                          className="hover:underline hover:text-slate-900 dark:hover:text-white"
                          href={`mailto:${c.email}`}
                        >
                          {c.email}
                        </a>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                          {/* Phone Icon */}
                          <svg
                            className="h-3.5 w-3.5 text-slate-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{c.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {subs.length} total
                        </span>
                        {activeSubs.length > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-white/10 text-emerald-700 dark:text-white ring-1 ring-inset ring-emerald-600/20 dark:ring-white/20">
                            {activeSubs.length} active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {invs.length} invoices issued
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 shadow-xs transition-colors"
                        href={`/admin/customers/${c.id}`}
                      >
                        <span>View Profile</span>
                        <span className="text-slate-400 font-sans">↗</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* END: CustomerDirectoryTable */}
    </div>
  );
}
