"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { resetPasswordAction } from "@/modules/auth/actions";
import { validatePassword } from "@/modules/auth/validation";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isVerifyingLink, setIsVerifyingLink] = useState(true);
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Validate presence of recovery session or auth code
  useEffect(() => {
    async function verifyRecoverySession() {
      // Check if error code was returned in query params
      const errorCode = searchParams.get("error_code");
      const errorDescription = searchParams.get("error_description");
      if (errorCode || errorDescription) {
        setIsLinkValid(false);
        setErrorMessage(
          errorDescription ||
            "This password reset link has expired or has already been used. Please request a new one."
        );
        setIsVerifyingLink(false);
        return;
      }

      // Check if client has a recovery session
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        // If there's no session and no hash/code, link is invalid
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        if (!hash.includes("access_token=") && !searchParams.get("code")) {
          setIsLinkValid(false);
          setErrorMessage(
            "Invalid or expired password reset link. Please request a new recovery link."
          );
        }
      }

      setIsVerifyingLink(false);
    }

    verifyRecoverySession();
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const pwValidation = validatePassword(password);
    if (!pwValidation.isValid) {
      setErrorMessage(pwValidation.errors[0]);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    startTransition(async () => {
      try {
        const result = await resetPasswordAction(null, formData);
        if (!result.success) {
          setErrorMessage(
            result.error || "Failed to update password. Link may have expired."
          );
        } else {
          setSuccessMessage(result.message || "Password updated successfully.");
          setTimeout(() => {
            router.push("/login?reset=success");
          }, 2000);
        }
      } catch {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    });
  };

  if (isVerifyingLink) {
    return (
      <AuthCard
        title="Verifying link"
        subtitle="Please wait while we verify your password reset link..."
        eyebrow="Security Check"
      >
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-xs text-mute">
          <Loader2 className="h-6 w-6 animate-spin text-ink" />
          <span>Validating recovery credentials...</span>
        </div>
      </AuthCard>
    );
  }

  if (!isLinkValid) {
    return (
      <AuthCard
        title="Invalid or expired link"
        subtitle="This password recovery link is no longer valid, has already been used, or has expired."
        eyebrow="Recovery Error"
        footer={
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs text-body hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Request a new recovery link</span>
          </Link>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3.5 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>

          <Link
            href="/forgot-password"
            className="flex h-10 w-full items-center justify-center rounded-sm bg-ink text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            Request New Reset Link
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create new password"
      subtitle="Choose a strong, secure password that meets Brightloop's security policy."
      eyebrow="Password Recovery"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="flex items-start gap-2.5 rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{successMessage} Redirecting to login...</span>
          </div>
        )}

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
          <PasswordRequirements value={password} />
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || !!successMessage}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-ink text-xs font-medium text-white shadow-whisper transition-all hover:bg-black disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating password...</span>
            </>
          ) : (
            <span>Update Password</span>
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-xs text-mute">Loading reset page...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
