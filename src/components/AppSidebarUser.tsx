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
import { sidebarUser } from "@/constants/dataSideBarUser";
import { ProtectedRoute } from "@/contexts/ProtectedRoute";
import { NavFooter } from "./NavFooter";

export function AppSidebarUser(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarUser.teams} />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col justify-between h-full">
            <NavMain items={sidebarUser.nav} />
            <NavFooter items={sidebarUser.navFooter} />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarUser.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ProtectedRoute>
  );
}
