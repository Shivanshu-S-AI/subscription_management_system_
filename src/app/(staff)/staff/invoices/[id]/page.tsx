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
  Receipt,
  Repeat,
} from "lucide-react";
import { getInvoiceById } from "@/lib/data/store";
import { updateInvoiceStatusAction, sendInvoiceAction } from "@/modules/invoices/actions";

export const dynamic = "force-dynamic";

export default async function StaffInvoiceDetailPage({
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

  const confirmAction = updateInvoiceStatusAction.bind(null, invoice.id, "confirmed");
  const cancelAction = updateInvoiceStatusAction.bind(null, invoice.id, "cancelled");
  const sendAction = sendInvoiceAction.bind(null, invoice.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/staff/invoices"
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
                  ? "bg-canvas text-mute border border-hairline line-through"
                  : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {invoice.status}
            </span>
            {isOverdue && (
              <span className="rounded-xs bg-red-500/10 px-2 py-0.5 font-mono text-[10px] uppercase font-medium text-red-600 border border-red-500/20 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                OVERDUE
              </span>
            )}
            {invoice.sent_at && (
              <span className="rounded-xs bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] uppercase font-medium text-blue-600">
                SENT
              </span>
            )}
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.4px] text-ink mt-1 font-mono">
            {invoice.invoice_number}
          </h1>
          <p className="text-xs text-body mt-1">
            Issued: <span className="font-mono text-ink">{invoice.issue_date}</span> · Due:{" "}
            <span className={`font-mono ${isOverdue ? "text-red-600 font-bold" : "text-ink"}`}>
              {invoice.due_date}
            </span>
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Print Button */}
          <Link
            href={`/staff/invoices/${invoice.id}/print`}
            target="_blank"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
          >
            <Printer className="h-3.5 w-3.5 text-mute" />
            <span>Print Invoice</span>
          </Link>

          {/* Send Invoice Action */}
          <form action={sendAction}>
            <button
              type="submit"
              className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
            >
              <Send className="h-3.5 w-3.5 text-mute" />
              <span>{invoice.sent_at ? "Resend" : "Send to Customer"}</span>
            </button>
          </form>

          {/* Confirm Draft */}
          {invoice.status === "draft" && (
            <form action={confirmAction}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-blue-600 px-3 text-xs font-medium text-white shadow-whisper hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Confirm Invoice</span>
              </button>
            </form>
          )}

          {/* Record Payment */}
          {invoice.status !== "paid" && invoice.status !== "cancelled" && (
            <Link
              href={`/staff/payments/new?invoice_id=${invoice.id}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Record Payment</span>
            </Link>
          )}

          {/* Cancel Invoice */}
          {invoice.status !== "cancelled" && invoice.status !== "paid" && (
            <form action={cancelAction}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-red-200 bg-red-50 px-3 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors shadow-whisper"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Grid: Customer Card & Linked Subscription */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customer Details */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Billed To
          </span>
          <Link
            href={`/staff/customers/${invoice.customer_id}`}
            className="text-base font-semibold text-ink hover:text-link block"
          >
            {invoice.customer?.full_name}
          </Link>
          {invoice.customer?.company_name && (
            <span className="text-xs text-mute flex items-center gap-1 mt-0.5">
              <Building className="h-3 w-3" />
              {invoice.customer.company_name}
            </span>
          )}
          <span className="text-xs text-mute block mt-1 font-mono">
            {invoice.customer?.email}
          </span>
          {invoice.customer?.address && (
            <span className="text-xs text-body block mt-2">
              {invoice.customer.address}
            </span>
          )}
        </div>

        {/* Subscription & Period Metadata */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Billing Reference & Terms
          </span>
          {invoice.subscription_id ? (
            <div>
              <span className="text-xs text-mute">Linked Subscription:</span>
              <Link
                href={`/staff/subscriptions/${invoice.subscription_id}`}
                className="text-sm font-semibold font-mono text-ink hover:text-link block mt-0.5"
              >
                {invoice.subscription?.subscription_number || invoice.subscription_id}
              </Link>
            </div>
          ) : (
            <span className="text-xs text-mute block">One-time / Standalone Invoice</span>
          )}
          {invoice.billing_period_start && invoice.billing_period_end && (
            <div className="mt-3 pt-3 border-t border-hairline-soft text-xs text-body">
              <span className="text-mute">Service Period: </span>
              <span className="font-mono font-medium text-ink">
                {invoice.billing_period_start} to {invoice.billing_period_end}
              </span>
            </div>
          )}
          {invoice.notes && (
            <div className="mt-2 text-xs text-mute italic">
              Note: {invoice.notes}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Line Items */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider">
            Itemized Invoice Breakdown
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-2.5">Description</th>
              <th className="px-5 py-2.5 text-right">Quantity</th>
              <th className="px-5 py-2.5 text-right">Unit Price</th>
              <th className="px-5 py-2.5 text-right">Tax Rate</th>
              <th className="px-5 py-2.5 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {invoice.lines.map((line) => (
              <tr key={line.id} className="hover:bg-canvas/50">
                <td className="px-5 py-4">
                  <span className="font-medium text-ink block">{line.description}</span>
                  {line.variant_adjustment > 0 && (
                    <span className="font-mono text-[10px] text-emerald-600 block mt-0.5">
                      Variant Adjustment: +${line.variant_adjustment.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right font-mono font-medium">
                  {line.quantity}
                </td>
                <td className="px-5 py-4 text-right font-mono">
                  ${line.unit_price.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-mute">
                  {line.tax_rate}%
                </td>
                <td className="px-5 py-4 text-right font-mono font-semibold text-ink">
                  ${line.line_total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Financial Settlement Box */}
        <div className="border-t border-hairline bg-canvas p-5 flex justify-end">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-ink">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span>Tax Total</span>
              <span className="font-mono font-medium text-ink">
                ${invoice.tax_amount.toFixed(2)}
              </span>
            </div>
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discounts</span>
                <span className="font-mono font-medium">
                  -${invoice.discount_amount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-hairline pt-2 flex justify-between font-semibold text-ink text-sm">
              <span>Invoice Total</span>
              <span className="font-mono font-bold">
                ${invoice.total_amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Total Paid</span>
              <span className="font-mono font-medium">
                ${invoice.amount_paid.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-hairline-soft pt-1 flex justify-between font-bold text-sm">
              <span className={invoice.amount_due > 0 ? "text-red-600" : "text-ink"}>
                Balance Due
              </span>
              <span className={`font-mono ${invoice.amount_due > 0 ? "text-red-600" : "text-ink"}`}>
                ${invoice.amount_due.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Settlement History */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-mute" />
            <span>Associated Payment Receipts ({invoice.payments?.length || 0})</span>
          </h3>
          {invoice.amount_due > 0 && invoice.status !== "cancelled" && (
            <Link
              href={`/staff/payments/new?invoice_id=${invoice.id}`}
              className="text-xs text-ink hover:underline font-medium"
            >
              + Record Payment
            </Link>
          )}
        </div>
        {(!invoice.payments || invoice.payments.length === 0) ? (
          <div className="p-6 text-center text-xs text-mute">
            No payments recorded yet against this invoice.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-2.5">Payment Ref</th>
                <th className="px-5 py-2.5">Date</th>
                <th className="px-5 py-2.5">Method</th>
                <th className="px-5 py-2.5 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoice.payments.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50">
                  <td className="px-5 py-3 font-mono font-medium text-ink">
                    {p.payment_reference}
                  </td>
                  <td className="px-5 py-3">{p.payment_date}</td>
                  <td className="px-5 py-3 capitalize">{p.payment_method.replace("_", " ")}</td>
                  <td className="px-5 py-3 text-right font-mono font-semibold text-emerald-600">
                    +${p.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
