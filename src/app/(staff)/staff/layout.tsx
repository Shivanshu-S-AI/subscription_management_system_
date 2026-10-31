import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/service";
import { StaffLayoutClient } from "@/components/staff/staff-layout-client";

export const dynamic = "force-dynamic";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getCurrentUser();

  if (!user) {
    redirect("/internal-login?redirect=/staff");
  }

  // Strict role check: only staff or admin can access staff operations workspace
  if (role !== "staff" && role !== "admin") {
    redirect("/portal");
  }

  return <StaffLayoutClient>{children}</StaffLayoutClient>;
}
