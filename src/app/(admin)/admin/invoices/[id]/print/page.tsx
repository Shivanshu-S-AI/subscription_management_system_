import { notFound } from "next/navigation";
import { getInvoiceById } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";
import { PrintButton } from "@/components/admin/print-button";

export default async function InvoicePrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-ink p-8 sm:p-12 font-sans max-w-4xl mx-auto print:p-0">
      {/* Print Trigger Button (Hidden in print) */}
      <div className="mb-6 flex justify-between items-center print:hidden border-b border-hairline pb-4">
        <span className="text-xs text-mute font-mono">Invoice Document Preview</span>
        <PrintButton />
      </div>

      {/* Invoice Document Body */}
      <div className="border border-hairline p-8 sm:p-10 rounded-sm">
        {/* Header Bar */}
        <div className="flex justify-between items-start border-b border-hairline pb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-ink text-white font-bold text-xs">
                BL
              </div>
              <span className="font-semibold text-lg tracking-tight">Brightloop Software Inc.</span>
            </div>
            <p className="text-xs text-mute mt-2">
              Data Analysis Software & Subscription Services<br />
              100 Technology Square, Suite 400<br />
              contact@brightloopsoftware.com
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs uppercase text-mute tracking-wider block">
              INVOICE
            </span>
            <span className="font-mono text-2xl font-bold text-ink block mt-0.5">
              {invoice.invoice_number}
            </span>
            <span className="text-xs font-mono text-mute block mt-1">
              Status: {invoice.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Bill To & Invoice Info */}
        <div className="grid grid-cols-2 gap-8 py-8 border-b border-hairline text-xs">
          <div>
            <span className="font-mono text-mute uppercase tracking-wider block text-[10px] mb-1">
              Billed To
            </span>
            <span className="font-semibold text-sm text-ink block">
              {invoice.customer?.full_name}
            </span>
            {invoice.customer?.company_name && (
              <span className="text-body block">{invoice.customer.company_name}</span>
            )}
            <span className="text-mute block mt-0.5">{invoice.customer?.email}</span>
            {invoice.customer?.address && (
              <span className="text-mute block mt-0.5">{invoice.customer.address}</span>
            )}
          </div>

          <div className="text-right space-y-1 font-mono">
            <div>
              <span className="text-mute">Issue Date: </span>
              <span className="font-medium text-ink">{invoice.issue_date}</span>
            </div>
            <div>
              <span className="text-mute">Payment Due Date: </span>
              <span className="font-semibold text-ink">{invoice.due_date}</span>
            </div>
            {invoice.billing_period_start && (
              <div>
                <span className="text-mute">Billing Period: </span>
                <span className="text-ink">
                  {invoice.billing_period_start} → {invoice.billing_period_end}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-hairline font-mono text-[10px] uppercase text-mute">
              <tr>
                <th className="py-2.5">Item Description</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Unit Price</th>
                <th className="py-2.5 text-right">Taxes</th>
                <th className="py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoice.lines.map((l) => (
                <tr key={l.id}>
                  <td className="py-3 font-medium text-ink">{l.description}</td>
                  <td className="py-3 text-center font-mono">{l.quantity}</td>
                  <td className="py-3 text-right font-mono">{formatCurrency(l.unit_price + l.variant_adjustment)}</td>
                  <td className="py-3 text-right font-mono text-mute">{formatCurrency(l.tax_amount)}</td>
                  <td className="py-3 text-right font-mono font-semibold text-ink">{formatCurrency(l.line_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Totals */}
        <div className="pt-6 border-t border-hairline flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal:</span>
              <span className="font-mono text-ink">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-body">
              <span>Taxes:</span>
              <span className="font-mono text-ink">{formatCurrency(invoice.tax_amount)}</span>
            </div>
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span className="font-mono">-{formatCurrency(invoice.discount_amount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-hairline flex justify-between text-sm font-bold text-ink">
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

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-8 pt-4 border-t border-hairline text-xs text-mute">
            <span className="font-mono uppercase text-[10px] block mb-1">Payment Instructions & Notes:</span>
            <p>{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
