import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import EditUserForm from "@/components/user/edit-user-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;

  // Ambil data user dan regions
  const [user, regions] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
    }),
    prisma.region.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit User</h1>
        <p className="text-slate-500">
          Edit data user {user.name}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <EditUserForm user={user} regions={regions} />
      </div>
    </div>
  );
}