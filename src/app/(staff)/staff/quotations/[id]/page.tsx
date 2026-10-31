import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Repeat, Building, CheckCircle, FileText, Send } from "lucide-react";
import { getQuotationById } from "@/lib/data/store";
import { convertQuoteAction } from "@/modules/quotations/actions";

export const dynamic = "force-dynamic";

export default async function StaffQuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = getQuotationById(id);

  if (!quote) {
    notFound();
  }

  const quoteId = quote.id;
  async function handleConvert() {
    "use server";
    await convertQuoteAction(quoteId, "staff");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/staff/quotations"
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
        <div className="flex items-center gap-2.5">
          {quote.status !== "converted" ? (
            <form action={handleConvert}>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-sm bg-emerald-600 px-4 text-xs font-semibold text-white shadow-whisper hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Confirm & Convert to Subscription</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Converted to Subscription</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Customer Card & Proposal Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customer Details */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Recipient Customer
          </span>
          <Link
            href={`/staff/customers/${quote.customer_id}`}
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
          <span className="text-xs text-mute block mt-1 font-mono">
            {quote.customer?.email}
          </span>
        </div>

        {/* Plan & Offer Terms */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Target Plan & Lifecycle
          </span>
          <span className="text-base font-semibold text-ink block">
            {quote.plan?.name || "Standard Plan"}
          </span>
          <span className="text-xs text-mute font-mono block mt-0.5">
            Frequency: {quote.plan?.billing_frequency.toUpperCase()}
          </span>
          <span className="text-xs text-body block mt-2">
            {quote.notes || "No special commercial terms recorded."}
          </span>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider">
            Commercial Line Items & Variants
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-2.5">Product & Variant</th>
              <th className="px-5 py-2.5 text-right">Qty</th>
              <th className="px-5 py-2.5 text-right">Base Price</th>
              <th className="px-5 py-2.5 text-right">Tax Rate</th>
              <th className="px-5 py-2.5 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {quote.lines.map((line) => (
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

        {/* Financial Summary */}
        <div className="border-t border-hairline bg-canvas p-5 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-body">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-ink">
                ${quote.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span>Estimated Tax</span>
              <span className="font-mono font-medium text-ink">
                ${quote.tax_amount.toFixed(2)}
              </span>
            </div>
            {quote.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discounts Applied</span>
                <span className="font-mono font-medium">
                  -${quote.discount_amount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-hairline pt-2 flex justify-between font-semibold text-ink text-sm">
              <span>Total Quotation</span>
              <span className="font-mono">
                ${quote.total_amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
