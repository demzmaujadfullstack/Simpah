"use client";

import { Recycle, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

export default function SidebarHeader() {
  const { collapsed, toggle } = useSidebar();

  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-800/50 px-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-500/30">
          <Recycle size={22} className="text-white" />
        </div>

        {/* Text */}
        <div
          className={`flex flex-col transition-all duration-300 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <span className="text-lg font-bold text-white tracking-tight">
            SIMPAH
          </span>
          <span className="text-[10px] font-medium text-emerald-400/70 uppercase tracking-wider">
            Smart Waste
          </span>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>
    </div>
  );
}