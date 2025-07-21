"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import path from "path";

export default function NavbarWrapper() {
  const pathName = usePathname();

  const hideNavbar =
    pathName === "/dashboard" ||
    pathName === "/signin" ||
    pathName === "/signup" ||
    pathName === "/pricing" ||
    pathName === "/dashboard/create-news";

  if (hideNavbar) {
    return null;
  }
  return <Navbar />;
}
