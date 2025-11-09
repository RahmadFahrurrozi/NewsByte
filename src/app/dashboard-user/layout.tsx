import { AppSidebarUser } from "@/components/AppSidebarUser";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LoginSuccessToast } from "@/components/LoginSuccessToast";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LoginSuccessToast />
      <AppSidebarUser />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
