"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathName = usePathname();

  const hideNavbar =
    pathName.startsWith("/auth") ||
    pathName.startsWith("/dashboard-user") ||
    pathName.startsWith("/dashboard-admin") ||
    pathName.startsWith("/dashboard");

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
