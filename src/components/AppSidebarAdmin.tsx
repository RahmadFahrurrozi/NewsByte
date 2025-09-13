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
import { sidebarAdmin } from "@/constants/dataSideBar";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppSidebarAdmin(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarAdmin.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarAdmin.nav} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarAdmin.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ProtectedRoute>
  );
}
