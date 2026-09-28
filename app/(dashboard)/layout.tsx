import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/dashboard/sidebar-provider";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <div className="flex-1 ml-0 transition-all duration-300">
            <Topbar />
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}