//buat tes aja nanti ganti sesuai kebutuhan

"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "@/components/team-switcher";
import { sidebarUser } from "@/constants/dataSideBar";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppSidebarAdmin(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarUser.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarUser.nav} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarUser.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ProtectedRoute>
  );
}
