import Link from "next/link";
import { CreditCard, Plus, ArrowUpRight, Building } from "lucide-react";
import { getPayments } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ invoice_id?: string; customer_id?: string }>;
}) {
  const { invoice_id, customer_id } = await searchParams;
  const payments = getPayments({ invoice_id, customer_id });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Operations & Cashflow
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Payment Reconciliation
          </h1>
          <p className="text-xs text-body mt-1">
            Manual recording and cross-matching of incoming bank statements, wires, and card settlements.
          </p>
        </div>

        <Link
          href={invoice_id ? `/staff/payments/new?invoice_id=${invoice_id}` : "/staff/payments/new"}
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Record Payment</span>
        </Link>
      </div>

      {/* Filter notice if filtered by invoice */}
      {invoice_id && (
        <div className="flex items-center justify-between p-3 rounded-sm border border-hairline bg-canvas text-xs font-mono">
          <span>Filtering payments for invoice: {invoice_id}</span>
          <Link href="/staff/payments" className="text-link hover:underline">
            Clear filter
          </Link>
        </div>
      )}

      {/* Payments Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Payment Ref</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Associated Invoice</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Payment Date</th>
                <th className="px-5 py-3 font-medium text-right">Amount Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-mute">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-5 py-4 font-mono font-semibold text-ink">
                      {p.payment_reference}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/staff/customers/${p.customer_id}`}
                        className="font-medium text-ink hover:underline block"
                      >
                        {p.customer?.company_name || p.customer?.full_name}
                      </Link>
                      <span className="font-mono text-[11px] text-mute block mt-0.5">
                        {p.customer?.email}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/staff/invoices/${p.invoice_id}`}
                        className="font-mono font-medium text-ink hover:underline inline-flex items-center gap-1"
                      >
                        <span>{p.invoice?.invoice_number || p.invoice_id}</span>
                        <ArrowUpRight className="h-3 w-3 text-mute" />
                      </Link>
                    </td>
                    <td className="px-5 py-4 capitalize text-body">
                      {p.payment_method.replace("_", " ")}
                    </td>
                    <td className="px-5 py-4 font-mono text-mute">{p.payment_date}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-emerald-600">
                      +${p.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
