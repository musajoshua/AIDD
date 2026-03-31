"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";

type AuthMode = "sign-in" | "sign-up";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return undefined;
}

function validatePassword(password: string, mode: AuthMode): string | undefined {
  if (!password) return "Password is required";
  if (mode === "sign-up") {
    if (password.length < PASSWORD_MIN_LENGTH)
      return `Minimum ${PASSWORD_MIN_LENGTH} characters`;
    if (!PASSWORD_REGEX.test(password))
      return "Must contain 1 uppercase letter and 1 digit";
  }
  return undefined;
}

function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return undefined;
}

function mapFirebaseError(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password";
    case "auth/too-many-requests":
      return "Too many attempts — please try again later";
    case "auth/weak-password":
      return "Password is too weak";
    default:
      return "An error occurred. Please try again";
  }
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  function validateForm(): FormErrors {
    const formErrors: FormErrors = {};
    formErrors.email = validateEmail(email);
    formErrors.password = validatePassword(password, mode);
    if (mode === "sign-up") {
      formErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);
    }
    return formErrors;
  }

  function switchMode(newMode: AuthMode) {
    setMode(newMode);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formErrors = validateForm();
    const hasErrors = Object.values(formErrors).some(Boolean);
    setErrors(formErrors);
    if (hasErrors) return;

    setSubmitting(true);
    setErrors({});

    try {
      if (mode === "sign-in") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrors({ general: mapFirebaseError(error) });
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <main className="w-full max-w-[400px] flex flex-col items-center space-y-8">
        {/* Brand */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-on-surface">
            TaskFlow
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </p>
        </header>

        {/* Error banner */}
        {errors.general && (
          <div className="w-full rounded border border-error/20 bg-error-container/10 px-4 py-3 text-sm text-error">
            {errors.general}
          </div>
        )}

        {/* Form */}
        <section className="w-full bg-surface-container-low p-1 rounded-lg">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block px-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant"
              >
                {mode === "sign-in" ? "Workspace Email" : "Email Address"}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full bg-surface-container-lowest border rounded-lg py-3 px-4 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all duration-200 ${
                  errors.email
                    ? "border-error/50"
                    : "border-outline-variant/50"
                }`}
              />
              {errors.email && (
                <p className="px-1 font-mono text-[11px] text-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label
                  htmlFor="password"
                  className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant"
                >
                  {mode === "sign-in" ? "Security Key" : "Password"}
                </label>
              </div>
              <input
                id="password"
                type="password"
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-surface-container-lowest border rounded-lg py-3 px-4 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all duration-200 ${
                  errors.password
                    ? "border-error/50"
                    : "border-outline-variant/50"
                }`}
              />
              {errors.password && (
                <p className="px-1 font-mono text-[11px] text-error">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (sign-up) */}
            {mode === "sign-up" && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block px-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-surface-container-lowest border rounded-lg py-3 px-4 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all duration-200 ${
                    errors.confirmPassword
                      ? "border-error/50"
                      : "border-outline-variant/50"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="px-1 font-mono text-[11px] text-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-on-background text-background font-semibold py-3.5 rounded-lg active:scale-[0.98] transition-all duration-100 hover:bg-on-surface/90 disabled:opacity-50 disabled:active:scale-100"
            >
              {submitting
                ? "Please wait…"
                : mode === "sign-in"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center space-y-4">
          <p className="text-on-surface-variant text-sm">
            {mode === "sign-in" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("sign-up")}
                  className="text-on-surface hover:text-primary transition-colors font-medium ml-1 underline decoration-outline-variant/50 underline-offset-4"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("sign-in")}
                  className="text-on-surface hover:text-primary transition-colors font-medium ml-1 underline decoration-outline-variant/50 underline-offset-4"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <span className="h-px w-8 bg-outline-variant/30" />
            <p className="font-mono text-[10px] text-outline uppercase tracking-[0.2em]">
              v1.0.0
            </p>
            <span className="h-px w-8 bg-outline-variant/30" />
          </div>
        </footer>
      </main>
    </div>
  );
}
