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

export function AppSidebarUser(props: React.ComponentProps<typeof Sidebar>) {
  return (
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
  );
}
