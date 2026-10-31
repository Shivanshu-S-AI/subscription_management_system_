import { User, LogOut, ShieldCheck, Mail, Building, MapPin, Phone } from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser } from "@/lib/data/store";
import { signOutAction } from "@/modules/auth/actions";

export const dynamic = "force-dynamic";

export default async function CustomerAccountPage() {
  const { user, profile } = await getCurrentUser();
  const customer = getCustomerForUser(user?.id || user?.email || "");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          My Account
        </h1>
        <p className="text-xs text-body mt-1">
          Subscriber identity, organization profile, and billing contact details.
        </p>
      </div>

      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        {/* Profile Avatar & Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-white">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-ink">
              {customer?.full_name || profile?.full_name || "Customer Account"}
            </h2>
            <span className="font-mono text-xs text-mute block">
              {customer?.email || user?.email}
            </span>
          </div>
        </div>

        {/* Account Metadata */}
        <div className="pt-4 border-t border-hairline-soft grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">Account Role</span>
            <span className="font-semibold text-slate-700 mt-0.5 block uppercase">
              SUBSCRIBER (CUSTOMER)
            </span>
          </div>
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">Portal Access</span>
            <span className="font-semibold text-emerald-600 mt-0.5 block">
              ACTIVE & SECURE
            </span>
          </div>
        </div>

        {/* Company & Billing Address */}
        <div className="pt-4 border-t border-hairline-soft space-y-3 text-xs">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Organization & Contact Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-sm bg-canvas border border-hairline space-y-1">
              <span className="text-mute text-[10px] uppercase font-mono block">Company / Entity</span>
              <span className="font-medium text-ink flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-mute" />
                {customer?.company_name || "Personal Subscriber"}
              </span>
            </div>

            <div className="p-3 rounded-sm bg-canvas border border-hairline space-y-1">
              <span className="text-mute text-[10px] uppercase font-mono block">Billing Contact Phone</span>
              <span className="font-medium text-ink flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-mute" />
                {customer?.phone || "Not specified"}
              </span>
            </div>
          </div>

          {customer?.address && (
            <div className="p-3 rounded-sm bg-canvas border border-hairline space-y-1">
              <span className="text-mute text-[10px] uppercase font-mono block">Registered Billing Address</span>
              <span className="text-body flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-mute shrink-0" />
                <span>{customer.address}</span>
              </span>
            </div>
          )}
        </div>

        {/* Security & Access Restrictions Notice */}
        <div className="pt-4 border-t border-hairline-soft p-3 rounded-sm bg-zinc-50 border border-hairline text-xs space-y-1">
          <span className="font-semibold text-body flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Strict Data Isolation & Privacy Guarantee
          </span>
          <p className="text-[11px] text-mute leading-relaxed">
            Your customer session is strictly isolated. You can only view contracts and invoice statements belonging to your registered account.
          </p>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-hairline-soft flex justify-end">
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-sm border border-error/30 bg-error/5 px-4 text-xs font-medium text-error hover:bg-error/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out of Customer Portal</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
