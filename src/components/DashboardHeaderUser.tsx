"use client";

import { usePathname } from "next/navigation";
import getBreadcrumbTitle from "@/utils/getBreadcrumbTitleUser";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./ModeToggle";
import getBreadcrumbTitleUser from "@/utils/getBreadcrumbTitleUser";

export default function DashboardHeaderUser() {
  const pathname = usePathname();
  const titlePage = getBreadcrumbTitleUser(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-6">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div className="flex justify-between items-center w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{titlePage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ModeToggle />
      </div>
    </header>
  );
}
