import Link from "next/link";
import { ArrowLeft, Save, CreditCard } from "lucide-react";
import { getInvoices } from "@/lib/data/store";
import { recordPaymentAction } from "@/modules/payments/actions";

export const dynamic = "force-dynamic";

export default async function StaffNewPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ invoice_id?: string }>;
}) {
  const { invoice_id } = await searchParams;
  const invoices = getInvoices().filter((inv) => inv.status !== "paid" && inv.status !== "cancelled");
  const selectedInvoice = invoice_id
    ? invoices.find((i) => i.id === invoice_id)
    : invoices[0];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href="/staff/payments"
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
          Explicitly reconcile incoming bank deposits, wire transfers, and credit card settlements.
        </p>
      </div>

      <form
        action={recordPaymentAction}
        className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5"
      >
        <input type="hidden" name="workspace" value="staff" />

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
            {invoices.length === 0 ? (
              <option value="" disabled>No outstanding invoices to settle</option>
            ) : (
              invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number} — {inv.customer?.company_name || inv.customer?.full_name} (Due: ${inv.amount_due.toFixed(2)})
                </option>
              ))
            )}
          </select>
        </div>

        {/* Selected Invoice Details Pill */}
        {selectedInvoice && (
          <div className="rounded-sm border border-hairline bg-canvas p-3 text-xs">
            <div className="flex justify-between items-center text-[11px] font-mono text-mute mb-1">
              <span>CUSTOMER: {selectedInvoice.customer?.full_name}</span>
              <span>DUE: {selectedInvoice.due_date}</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-body">Total Invoiced: ${selectedInvoice.total_amount.toFixed(2)}</span>
              <span className="font-bold text-red-600">Balance Due: ${selectedInvoice.amount_due.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Payment Amount ($) *
          </label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            max={selectedInvoice ? selectedInvoice.amount_due : undefined}
            defaultValue={selectedInvoice ? selectedInvoice.amount_due : ""}
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink font-bold"
          />
          <p className="text-[11px] text-mute mt-1">
            Cannot exceed total outstanding balance of the selected invoice.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Payment Method *
          </label>
          <select
            name="payment_method"
            defaultValue="bank_transfer"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          >
            <option value="bank_transfer">Direct Bank Transfer / Wire</option>
            <option value="credit_card">Corporate Credit Card</option>
            <option value="cash">Cash / Cheque</option>
            <option value="online">Online Payment / Stripe</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Payment Settlement Date
          </label>
          <input
            name="payment_date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Deposit Reference / Bank Statement Identifier
          </label>
          <input
            name="notes"
            placeholder="e.g. Wire Ref #89201948 - Apex Cloud monthly retainer"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline">
          <Link
            href="/staff/payments"
            className="h-8 rounded-sm border border-hairline px-3 text-xs font-medium text-body hover:bg-canvas transition-colors inline-flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={invoices.length === 0}
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-4 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Record & Settle Invoice</span>
          </button>
        </div>
      </form>
    </div>
  );
}
