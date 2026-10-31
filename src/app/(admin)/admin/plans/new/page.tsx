import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createPlanAction } from "@/modules/plans/actions";

export default function NewPlanPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/plans"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Plans</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Create Subscription Plan
        </h1>
        <p className="text-xs text-body mt-1">
          Configure cadence, pricing parameters, and subscription lifecycle rules.
        </p>
      </div>

      <form action={createPlanAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        {/* Section 1: Basic Information */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            1. Basic Information
          </span>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Plan Title *
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Enterprise Analytics Tier"
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Section 2: Pricing and Billing */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            2. Pricing and Billing
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">
                Plan Price ($) *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="1500.00"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">
                Billing Frequency *
              </label>
              <select
                name="billing_frequency"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Quantity Requirements */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            3. Quantity Requirements
          </span>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Minimum Quantity / Commitment
            </label>
            <input
              name="min_quantity"
              type="number"
              defaultValue={1}
              min={1}
              className="h-9 w-full sm:w-48 rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Section 4: Availability */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            4. Availability Dates
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">
                Availability Start Date
              </label>
              <input
                name="start_date"
                type="date"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">
                Availability End Date
              </label>
              <input
                name="end_date"
                type="date"
                className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Lifecycle Configuration */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            5. Lifecycle Configuration
          </span>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="auto_close"
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Automatic Closure:</span>
              <span className="text-mute">
                Close subscription automatically when the plan end date arrives
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="early_close_eligible"
                defaultChecked
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Early Closure Eligible:</span>
              <span className="text-mute">Permit admins and staff to terminate the subscription early</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="pause_eligible"
                defaultChecked
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Pause Eligible:</span>
              <span className="text-mute">Permit temporary pausing of recurring billing</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="renewal_eligible"
                defaultChecked
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Renewal Eligible:</span>
              <span className="text-mute">Permit renewal at the end of the term</span>
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/plans"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

