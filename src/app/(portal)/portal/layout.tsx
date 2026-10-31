import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser } from "@/lib/data/store";
import { PortalNavbar } from "@/components/portal/portal-navbar";

export const dynamic = "force-dynamic";

export default async function CustomerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/portal");
  }

  const customer = getCustomerForUser(user.id || user.email);

  return (
    <div className="min-h-screen bg-canvas font-sans text-body antialiased flex flex-col justify-between">
      <div>
        <PortalNavbar
          userEmail={user.email || undefined}
          customerName={customer?.company_name || customer?.full_name || profile?.full_name || undefined}
        />
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>

      <footer className="border-t border-hairline py-6 bg-canvas text-center text-xs text-mute">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
          <span>© 2026 Brightloop Software Inc. All rights reserved.</span>
          <span>Self-Service Subscription Portal</span>
        </div>
      </footer>
    </div>
  );
}
