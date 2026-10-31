export type UserRole = "admin" | "staff" | "customer";

export const USER_ROLES = {
  ADMIN: "admin" as const,
  STAFF: "staff" as const,
  CUSTOMER: "customer" as const,
} as const;

export const ROLE_DESTINATIONS: Record<UserRole, string> = {
  admin: "/admin",
  staff: "/staff",
  customer: "/portal",
};
