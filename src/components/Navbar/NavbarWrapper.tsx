"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathName = usePathname();

  const hideNavbar =
    pathName === "/dashboard" ||
    pathName === "/signin" ||
    pathName === "/signup";

  if (hideNavbar) {
    return null;
  }
  return <Navbar />;
}
