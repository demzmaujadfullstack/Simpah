import Link from "next/link";
import { User, Role } from "@prisma/client";
import { Eye, Edit } from "lucide-react";
import DeleteUser from "./delete-user";

interface UserTableProps {
  users: (User & {
    region: {
      name: string;
    } | null;
  })[];
}

export default function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <p className="text-slate-500">Tidak ada user ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-slate-600">
              Nama
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-600">
              Email
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-600">
              Role
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-600">
              Wilayah
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-600">
              Point
            </th>
            <th className="p-4 text-center text-sm font-semibold text-slate-600">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-slate-50">
              <td className="p-4">
                <Link
                  href={`/dashboard/admin/users/${user.id}`}
                  className="font-medium hover:text-emerald-600 hover:underline"
                >
                  {user.name}
                </Link>
              </td>

              <td className="p-4 text-slate-600">{user.email}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-700"
                      : user.role === "PETUGAS"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="p-4 text-slate-600">
                {user.region?.name || "-"}
              </td>

              <td className="p-4 font-semibold text-emerald-600">
                {user.totalPoint}
              </td>

              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/dashboard/admin/users/${user.id}`}
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    title="Detail"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/dashboard/admin/users/${user.id}/edit`}
                    className="rounded-lg p-2 text-yellow-600 hover:bg-yellow-50"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>

                  <DeleteUser userId={user.id} userName={user.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}