import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Repeat, Building, CheckCircle, FileText } from "lucide-react";
import { getQuotationById } from "@/lib/data/store";
import { convertQuoteAction } from "@/modules/quotations/actions";
import { formatCurrency } from "@/lib/utils";

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = getQuotationById(id);

  if (!quote) {
    notFound();
  }

  const convertWithId = convertQuoteAction.bind(null, quote.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/quotations"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Quotations</span>
        </Link>
      </div>

      {/* Quotation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-mute uppercase">COMMERCIAL PROPOSAL</span>
            <span
              className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                quote.status === "converted"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : quote.status === "sent"
                  ? "bg-blue-500/10 text-blue-600"
                  : "bg-canvas text-mute border border-hairline"
              }`}
            >
              {quote.status}
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.4px] text-ink mt-1 font-mono">
            {quote.quote_number}
          </h1>
          <p className="text-xs text-body mt-1">
            Valid until <span className="font-mono font-medium text-ink">{quote.valid_until}</span>
          </p>
        </div>

        {/* Conversion Action */}
        <div className="flex items-center gap-3">
          {quote.status !== "converted" ? (
            <form action={convertWithId}>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-sm bg-ink px-4 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
              >
                <Repeat className="h-3.5 w-3.5" />
                <span>Convert to Subscription</span>
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-600 font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>Converted to Subscription</span>
            </div>
          )}
        </div>
      </div>

      {/* Customer & Plan Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block mb-2">
            Target Customer
          </span>
          <Link
            href={`/admin/customers/${quote.customer_id}`}
            className="text-base font-semibold text-ink hover:text-link block"
          >
            {quote.customer?.full_name}
          </Link>
          {quote.customer?.company_name && (
            <span className="text-xs text-mute flex items-center gap-1 mt-0.5">
              <Building className="h-3 w-3" />
              {quote.customer.company_name}
            </span>
          )}
          <span className="text-xs text-mute block mt-1">{quote.customer?.email}</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block mb-2">
            Associated Plan
          </span>
          <span className="text-base font-semibold text-ink block">
            {quote.plan?.name || "Standard Plan"}
          </span>
          <span className="text-xs text-mute font-mono block mt-0.5">
            Billing Frequency: {quote.plan?.billing_frequency.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="p-4 border-b border-hairline bg-canvas">
          <h2 className="text-xs font-mono uppercase tracking-wider text-mute">
            Offered Line Items
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
            {quote.lines.map((l) => (
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

        {/* Summary Totals */}
        <div className="p-6 border-t border-hairline bg-canvas/30 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal:</span>
              <span className="font-mono text-ink">{formatCurrency(quote.subtotal)}</span>
            </div>
            <div className="flex justify-between text-body">
              <span>Estimated Taxes:</span>
              <span className="font-mono text-ink">+{formatCurrency(quote.tax_amount)}</span>
            </div>
            {quote.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount Applied:</span>
                <span className="font-mono">-{formatCurrency(quote.discount_amount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-hairline flex justify-between text-sm font-semibold text-ink">
              <span>Grand Total:</span>
              <span className="font-mono">{formatCurrency(quote.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

