"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("Invalid credentials.");
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-md border border-slate-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full rounded-md border border-slate-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
            {errors.password && (
              <p className="text-xs text-red-500">
                {String(errors.password.message)}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p className="rounded bg-red-50 p-2 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
