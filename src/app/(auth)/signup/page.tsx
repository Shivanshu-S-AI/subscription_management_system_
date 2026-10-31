"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { signUpCustomerAction } from "@/modules/auth/actions";
import { validatePassword } from "@/modules/auth/validation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Frontend pre-validation
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

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
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    startTransition(async () => {
      try {
        const result = await signUpCustomerAction(null, formData);
        if (!result.success) {
          setErrorMessage(result.error || "Failed to create account.");
        } else if (result.message) {
          setSuccessMessage(result.message);
        }
      } catch (err: any) {
        // Next.js redirect throws a NEXT_REDIRECT error which is normal
        if (err?.message?.includes("NEXT_REDIRECT")) return;
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to access Brightloop's data analysis platform and manage your subscriptions."
      eyebrow="Customer Registration"
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-ink hover:underline transition-all"
          >
            Log in
          </Link>
        </p>
      }
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
            <span>{successMessage}</span>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Email Address
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

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Password
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
          {/* Live validation checklist */}
          <PasswordRequirements value={password} />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Confirm Password
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-ink text-xs font-medium text-white shadow-whisper transition-all hover:bg-black disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>

        <p className="text-[11px] text-center text-mute pt-2">
          By signing up, you agree to Brightloop&apos;s Terms and Privacy Policy.
        </p>
      </form>
    </AuthCard>
  );
}
