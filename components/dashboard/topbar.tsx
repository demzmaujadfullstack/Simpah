"use client";

import { Search, Menu, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useSidebar } from "./sidebar-provider";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export default function Topbar() {
  const { toggle } = useSidebar();
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  const role = session?.user?.role || "WARGA";
  const rolePath = role.toLowerCase();
  const userName = session?.user?.name || "User";

  // Fetch unread notifications count
  useEffect(() => {
    if (session?.user) {
      fetch("/api/notifications/unread-count")
        .then((res) => res.json())
        .then((data) => setUnreadCount(data.count || 0))
        .catch(() => setUnreadCount(0));
    }
  }, [session]);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrator";
      case "PETUGAS":
        return "Petugas";
      case "WARGA":
        return "Warga";
      default:
        return "User";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* LEFT - Menu Toggle & Search */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:bg-slate-100 md:h-10 md:w-10 md:rounded-xl"
          aria-label="Toggle Sidebar"
        >
          <Menu size={18} className="md:size-5" />
        </button>

        <div className="relative hidden md:block w-[200px] lg:w-[320px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 md:rounded-xl"
          />
        </div>
      </div>

      {/* RIGHT - Notifications & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <button className="relative rounded-lg border p-2 transition hover:bg-slate-100 md:rounded-xl">
          <Bell size={18} className="md:size-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white md:h-5 md:w-5 md:text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown - TANPA DropdownMenuLabel */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border px-2 py-1.5 transition hover:bg-slate-100 md:rounded-xl md:px-3 md:py-2">
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 md:h-10 md:w-10 md:text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* User Info - Hide on mobile */}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-slate-500">{getRoleLabel(role)}</p>
            </div>

            <ChevronDown size={16} className="hidden text-slate-400 sm:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {/* Header User - Custom tanpa DropdownMenuLabel */}
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold text-slate-800">{userName}</p>
              <p className="text-xs text-slate-500">{getRoleLabel(role)}</p>
            </div>

            <DropdownMenuSeparator />

            {/* Menu Items */}
            <DropdownMenuGroup>
              <Link href={`/dashboard/${rolePath}/profile`}>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
              </Link>

              <Link href={`/dashboard/${rolePath}/settings`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}