"use client";

import * as React from "react";
import {
  Activity,
  AudioWaveform,
  BellDot,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  PencilLine,
  Settings,
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
  navMainUser: [
    {
      title: "Dasboard",
      url: "/dashboard-user",
      icon: Activity,
    },
    {
      title: "Write Article",
      url: "/dashboard-user/write-article",
      icon: PencilLine,
    },
    {
      title: "My Articles",
      url: "/dashboard-user/my-articles",
      icon: BookOpen,
    },
    {
      title: "Notifications",
      url: "/dashboard-user/notifications",
      icon: BellDot,
    },
    {
      title: "Settings",
      url: "/dashbord-user/settings",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/dashboard-user/settings/general",
        },

        {
          title: "Profile",
          url: "/dashboard-user/settings/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={DATA_SIDEBAR.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={DATA_SIDEBAR.navMainUser} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={DATA_SIDEBAR.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
