"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { forgotPasswordAction } from "@/modules/auth/actions";
import { validateEmail } from "@/modules/auth/validation";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage("Please enter a valid registered email address.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      try {
        const result = await forgotPasswordAction(null, formData);
        if (result.success) {
          setSuccessMessage(result.message || "Password reset link sent.");
        } else {
          setErrorMessage(result.error || "Failed to process request.");
        }
      } catch {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter the email address associated with your Brightloop account, and we'll send you a password recovery link."
      eyebrow="Account Recovery"
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-body hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to login</span>
        </Link>
      }
    >
      {successMessage ? (
        <div className="space-y-4">
          <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-body leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Recovery Link Requested</span>
            </div>
            <p className="mt-1">{successMessage}</p>
          </div>

          <p className="text-[11px] text-mute leading-normal">
            Didn&apos;t receive the email? Check your spam folder or verify that you entered the correct registered address.
          </p>

          <button
            type="button"
            onClick={() => {
              setSuccessMessage(null);
              setEmail("");
            }}
            className="flex h-9 w-full items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-xs font-medium text-ink hover:bg-canvas transition-colors"
          >
            Try another email address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3 text-xs text-error font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-ink mb-1.5"
            >
              Registered Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-ink text-xs font-medium text-white shadow-whisper transition-all hover:bg-black disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending reset link...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
