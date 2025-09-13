import {
  Activity,
  BellDot,
  BookOpen,
  GalleryVerticalEnd,
  Home,
  PencilLine,
  Settings,
} from "lucide-react";

export const sidebarUser = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Dashboard Writer",
      logo: GalleryVerticalEnd,
      role: "Writer",
    },
  ],
  nav: [
    {
      title: "Dashboard",
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
      url: "/dashboard-user/settings",
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
  navFooter: [
    {
      title: "Back to Home",
      url: "/",
      icon: Home,
    },
  ],
};

export const sidebarAdmin = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Admin",
      logo: GalleryVerticalEnd,
      role: "Admin",
    },
  ],
  nav: [
    {
      title: "Dashboard",
      url: "/dashboard-admin",
      icon: Activity,
    },
    {
      title: "Profile Admin",
      url: "/dashboard-admin/profile-admin",
      icon: PencilLine,
    },
  ],
};
