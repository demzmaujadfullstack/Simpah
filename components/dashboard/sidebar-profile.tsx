"use client";

import { useSession } from "next-auth/react";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";

export default function SidebarProfile() {
  const { data: session } = useSession();
  const { collapsed } = useSidebar();

  const initial = session?.user?.name?.charAt(0).toUpperCase() || "U";
  const name = session?.user?.name || "User";
  const role = session?.user?.role || "User";

  const roleLabel: Record<string, string> = {
    ADMIN: "Administrator",
    PETUGAS: "Petugas",
    WARGA: "Warga",
  };

  const roleColor: Record<string, string> = {
    ADMIN: "text-red-400",
    PETUGAS: "text-blue-400",
    WARGA: "text-emerald-400",
  };

  return (
    <div
      className={cn(
        "border-b border-slate-800/50 p-4",
        collapsed && "px-2"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl bg-slate-800/40 p-3 transition-all hover:bg-slate-800/60",
          collapsed && "justify-center"
        )}
      >
        {/* Avatar */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 font-bold text-white shadow-lg shadow-emerald-500/30">
          {initial}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500" />
        </div>

        {/* Info */}
        <div
          className={`min-w-0 flex-1 transition-all duration-300 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p
            className={cn(
              "truncate text-xs font-medium",
              roleColor[role] || "text-slate-400"
            )}
          >
            {roleLabel[role] || role}
          </p>
        </div>
      </div>
    </div>
  );
}