"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathName = usePathname();

  const hideNavbar =
    pathName === "/auth/login" ||
    pathName === "/auth/register" ||
    pathName === "/forgot-password" ||
    pathName === "/dashboard-user" ||
    pathName === "/admin/dashboard-admin" ||
    pathName === "/dashboard-user/write-article" ||
    pathName === "/dashboard-user/my-articles" ||
    pathName === "/dashboard-user/notifications" ||
    pathName === "/dashboard-user/settings" ||
    pathName === "/dashboard-user/settings/general" ||
    pathName === "/dashboard-user/settings/profile" ||
    pathName === "/dashboard-admin" ||
    pathName === "/pricing" ||
    pathName === "/unauthorized" ||
    pathName === "/dashboard/create-news";

  if (hideNavbar) {
    return null;
  }
  return <Navbar />;
}
