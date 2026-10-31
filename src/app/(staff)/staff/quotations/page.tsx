import Link from "next/link";
import { FileText, Plus, ArrowUpRight } from "lucide-react";
import { getQuotations } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffQuotationsPage({
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
            Operations
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Customer Quotations
          </h1>
          <p className="text-xs text-body mt-1">
            Commercial offers and proposals prepared for customers and prospects.
          </p>
        </div>

        <Link
          href="/staff/quotations/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Quotation</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/staff/quotations"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status || status === "all"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All Quotes
        </Link>
        <Link
          href="/staff/quotations?status=draft"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "draft"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Draft
        </Link>
        <Link
          href="/staff/quotations?status=sent"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "sent"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Sent
        </Link>
        <Link
          href="/staff/quotations?status=approved"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "approved"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Approved
        </Link>
        <Link
          href="/staff/quotations?status=converted"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "converted"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Converted
        </Link>
        <Link
          href="/staff/quotations?status=expired"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "expired"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Expired
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Quote #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Valid Until</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Total Amount</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-mute">
                    No quotations found in this view.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => {
                  const isConverted = q.status === "converted";
                  const isExpired = q.status === "expired";
                  const isSent = q.status === "sent";

                  return (
                    <tr key={q.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-medium text-ink">
                        <Link
                          href={`/staff/quotations/${q.id}`}
                          className="hover:underline font-semibold"
                        >
                          {q.quote_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-ink">
                          {q.customer?.company_name || q.customer?.full_name}
                        </div>
                        <div className="font-mono text-[11px] text-mute">{q.customer?.email}</div>
                      </td>
                      <td className="px-5 py-4 text-body">
                        {q.plan?.name || "Custom Selection"}
                      </td>
                      <td className="px-5 py-4 font-mono text-mute">{q.valid_until}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                            isConverted
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isExpired
                              ? "bg-red-50 text-red-700 border-red-200"
                              : isSent
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-zinc-100 text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-ink">
                        ${q.total_amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/staff/quotations/${q.id}`}
                          className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                        >
                          <span>Review</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

