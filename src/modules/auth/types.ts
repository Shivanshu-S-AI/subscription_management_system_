import type { UserRole } from "@/lib/constants/roles";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  redirectTo?: string;
}
