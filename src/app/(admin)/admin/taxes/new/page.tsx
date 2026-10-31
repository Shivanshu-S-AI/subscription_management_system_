import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createTaxAction } from "@/modules/taxes/actions";

export default function NewTaxPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href="/admin/taxes"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Taxes</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Create Tax Rule
        </h1>
        <p className="text-xs text-body mt-1">
          Define tax percentage applied across invoice and quote generation.
        </p>
      </div>

      <form action={createTaxAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Rule Name *
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Standard VAT"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Tax Rate (%) *
          </label>
          <input
            name="rate"
            type="number"
            step="0.01"
            required
            placeholder="10.00"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows={2}
            placeholder="e.g. Standard 10% value added tax for software subscriptions"
            className="w-full rounded-sm border border-hairline bg-canvas p-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs">
            <input
              type="checkbox"
              name="is_default"
              className="rounded-xs border-hairline text-ink"
            />
            <span className="text-ink font-medium">Set as default tax rule</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/taxes"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Tax Rule</span>
          </button>
        </div>
      </form>
    </div>
  );
}

