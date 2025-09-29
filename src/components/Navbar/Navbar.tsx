import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NeonButton } from "../ui/neon-button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/contexts/AuthContextProvider";
import { LoadingSpinner } from "../LoadingSpinner";

const Navbar = () => {
  const { user, loading, userRole } = useAuth();
  return (
    <nav className="flex items-center justify-between py-4 px-6 sticky top-0 w-full bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent z-50">
      <Link className="cursor-pointer" href={"/"}>
        <h2 className="font-bold text-3xl">Newsbyte</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3 items-center">
        <div>
          <p className="text-base">Category</p>
        </div>
        <div className="flex gap-5 bg-background text-sm text-background p-6 rounded-full">
          <Link
            className="text-foreground hover:text-muted-foreground transition-all"
            href="/technologies"
          >
            Technologies
          </Link>
          <Link
            className="text-foreground hover:text-muted-foreground transition-all"
            href="/crypto"
          >
            Crypto
          </Link>
          <Link
            className="text-foreground hover:text-muted-foreground transition-all"
            href="/finance"
          >
            Finance
          </Link>
          <Link
            className="text-foreground hover:text-muted-foreground transition-all"
            href="/ekonomi"
          >
            Ekonomi
          </Link>
          <Link
            className="text-foreground hover:text-muted-foreground transition-all"
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
                {loading ? (
                  // ✅ Show loading state
                  <div className="flex items-center justify-center p-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  </div>
                ) : user ? (
                  <Link
                    href={
                      userRole === "user"
                        ? "/dashboard-user"
                        : "/dashboard-admin"
                    }
                  >
                    <NeonButton className="w-full">Dashboard</NeonButton>
                  </Link>
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
        {loading ? (
          <div className="flex items-center justify-center p-2">
            <LoadingSpinner />
          </div>
        ) : user ? (
          <Link
            href={userRole === "user" ? "/dashboard-user" : "/dashboard-admin"}
          >
            <NeonButton
              variant={"default"}
              className="cursor-pointer rounded-md"
            >
              Dashboard
            </NeonButton>
          </Link>
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
