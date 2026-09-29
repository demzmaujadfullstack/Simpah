"use client";

import SidebarHeader from "./sidebar-header";
import SidebarProfile from "./sidebar-profile";
import SidebarNav from "./sidebar-nav";
import SidebarFooter from "./sidebar-footer";
import { useSidebar } from "./sidebar-provider";

export default function Sidebar() {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`
        sticky
        top-0
        h-screen
        bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
        shadow-2xl
        border-r
        border-slate-800/50
        transition-all
        duration-300
        ease-in-out
        flex
        flex-col
        overflow-hidden
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      <SidebarHeader />
      <SidebarProfile />
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <SidebarNav />
      </div>
      <SidebarFooter />
    </aside>
  );
}