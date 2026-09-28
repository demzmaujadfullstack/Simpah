"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";

export default function SidebarProfile() {
  const { data: session } = useSession();
  const { collapsed } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const initial = session?.user?.name?.charAt(0).toUpperCase() || "U";
  const name = session?.user?.name || "User";
  const role = session?.user?.role || "User";

  return (
    <div
      className={cn(
        "border-b border-slate-800 p-4",
        collapsed ? "px-2" : "px-4"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg bg-slate-800/50 p-3",
          collapsed && "justify-center"
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
          {isMounted ? initial : "U"}
        </div>
        <div
          className={`min-w-0 flex-1 transition-all duration-300 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <p className="truncate text-sm font-medium text-white">
            {isMounted ? name : "User"}
          </p>
          <p className="truncate text-xs text-slate-400">
            {isMounted ? role : "User"}
          </p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-green-500">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}