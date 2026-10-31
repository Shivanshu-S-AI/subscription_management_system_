import Link from "next/link";
import { CreditCard, Plus, ArrowUpRight, Search, Building } from "lucide-react";
import { getPayments, getInvoices } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ invoiceId?: string; customerId?: string }>;
}) {
  const { invoiceId, customerId } = await searchParams;
  const payments = getPayments({ invoice_id: invoiceId, customer_id: customerId });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Finance & Cashflow
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Payment Reconciliation
          </h1>
          <p className="text-xs text-body mt-1">
            Manual recording and cross-matching of incoming bank statements, wires, and card settlements.
          </p>
        </div>

        <Link
          href={invoiceId ? `/admin/payments/new?invoiceId=${invoiceId}` : "/admin/payments/new"}
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Record New Payment</span>
        </Link>
      </div>

      {/* Filter notice if filtered by invoice */}
      {invoiceId && (
        <div className="flex items-center justify-between p-3 rounded-sm border border-hairline bg-canvas text-xs font-mono">
          <span>Filtering payments for invoice: {invoiceId}</span>
          <Link href="/admin/payments" className="text-link hover:underline">
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
                <th className="px-5 py-3 font-medium">Amount Received</th>
                <th className="px-5 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-semibold text-ink">
                    {p.payment_reference}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/customers/${p.customer_id}`}
                      className="font-medium text-ink hover:text-link block"
                    >
                      {p.customer?.full_name}
                    </Link>
                    <span className="text-[11px] text-mute">
                      {p.customer?.company_name}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/invoices/${p.invoice_id}`}
                      className="font-mono text-link hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>{p.invoice?.invoice_number || p.invoice_id}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink">
                      {p.payment_method.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-mute">{p.payment_date}</td>
                  <td className="px-5 py-4 font-mono font-semibold text-emerald-600 text-sm">
                    +{formatCurrency(p.amount)}
                  </td>
                  <td className="px-5 py-4 text-mute text-xs max-w-xs truncate">
                    {p.notes || "—"}
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

