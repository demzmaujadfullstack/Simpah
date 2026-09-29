"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  badge?: string | number;
};

export default function SidebarItem({
  href,
  icon,
  label,
  collapsed = false,
  badge,
}: Props) {
  const pathname = usePathname();

  const cleanHref = href.replace(/\?.*$/, "");
  const active =
    pathname === cleanHref ||
    (pathname.startsWith(cleanHref + "/") && cleanHref !== "/dashboard/admin" && cleanHref !== "/dashboard/petugas" && cleanHref !== "/dashboard/warga");

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center rounded-xl transition-all duration-200",
        collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
        active
          ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400 shadow-lg shadow-emerald-500/10"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
      )}
      title={collapsed ? label : undefined}
    >
      {/* Active Indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" />
      )}

      {/* Icon */}
      <span
        className={cn(
          "transition-transform duration-200",
          active ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"
        )}
      >
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 text-sm font-medium">{label}</span>
      )}

      {/* Badge */}
      {!collapsed && badge && (
        <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">
          {badge}
        </span>
      )}

      {/* Collapsed Badge */}
      {collapsed && badge && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}