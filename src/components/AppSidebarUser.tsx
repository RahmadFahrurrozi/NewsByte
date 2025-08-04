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
import Link from "next/link";
import { Button } from "./ui/button";

export function AppSidebarUser(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarUser.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarUser.nav} />
        </SidebarContent>
        <Link href={"/"}>
          <div className="p-2 max-w-full">
            <Button className="rounded-md w-full cursor-pointer">
              Back to Home
            </Button>
          </div>
        </Link>
        <SidebarFooter>
          <NavUser user={sidebarUser.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ProtectedRoute>
  );
}
