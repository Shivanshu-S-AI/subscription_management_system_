import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building,
  Printer,
  Receipt,
  CreditCard,
  AlertTriangle,
  Repeat,
} from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import {
  getCustomerForUser,
  getCustomerInvoiceById,
} from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function CustomerInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await getCurrentUser();
  const customer = getCustomerForUser(user?.id || user?.email || "");

  if (!customer) {
    notFound();
  }

  // Strict customer-level data isolation: Returns null if invoice does not belong to this customer
  const invoice = getCustomerInvoiceById(customer.id, id);
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
          href="/portal/invoices"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to My Invoices</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-mute uppercase">INVOICE STATEMENT</span>
            <span
              className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                invoice.status === "paid"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : invoice.status === "confirmed"
                  ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  : invoice.status === "cancelled"
                  ? "bg-canvas text-mute border border-hairline line-through"
                  : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
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
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.4px] text-ink mt-1 font-mono">
            {invoice.invoice_number}
          </h1>
          <p className="text-xs text-body mt-1">
            Issued: <span className="font-mono text-ink">{invoice.issue_date}</span> · Payment Due:{" "}
            <span className={`font-mono ${isOverdue ? "text-red-600 font-bold" : "text-ink"}`}>
              {invoice.due_date}
            </span>
          </p>
        </div>

        {/* Print Button */}
        <div>
          <Link
            href={`/portal/invoices/${invoice.id}/print`}
            target="_blank"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
          >
            <Printer className="h-3.5 w-3.5 text-mute" />
            <span>Print Invoice</span>
          </Link>
        </div>
      </div>

      {/* Grid: Billed Account & Subscription Reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customer Details */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Billed To
          </span>
          <span className="text-base font-semibold text-ink block">
            {invoice.customer?.full_name}
          </span>
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

        {/* Subscription Metadata */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Associated Subscription
          </span>
          {invoice.subscription_id ? (
            <div>
              <span className="text-xs text-mute">Subscription Contract:</span>
              <Link
                href={`/portal/subscriptions/${invoice.subscription_id}`}
                className="text-sm font-semibold font-mono text-ink hover:text-link block mt-0.5"
              >
                {invoice.subscription?.subscription_number || invoice.subscription_id}
              </Link>
            </div>
          ) : (
            <span className="text-xs text-mute block">One-time / Standalone Statement</span>
          )}
          {invoice.billing_period_start && invoice.billing_period_end && (
            <div className="mt-3 pt-3 border-t border-hairline-soft text-xs text-body">
              <span className="text-mute">Service Billing Period: </span>
              <span className="font-mono font-medium text-ink">
                {invoice.billing_period_start} to {invoice.billing_period_end}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Itemized Line Items */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider">
            Itemized Statement Breakdown
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
                <span>Discounts Applied</span>
                <span className="font-mono font-medium">
                  -${invoice.discount_amount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-hairline pt-2 flex justify-between font-semibold text-ink text-sm">
              <span>Total Invoiced</span>
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

      {/* Payment Receipts History */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-mute" />
            <span>Recorded Payment Receipts ({invoice.payments?.length || 0})</span>
          </h3>
        </div>
        {(!invoice.payments || invoice.payments.length === 0) ? (
          <div className="p-6 text-center text-xs text-mute">
            No payments recorded yet for this invoice.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-2.5">Receipt Ref</th>
                <th className="px-5 py-2.5">Date</th>
                <th className="px-5 py-2.5">Payment Method</th>
                <th className="px-5 py-2.5 text-right">Amount Settled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoice.payments.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50">
                  <td className="px-5 py-3 font-mono font-medium text-ink">
                    {p.payment_reference}
                  </td>
                  <td className="px-5 py-3 font-mono text-mute">{p.payment_date}</td>
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

