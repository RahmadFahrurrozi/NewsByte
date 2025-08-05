import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/DashboardHeaderUser";
import { AppSidebarAdmin } from "@/components/AppSideBarAdmin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
