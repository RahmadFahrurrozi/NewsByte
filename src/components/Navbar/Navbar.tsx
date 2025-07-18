import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
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
                <Button className="w-full" variant={"ghost"}>
                  SignIn
                </Button>
                <Button className="w-full" variant={"secondary"}>
                  SignUp
                </Button>
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

        <Link href={"/signin"}>
          <Button className="cursor-pointer" variant={"outline"}>
            SignIn
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="cursor-pointer" variant={"secondary"}>
            SignUp
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
