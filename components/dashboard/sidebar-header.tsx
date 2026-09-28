"use client";

import { Recycle, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

export default function SidebarHeader() {
  const { collapsed, toggle } = useSidebar();

  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 font-bold text-white shadow-lg">
          <Recycle size={20} />
        </div>
        {/* Gunakan hidden/visible agar tidak ada mismatch */}
        <div className={`flex flex-col transition-all duration-300 ${collapsed ? 'hidden md:hidden' : 'block'}`}>
          <span className="font-semibold text-white">SIMPAH</span>
          <span className="text-[10px] text-slate-400">Smart Waste System</span>
        </div>
      </div>
      <button
        onClick={toggle}
        className="hidden rounded-lg p-1 hover:bg-slate-800 md:block"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-white" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-white" />
        )}
      </button>
    </div>
  );
}