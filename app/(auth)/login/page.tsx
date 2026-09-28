import Link from "next/link";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-teal-600">
            SIMPAH
          </h1>

          <p className="mt-2 text-slate-500">
            Sistem Informasi Pemilahan Sampah
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-slate-600">
          Belum punya akun?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-teal-600 hover:underline"
          >
            Daftar
          </Link>
        </div>
      </div>
    </main>
  );
}