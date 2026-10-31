import { notFound } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser, getCustomerInvoiceById } from "@/lib/data/store";
import { PrintButton } from "@/components/admin/print-button";

export const dynamic = "force-dynamic";

export default async function CustomerInvoicePrintPage({
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

  // Strict customer-level data isolation
  const invoice = getCustomerInvoiceById(customer.id, id);
  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-ink p-8 sm:p-12 font-sans max-w-4xl mx-auto print:p-0">
      {/* Print Trigger Button (Hidden in print) */}
      <div className="mb-6 flex justify-between items-center print:hidden border-b border-hairline pb-4">
        <span className="text-xs text-mute font-mono">Customer Invoice Statement Preview</span>
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
            <p className="text-xs text-mute mt-2 leading-relaxed">
              Data Analysis Software & Subscription Services<br />
              100 Technology Square, Suite 400<br />
              contact@brightloopsoftware.com
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs uppercase text-mute tracking-wider block">
              STATEMENT / INVOICE
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
            <span className="font-bold text-ink text-sm block">
              {invoice.customer?.full_name}
            </span>
            {invoice.customer?.company_name && (
              <span className="text-body block mt-0.5">{invoice.customer.company_name}</span>
            )}
            <span className="text-mute block mt-0.5 font-mono">{invoice.customer?.email}</span>
            {invoice.customer?.address && (
              <span className="text-body block mt-1">{invoice.customer.address}</span>
            )}
          </div>

          <div className="text-right space-y-1">
            <div>
              <span className="text-mute mr-2">Issue Date:</span>
              <span className="font-mono font-medium">{invoice.issue_date}</span>
            </div>
            <div>
              <span className="text-mute mr-2">Due Date:</span>
              <span className="font-mono font-medium">{invoice.due_date}</span>
            </div>
            {invoice.subscription_id && (
              <div>
                <span className="text-mute mr-2">Subscription:</span>
                <span className="font-mono">
                  {invoice.subscription?.subscription_number || invoice.subscription_id}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Line Items */}
        <div className="py-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-hairline font-mono text-mute uppercase text-[10px]">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Quantity</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoice.lines.map((l) => (
                <tr key={l.id}>
                  <td className="py-3 font-medium">{l.description}</td>
                  <td className="py-3 text-right font-mono">{l.quantity}</td>
                  <td className="py-3 text-right font-mono">${l.unit_price.toFixed(2)}</td>
                  <td className="py-3 text-right font-mono">${l.line_total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="border-t border-hairline pt-6 flex justify-end">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal:</span>
              <span className="font-mono">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-body">
              <span>Tax:</span>
              <span className="font-mono">${invoice.tax_amount.toFixed(2)}</span>
            </div>
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between text-body">
                <span>Discount:</span>
                <span className="font-mono">-${invoice.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm border-t border-hairline pt-1 text-ink">
              <span>Total:</span>
              <span className="font-mono">${invoice.total_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-mute pt-0.5">
              <span>Paid:</span>
              <span className="font-mono">${invoice.amount_paid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-hairline pt-1 text-ink">
              <span>Amount Due:</span>
              <span className="font-mono">${invoice.amount_due.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Remittance Advice */}
        <div className="mt-12 pt-6 border-t border-hairline text-center text-xs text-mute font-mono">
          Thank you for subscribing to Brightloop Software. Please remit balance due via bank transfer referencing {invoice.invoice_number}.
        </div>
      </div>
    </div>
  );
}

