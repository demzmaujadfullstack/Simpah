import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requirePetugas() {
  const session = await requireAuth();

  if (session.user.role !== "PETUGAS") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireWarga() {
  const session = await requireAuth();

  if (session.user.role !== "WARGA") {
    redirect("/unauthorized");
  }

  return session;
}