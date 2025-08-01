import { AppSidebarUser } from "@/components/AppSidebarUser";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
<<<<<<< HEAD
      <AppSidebarUser />
=======
      <AppSidebar userRole="user" />
>>>>>>> e2b6909 (feat: menambahkan tampilan dashboard)
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
