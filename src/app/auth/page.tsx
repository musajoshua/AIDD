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
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    if (!PASSWORD_REGEX.test(password))
      return "Password must contain at least 1 uppercase letter and 1 digit";
  }
  return undefined;
}

function validateConfirmPassword(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
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
      return "Too many attempts. Please try again later";
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
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {mode === "sign-in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mb-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {mode === "sign-in"
            ? "Sign in to access your tasks"
            : "Sign up to start managing your tasks"}
        </p>

        {/* Mode tabs */}
        <div className="mb-6 flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => switchMode("sign-in")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mode === "sign-in"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("sign-up")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mode === "sign-up"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-zinc-900/10 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:ring-zinc-100/10 ${
                errors.email
                  ? "border-red-400 dark:border-red-600"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-zinc-900/10 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:ring-zinc-100/10 ${
                errors.password
                  ? "border-red-400 dark:border-red-600"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
              placeholder={mode === "sign-up" ? "Min 8 chars, 1 uppercase, 1 digit" : "••••••••"}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (sign-up only) */}
          {mode === "sign-up" && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-zinc-900/10 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:ring-zinc-100/10 ${
                  errors.confirmPassword
                    ? "border-red-400 dark:border-red-600"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {submitting
              ? "Please wait…"
              : mode === "sign-in"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
