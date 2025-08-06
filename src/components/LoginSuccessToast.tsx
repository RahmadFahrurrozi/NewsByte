"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContextProvider";

export function LoginSuccessToast() {
  const searchParams = useSearchParams();
  const { username } = useAuth();

  useEffect(() => {
    const loginStatus = searchParams.get("login");

    if (loginStatus === "success") {
      const timer = setTimeout(() => {
        toast.success("Login Success!", {
          description: username
            ? `Welcome, ${username}!`
            : "Welcome to Newsbyte.",
          duration: 4000,
        });

        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, username]);

  return null;
}
