import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/service";
import { signOutAction } from "@/modules/auth/actions";
import { ShieldCheck, LogOut, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDestinationPage() {
  const { user, profile, role } = await getCurrentUser();

  if (!user) {
    redirect("/internal-login?redirect=/admin");
  }

  if (role !== "admin") {
    redirect(role === "staff" ? "/staff" : "/portal");
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Bar */}
        <header className="flex items-center justify-between border-b border-hairline pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink text-white shadow-whisper">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-ink">
                Brightloop Operations
              </h1>
              <span className="font-mono text-xs text-mute">Admin Control Surface</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-600 font-medium">
              ROLE: ADMIN
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Content Card */}
        <main className="space-y-6">
          <div className="rounded-md border border-hairline bg-canvas-elevated p-6 sm:p-8 shadow-whisper">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Authentication & Role Verified
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.4px] text-ink">
              Welcome, {profile?.full_name || user.email}
            </h2>
            <p className="mt-2 text-sm text-body leading-relaxed max-w-2xl">
              You are signed in with the pre-provisioned Administrator account. Full business management modules (Products, Variants, Plans, Quotation Templates, Taxes, and Discounts) will be implemented in Phases 3 through 5.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-hairline-soft text-xs">
              <div className="p-3 rounded-sm bg-canvas border border-hairline">
                <span className="font-mono text-mute block text-[10px] uppercase">User ID</span>
                <span className="font-mono text-ink font-medium truncate block mt-1">
                  {user.id}
                </span>
              </div>
              <div className="p-3 rounded-sm bg-canvas border border-hairline">
                <span className="font-mono text-mute block text-[10px] uppercase">Account Email</span>
                <span className="text-ink font-medium truncate block mt-1">
                  {user.email}
                </span>
              </div>
              <div className="p-3 rounded-sm bg-canvas border border-hairline">
                <span className="font-mono text-mute block text-[10px] uppercase">Assigned Scope</span>
                <span className="font-mono text-ink font-medium block mt-1">
                  Unrestricted Superuser
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
            <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-4">
              Upcoming Operational Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-sm border border-hairline bg-canvas text-body">
                <span>Phase 3: Catalog, Plans, Taxes & Discounts</span>
                <span className="text-[10px] font-mono text-mute">NEXT</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-sm border border-hairline bg-canvas text-body">
                <span>Phase 4: Quotations & Subscription Management</span>
                <span className="text-[10px] font-mono text-mute">PENDING</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="text-center text-xs text-mute py-4">
        <Link href="/" className="hover:text-ink transition-colors inline-flex items-center gap-1">
          <span>Return to Public Homepage</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </footer>
    </div>
  );
}
