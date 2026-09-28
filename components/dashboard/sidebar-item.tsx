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

  // Cek active dengan menghilangkan query params
  const cleanHref = href.replace(/\?.*$/, "");
  const active = pathname === cleanHref || pathname.startsWith(cleanHref + "/");

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-xl transition-all duration-300",
        collapsed
          ? "justify-center p-3"
          : "gap-3 px-4 py-3",
        active
          ? "bg-sky-500 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      )}
    >
      <span>{icon}</span>

      {!collapsed && (
        <>
          <span className="flex-1 font-medium">{label}</span>
          {badge && (
            <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}