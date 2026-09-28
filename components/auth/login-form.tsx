"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { loginSchema, LoginSchema } from "@/validators/login-schema";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau Password salah");
        toast.error("Email atau Password salah");
        return;
      }

      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      const role = session?.user?.role;

      toast.success("Login berhasil");

      switch (role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;

        case "PETUGAS":
          router.push("/dashboard/petugas");
          break;

        case "WARGA":
          router.push("/dashboard/warga");
          break;

        default:
          router.push("/");
      }

      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="Masukkan email"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-teal-600"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <PasswordInput
          {...register("password")}
          placeholder="Masukkan password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}