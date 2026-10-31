import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getPlanById } from "@/lib/data/store";
import { updatePlanAction } from "@/modules/plans/actions";

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = getPlanById(id);

  if (!plan) {
    notFound();
  }

  const updateWithId = updatePlanAction.bind(null, plan.id);

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
          Edit Plan: {plan.name}
        </h1>
        <p className="text-xs text-body mt-1">
          Adjust cadence, pricing rules, and lifecycle permission settings.
        </p>
      </div>

      <form action={updateWithId} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Plan Title *
          </label>
          <input
            name="name"
            defaultValue={plan.name}
            required
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Price ($) *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={plan.price}
              required
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Billing Frequency *
            </label>
            <select
              name="billing_frequency"
              defaultValue={plan.billing_frequency}
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-2.5 text-xs text-ink focus:outline-none focus:border-ink"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">
              Min Quantity
            </label>
            <input
              name="min_quantity"
              type="number"
              defaultValue={plan.min_quantity}
              className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Lifecycle Settings */}
        <div className="pt-4 border-t border-hairline-soft">
          <span className="font-mono text-xs uppercase tracking-wider text-mute block mb-2">
            Lifecycle Policy Rules
          </span>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="auto_close"
                defaultChecked={plan.auto_close}
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Automatic Closure:</span>
              <span className="text-mute">Closes automatically at term completion</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="early_close_eligible"
                defaultChecked={plan.early_close_eligible}
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Early Closure Eligible:</span>
              <span className="text-mute">Permit cancellation before contract end date</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="pause_eligible"
                defaultChecked={plan.pause_eligible}
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Pause Eligible:</span>
              <span className="text-mute">Permit pausing recurring billing cycles</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="renewal_eligible"
                defaultChecked={plan.renewal_eligible}
                className="rounded-xs border-hairline text-ink"
              />
              <span className="text-ink font-medium">Renewal Eligible:</span>
              <span className="text-mute">Permit contract extension</span>
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
            <span>Update Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

