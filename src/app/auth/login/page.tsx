"use client";
import { LoginForm } from "@/components/LoginForm";
import { ModeToggle } from "@/components/ModeToggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const handleSuccess = () => {};

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="rounded-full p-2 border border-border bg-background/80 backdrop-blur-md shadow w-fit">
                <ArrowLeft className="size-4 text-foreground" />
              </div>
              <p className="text-muted-foreground">Back</p>
            </div>
          </Link>
          <ModeToggle />
        </div>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </section>
  );
}
