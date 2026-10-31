import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building,
  CheckCircle,
  XCircle,
  Printer,
  CreditCard,
  Send,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { getInvoiceById } from "@/lib/data/store";
import { updateInvoiceStatusAction } from "@/modules/invoices/actions";
import { formatCurrency } from "@/lib/utils";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const isOverdue =
    invoice.amount_due > 0 &&
    invoice.due_date < new Date().toISOString().split("T")[0] &&
    invoice.status !== "cancelled" &&
    invoice.status !== "paid";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/invoices"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Invoices</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-mute uppercase">COMMERCIAL INVOICE</span>
            <span
              className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                invoice.status === "paid"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : invoice.status === "confirmed"
                  ? "bg-blue-500/10 text-blue-600"
                  : invoice.status === "cancelled"
                  ? "bg-error/10 text-error"
                  : "bg-canvas text-mute border border-hairline"
              }`}
            >
              {invoice.status}
            </span>
            {isOverdue && (
              <span className="rounded-xs bg-error/10 px-2 py-0.5 font-mono text-[10px] uppercase font-semibold text-error flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                OVERDUE
              </span>
            )}
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.4px] text-ink mt-1 font-mono">
            {invoice.invoice_number}
          </h1>
          <p className="text-xs text-body mt-1">
            Issued: <span className="font-mono text-ink">{invoice.issue_date}</span> · Due: <span className="font-mono text-ink">{invoice.due_date}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Print Layout */}
          <Link
            href={`/admin/invoices/${invoice.id}/print`}
            target="_blank"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
          >
            <Printer className="h-3.5 w-3.5 text-mute" />
            <span>Print Invoice</span>
          </Link>

          {/* Record Payment */}
          {invoice.amount_due > 0 && invoice.status !== "cancelled" && (
            <Link
              href={`/admin/payments?invoiceId=${invoice.id}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Record Payment</span>
            </Link>
          )}

          {/* Confirm Action */}
          {invoice.status === "draft" && (
            <form action={async () => {
              "use server";
              await updateInvoiceStatusAction(invoice.id, "confirmed");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white hover:bg-black transition-colors"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Confirm Invoice</span>
              </button>
            </form>
          )}

          {/* Cancel Action */}
          {invoice.status !== "cancelled" && invoice.status !== "paid" && (
            <form action={async () => {
              "use server";
              await updateInvoiceStatusAction(invoice.id, "cancelled");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-error/30 bg-error/5 px-3 text-xs font-medium text-error hover:bg-error/10 transition-colors"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Cancel Invoice</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Customer & Billing Period Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Billed Customer
          </span>
          <Link
            href={`/admin/customers/${invoice.customer_id}`}
            className="text-base font-semibold text-ink hover:text-link block"
          >
            {invoice.customer?.full_name}
          </Link>
          <span className="text-xs text-mute flex items-center gap-1 mt-0.5">
            <Building className="h-3 w-3" />
            {invoice.customer?.company_name || invoice.customer?.email}
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Associated Subscription
          </span>
          {invoice.subscription_id ? (
            <Link
              href={`/admin/subscriptions/${invoice.subscription_id}`}
              className="text-base font-semibold text-ink hover:text-link font-mono block"
            >
              {invoice.subscription?.subscription_number || "View Subscription"}
            </Link>
          ) : (
            <span className="text-xs text-mute font-mono">Manual / Standalone</span>
          )}
          {invoice.billing_period_start && (
            <span className="text-[11px] text-mute font-mono block mt-0.5">
              Period: {invoice.billing_period_start} → {invoice.billing_period_end}
            </span>
          )}
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Outstanding Due
          </span>
          <span className="text-2xl font-semibold text-ink font-mono block">
            {formatCurrency(invoice.amount_due)}
          </span>
          <span className="text-[11px] text-mute block mt-0.5">
            Paid: {formatCurrency(invoice.amount_paid)} of {formatCurrency(invoice.total_amount)}
          </span>
        </div>
      </div>

      {/* Itemized Lines */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="p-4 border-b border-hairline bg-canvas">
          <h2 className="text-xs font-mono uppercase tracking-wider text-mute">
            Snapshot Invoice Items
          </h2>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas/50 border-b border-hairline text-[11px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium text-center">Qty</th>
              <th className="px-5 py-3 font-medium text-right">Unit Price</th>
              <th className="px-5 py-3 font-medium text-right">Variant Adj.</th>
              <th className="px-5 py-3 font-medium text-right">Tax (%)</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {invoice.lines.map((l) => (
              <tr key={l.id}>
                <td className="px-5 py-3.5 font-medium text-ink">{l.description}</td>
                <td className="px-5 py-3.5 font-mono text-center">{l.quantity}</td>
                <td className="px-5 py-3.5 font-mono text-right">{formatCurrency(l.unit_price)}</td>
                <td className="px-5 py-3.5 font-mono text-right text-emerald-600">
                  +{formatCurrency(l.variant_adjustment)}
                </td>
                <td className="px-5 py-3.5 font-mono text-right text-mute">{l.tax_rate}%</td>
                <td className="px-5 py-3.5 font-mono font-semibold text-ink text-right">
                  {formatCurrency(l.line_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculation Totals */}
        <div className="p-6 border-t border-hairline bg-canvas/30 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal:</span>
              <span className="font-mono text-ink">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-body">
              <span>Tax Total:</span>
              <span className="font-mono text-ink">+{formatCurrency(invoice.tax_amount)}</span>
            </div>
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount Applied:</span>
                <span className="font-mono">-{formatCurrency(invoice.discount_amount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-hairline flex justify-between text-sm font-semibold text-ink">
              <span>Total Invoiced:</span>
              <span className="font-mono">{formatCurrency(invoice.total_amount)}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-600">
              <span>Amount Paid:</span>
              <span className="font-mono">-{formatCurrency(invoice.amount_paid)}</span>
            </div>
            <div className="pt-2 border-t border-hairline flex justify-between text-sm font-bold text-ink">
              <span>Balance Due:</span>
              <span className="font-mono text-error">{formatCurrency(invoice.amount_due)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Payments Recorded */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <h2 className="text-sm font-semibold text-ink">
            Payments Reconciled Against This Invoice ({invoice.payments?.length || 0})
          </h2>
          {invoice.amount_due > 0 && invoice.status !== "cancelled" && (
            <Link
              href={`/admin/payments?invoiceId=${invoice.id}`}
              className="text-xs font-mono text-link hover:underline"
            >
              + Record Payment
            </Link>
          )}
        </div>

        {!invoice.payments || invoice.payments.length === 0 ? (
          <p className="text-xs text-mute py-3 text-center">No payments recorded yet.</p>
        ) : (
          <div className="divide-y divide-hairline-soft">
            {invoice.payments.map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-medium text-ink">{p.payment_reference}</span>
                  <span className="text-mute block text-[11px] mt-0.5">
                    Date: {p.payment_date} · Notes: {p.notes || "No notes"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-600 block">
                    +{formatCurrency(p.amount)}
                  </span>
                  <span className="font-mono text-[10px] text-mute uppercase block">
                    {p.payment_method.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

