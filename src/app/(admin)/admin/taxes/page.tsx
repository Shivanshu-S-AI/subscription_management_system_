import Link from "next/link";
import { Percent, Plus, Check } from "lucide-react";
import { getTaxRules } from "@/lib/data/store";

export default function TaxesPage() {
  const taxes = getTaxRules();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Catalog & Pricing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Tax Configuration
          </h1>
          <p className="text-xs text-body mt-1">
            Admin-configured tax rules applied automatically to quote and invoice line items.
          </p>
        </div>

        <Link
          href="/admin/taxes/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Tax Rule</span>
        </Link>
      </div>

      {/* Taxes Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-3 font-medium">Tax Rule Name</th>
              <th className="px-5 py-3 font-medium">Rate (%)</th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium">Default Rule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {taxes.map((t) => (
              <tr key={t.id} className="hover:bg-canvas/50 transition-colors">
                <td className="px-5 py-4 font-semibold text-ink text-sm">
                  {t.name}
                </td>
                <td className="px-5 py-4 font-mono font-semibold text-ink text-sm">
                  {t.rate.toFixed(2)}%
                </td>
                <td className="px-5 py-4 text-mute max-w-sm">
                  {t.description || "No description"}
                </td>
                <td className="px-5 py-4">
                  {t.is_default ? (
                    <span className="inline-flex items-center gap-1 rounded-xs bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 font-medium">
                      <Check className="h-3 w-3" />
                      Default System Tax
                    </span>
                  ) : (
                    <span className="text-mute font-mono text-[11px]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

