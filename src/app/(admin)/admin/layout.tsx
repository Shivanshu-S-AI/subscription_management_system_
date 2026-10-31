import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/service";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getCurrentUser();

  if (!user) {
    redirect("/internal-login?redirect=/admin");
  }

  // Strict role check: only admin can access admin workspace
  if (role !== "admin") {
    if (role === "staff") {
      redirect("/staff");
    } else {
      redirect("/portal");
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
