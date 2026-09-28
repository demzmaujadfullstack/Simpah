"use client";

import { useSession } from "next-auth/react";
import { useSidebar } from "./sidebar-provider";
import SidebarItem from "./sidebar-item";
import {
  LayoutDashboard,
  Users,
  MapPinned,
  Recycle,
  Package,
  ChartColumn,
  Settings,
  Clock,
  Plus,
  Gift,
} from "lucide-react";

// ========================================
// DEFINISI TIPE
// ========================================
type MenuItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
};

type MenuSection = {
  label: string;
  items: MenuItem[];
};

type MenuConfig = {
  [key: string]: {
    sections: MenuSection[];
  };
};

export default function SidebarNav() {
  const { data: session } = useSession();
  const { collapsed } = useSidebar();

  const role = session?.user?.role || "WARGA";

  // ========================================
  // MENU BERDASARKAN ROLE
  // ========================================
  
  const menuConfig: MenuConfig = {
    ADMIN: {
      sections: [
        {
          label: "Dashboard",
          items: [
            { href: "/dashboard/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          ],
        },
        {
          label: "Master Data",
          items: [
            { href: "/dashboard/admin/users", icon: <Users size={20} />, label: "User" },
            { href: "/dashboard/admin/wilayah", icon: <MapPinned size={20} />, label: "Wilayah" },
            { href: "/dashboard/admin/sampah", icon: <Recycle size={20} />, label: "Jenis Sampah" },
          ],
        },
        {
          label: "Transaksi",
          items: [
            { href: "/dashboard/admin/submissions", icon: <Package size={20} />, label: "Setoran" },
          ],
        },
        {
          label: "Reward",
          items: [
            { href: "/dashboard/admin/rewards", icon: <Gift size={20} />, label: "Kelola Reward" },
          ],
        },
        {
          label: "Laporan",
          items: [
            { href: "/dashboard/admin/laporan", icon: <ChartColumn size={20} />, label: "Laporan" },
          ],
        },
        {
          label: "Pengaturan",
          items: [
            { href: "/dashboard/admin/settings", icon: <Settings size={20} />, label: "Pengaturan" },
          ],
        },
      ],
    },
    
    PETUGAS: {
      sections: [
        {
          label: "Dashboard",
          items: [
            { href: "/dashboard/petugas", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          ],
        },
        {
          label: "Transaksi",
          items: [
            { href: "/dashboard/petugas/submissions", icon: <Package size={20} />, label: "Setoran" },
            { 
              href: "/dashboard/petugas/submissions?status=PENDING", 
              icon: <Clock size={20} />, 
              label: "Verifikasi", 
              badge: "0"
            },
          ],
        },
      ],
    },
    
    WARGA: {
      sections: [
        {
          label: "Dashboard",
          items: [
            { href: "/dashboard/warga", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          ],
        },
        {
          label: "Setoran",
          items: [
            { href: "/dashboard/warga/submissions", icon: <Package size={20} />, label: "Setoran Saya" },
            { href: "/dashboard/warga/submissions/create", icon: <Plus size={20} />, label: "Setor Sampah" },
          ],
        },
        {
          label: "Reward",
          items: [
            { href: "/dashboard/warga/rewards", icon: <Gift size={20} />, label: "Tukar Poin" },
          ],
        },
      ],
    },
  };

  // Ambil menu sesuai role, fallback ke WARGA
  const menu = menuConfig[role as keyof typeof menuConfig] || menuConfig.WARGA;

  return (
    <div className="flex-1 overflow-y-auto py-5">
      {menu.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          {!collapsed && section.label && (
            <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
              {section.label}
            </p>
          )}
          <div className="space-y-1 px-3">
            {section.items.map((item, itemIndex) => (
              <SidebarItem
                key={itemIndex}
                href={item.href}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                badge={item.badge}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}