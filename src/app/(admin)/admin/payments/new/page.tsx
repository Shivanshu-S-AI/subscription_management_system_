import Link from "next/link";
import { ArrowLeft, Save, CreditCard } from "lucide-react";
import { getInvoices } from "@/lib/data/store";
import { recordPaymentAction } from "@/modules/payments/actions";
import { formatCurrency } from "@/lib/utils";

export default async function NewPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ invoiceId?: string }>;
}) {
  const { invoiceId } = await searchParams;
  const invoices = getInvoices().filter((inv) => inv.status !== "paid" && inv.status !== "cancelled");
  const selectedInvoice = invoiceId
    ? invoices.find((i) => i.id === invoiceId)
    : invoices[0];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href="/admin/payments"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Payments</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Record Payment Against Invoice
        </h1>
        <p className="text-xs text-body mt-1">
          Explicitly reconcile incoming bank deposits, transfers, and corporate cards.
        </p>
      </div>

      <form action={recordPaymentAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Select Invoice to Settle *
          </label>
          <select
            name="invoice_id"
            defaultValue={selectedInvoice?.id || ""}
            required
            className="h-10 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
          >
            {invoices.map((inv) => (
              <option key={inv.id} value={inv.id}>
                {inv.invoice_number} — {inv.customer?.company_name || inv.customer?.full_name} (Due: ${inv.amount_due.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Invoice Details Pill */}
        {selectedInvoice && (
          <div className="rounded-sm border border-hairline bg-canvas p-3 text-xs">
            <div className="flex justify-between items-center text-[11px] font-mono text-mute mb-1">
              <span>CUSTOMER: {selectedInvoice.customer?.full_name}</span>
              <span>DUE: {selectedInvoice.due_date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-body">Total Invoiced: {formatCurrency(selectedInvoice.total_amount)}</span>
              <span className="font-semibold text-error">Remaining: {formatCurrency(selectedInvoice.amount_due)}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Payment Amount ($) *
            </label>
            <input
              name="amount"
              type="number"
              step="0.01"
              defaultValue={selectedInvoice?.amount_due || ""}
              required
              placeholder="0.00"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Payment Method *
            </label>
            <select
              name="payment_method"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="bank_transfer">Bank Wire / ACH Transfer</option>
              <option value="credit_card">Credit Card Settlement</option>
              <option value="check">Corporate Check</option>
              <option value="cash">Cash / Direct Deposit</option>
              <option value="other">Other Method</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Payment Date *
          </label>
          <input
            name="payment_date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Reference / Bank Statement Note
          </label>
          <input
            name="notes"
            placeholder="e.g. Bank statement ref #WT-90184 from JPMorgan Chase"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/payments"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Record Payment</span>
          </button>
        </div>
      </form>
    </div>
  );
}

