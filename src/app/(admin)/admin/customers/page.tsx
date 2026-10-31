import Link from "next/link";
import { Users, Search, ArrowUpRight, Plus, Mail, Phone, Building } from "lucide-react";
import { getCustomers, getStore } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Sales & Customers
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Customer Directory
          </h1>
          <p className="text-xs text-body mt-1">
            Accounts, client organizations, and cross-module relationship histories.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form method="GET" className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-mute" />
          <input
            name="q"
            defaultValue={q || ""}
            placeholder="Search by customer name, email, or company..."
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

      {/* Customer Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Customer / Company</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Subscriptions</th>
                <th className="px-5 py-3 font-medium">Invoices</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {customers.map((c) => {
                const subs = store.subscriptions.filter((s) => s.customer_id === c.id);
                const invs = store.invoices.filter((i) => i.customer_id === c.id);
                const activeSubs = subs.filter((s) => s.status === "active");

                return (
                  <tr key={c.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="font-semibold text-ink hover:text-link text-sm block"
                      >
                        {c.full_name}
                      </Link>
                      {c.company_name && (
                        <span className="text-xs text-mute flex items-center gap-1 mt-0.5">
                          <Building className="h-3 w-3" />
                          {c.company_name}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-body space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-mute">
                        <Mail className="h-3 w-3 text-mute" />
                        <span>{c.email}</span>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-mute">
                          <Phone className="h-3 w-3 text-mute" />
                          <span>{c.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink">{subs.length} total</span>
                        {activeSubs.length > 0 && (
                          <span className="rounded-xs bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-mono text-emerald-600 font-medium">
                            {activeSubs.length} active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-body">
                      <span>{invs.length} invoices issued</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                      >
                        <span>View Profile</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

