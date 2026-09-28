import { auth } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-teal-700">
          SIMPAH
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">
            {session?.user.name}
          </p>

          <p className="text-sm text-gray-500">
            {session?.user.role}
          </p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}