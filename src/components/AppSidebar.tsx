"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import DATA_SIDEBAR_ADMIN from "./DataSidebar/NavMainAdmin";
import DATA_SIDEBAR_USER from "./DataSidebar/NavMainUser";

const DATA_SIDEBAR = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    }, 
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "user" | "admin";
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const dataSidebar = userRole === "admin" ? DATA_SIDEBAR_ADMIN : DATA_SIDEBAR_USER;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={DATA_SIDEBAR.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataSidebar} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={DATA_SIDEBAR.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
