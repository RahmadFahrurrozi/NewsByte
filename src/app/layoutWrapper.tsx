"use client"

import { usePathname } from "next/navigation";
import React from "react";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import { ThemeProvider } from "@/components/theme-provider";

export default function LayoutWrapper({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    if (isAdmin) {
        return <>{children}</>
    }
    return (
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarWrapper />
          <main className="px-6">{children}</main>
        </ThemeProvider>
    );
}