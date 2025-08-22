"use client";

import {
  BadgeCheck,
  Bell,
  EllipsisVertical,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LoadingSpinner } from "./LoadingSpinner";
import { useAuth } from "@/contexts/AuthContextProvider";
import { Badge } from "./ui/badge";

export function NavUser({}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { handleLogout, loading } = useLogout();
  const { user, userRole } = useAuth();

  // function helper to get initials from email
  const getInitials = (email: string | undefined) => {
    if (!email) return "";
    const parts = email.split("@");
    if (parts.length > 0) {
      return parts[0].charAt(0).toUpperCase();
    }
    return "";
  };

  const getUsernameFromEmail = (email: string | undefined) => {
    if (!email) return "Pengguna";
    // Ambil bagian sebelum @
    const username = email.split("@")[0];
    // Ubah huruf pertama jadi kapital
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  const initials = getInitials(user?.email);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar>
                <AvatarFallback className="text-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {getUsernameFromEmail(user?.email)}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarFallback className="text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 text-sm leading-tight truncate">
                  <span className="truncate font-medium">
                    {getUsernameFromEmail(user?.email)}
                  </span>
                  <Badge
                    className={`truncate text-xs ${
                      userRole === "admin"
                        ? "bg-red-100 text-red-500"
                        : "bg-blue-100 text-blue-500"
                    }`}
                  >
                    {userRole}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={loading}
              className="cursor-pointer my-1"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  <p>Loging out...</p>
                </>
              ) : (
                <>
                  <LogOut />
                  <p>Log out</p>
                </>
              )}
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
