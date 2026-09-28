import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-5xl">🚫</h1>

        <h2 className="mb-2 text-2xl font-bold">
          Akses Ditolak
        </h2>

        <p className="mb-6 text-slate-600">
          Kamu tidak memiliki izin untuk membuka halaman ini.
        </p>

        <Link
          href="/"
          className="rounded-xl bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}