import Link from "next/link";
import { FileText, Plus, ArrowUpRight } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Sales & Customers
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Quotations
          </h1>
          <p className="text-xs text-body mt-1">
            Commercial offers prepared for prospects and existing accounts.
          </p>
        </div>

        <Link
          href="/admin/quotations/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Quotation</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/admin/quotations"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status || status === "all"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All Quotes
        </Link>
        <Link
          href="/admin/quotations?status=draft"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "draft"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/quotations?status=sent"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "sent"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Sent / Open
        </Link>
        <Link
          href="/admin/quotations?status=converted"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "converted"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Converted to Subscription
        </Link>
      </div>

      {/* Quotations Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Quote #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Total Amount</th>
                <th className="px-5 py-3 font-medium">Valid Until</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-semibold text-ink">
                    <Link href={`/admin/quotations/${q.id}`} className="hover:text-link">
                      {q.quote_number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/customers/${q.customer_id}`}
                      className="font-medium text-ink hover:text-link block"
                    >
                      {q.customer?.full_name}
                    </Link>
                    <span className="text-[11px] text-mute">
                      {q.customer?.company_name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-body">
                    {q.plan?.name || "Custom Plan"}
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {formatCurrency(q.total_amount)}
                  </td>
                  <td className="px-5 py-4 font-mono text-mute">
                    {q.valid_until}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                        q.status === "converted"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : q.status === "sent"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-canvas text-mute border border-hairline"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/quotations/${q.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <span>View</span>
                      <ArrowUpRight className="h-3 w-3 text-mute" />
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

