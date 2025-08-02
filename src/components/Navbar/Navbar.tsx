import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, User } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useLogout } from "@/hooks/useLogout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useAuth();
  const { handleLogout, loading } = useLogout();
  return (
    <nav className="flex items-center justify-between py-4 px-6 sticky top-0 w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <Link className="cursor-pointer" href={"/"}>
        <h2 className="font-bold text-3xl">Newsbyte</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3 items-center">
        <div>
          <p className="text-base">Category</p>
        </div>
        <div className="flex gap-5 bg-neutral-800 text-sm text-background p-6 rounded-full">
          <Link
            className="hover:text-neutral-300 dark:text-foreground dark:hover:text-neutral-300 transition-all"
            href="/technologies"
          >
            Technologies
          </Link>
          <Link
            className="hover:text-neutral-300 dark:text-foreground dark:hover:text-neutral-300 transition-all"
            href="/crypto"
          >
            Crypto
          </Link>
          <Link
            className="hover:text-neutral-300 dark:text-foreground dark:hover:text-neutral-300 transition-all"
            href="/finance"
          >
            Finance
          </Link>
          <Link
            className="hover:text-neutral-300 dark:text-foreground dark:hover:text-neutral-300 transition-all"
            href="/ekonomi"
          >
            Ekonomi
          </Link>
          <Link
            className="hover:text-neutral-300 dark:text-foreground dark:hover:text-neutral-300 transition-all"
            href="/sports"
          >
            Sports
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              {/* <ModeToggle /> */}
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-8 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <SheetTitle>Category</SheetTitle>
                  <ModeToggle />
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    className="hover:text-neutral-300 transition-all"
                    href="/technologies"
                  >
                    Technologies
                  </Link>
                  <Link
                    className="hover:text-neutral-300 transition-all"
                    href="/crypto"
                  >
                    Crypto
                  </Link>
                  <Link
                    className="hover:text-neutral-300 transition-all"
                    href="/finance"
                  >
                    Finance
                  </Link>
                  <Link
                    className="hover:text-neutral-300 transition-all"
                    href="/ekonomi"
                  >
                    Ekonomi
                  </Link>
                  <Link
                    className="hover:text-neutral-300 transition-all"
                    href="/sports"
                  >
                    Sports
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={"/pricing"}>
                  <Button className="w-full">Subscribe</Button>
                </Link>
                {user ? (
                  <>
                    <Link
                      href={
                        user.user_metadata?.role === "admin"
                          ? "/dashboard-admin"
                          : "/dashboard-user"
                      }
                    >
                      <Button className="w-full" variant={"ghost"}>
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      className="w-full flex items-center gap-2 justify-center"
                      variant={"destructive"}
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner className="h-4 w-4" />
                          Logging out...
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4" />
                          Logout
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={"/auth/login"}>
                      <Button className="w-full" variant={"ghost"}>
                        Login
                      </Button>
                    </Link>
                    <Link href={"/auth/register"}>
                      <Button className="w-full" variant={"secondary"}>
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-2 items-center">
        <ModeToggle />
        <Link href={"/pricing"}>
          <Button className="cursor-pointer">Subscribe</Button>
        </Link>

        {user ? (
          <>
            <Link
              href={
                user.user_metadata?.role === "admin"
                  ? "/dashboard-admin"
                  : "/dashboard-user"
              }
            >
              <Button className="cursor-pointer" variant={"outline"}>
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email ? (
                      user.email.charAt(0).toUpperCase()
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={loading}>
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <LoadingSpinner className="h-4 w-4" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    {loading ? "Logging out..." : "Logout"}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={"/auth/login"}>
              <Button className="cursor-pointer" variant={"outline"}>
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button className="cursor-pointer" variant={"secondary"}>
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
