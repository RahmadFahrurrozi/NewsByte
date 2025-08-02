import {
  Activity,
  BellDot,
  BookOpen,
  PencilLine,
  Settings,
} from "lucide-react";

const DATA_SIDEBAR_USER = [
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
]; 

export default DATA_SIDEBAR_USER;