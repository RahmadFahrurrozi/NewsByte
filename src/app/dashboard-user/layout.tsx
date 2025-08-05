import { AppSidebarUser } from "@/components/AppSidebarUser";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeaderUser from "@/components/DashboardHeaderUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarUser />
      <SidebarInset>
        <DashboardHeaderUser />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
