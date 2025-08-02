"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Logout failed");
        setErrorMessage(result.error || "Logout failed");
        setLoading(false);
        return;
      }
      toast.success("Logout successful!");
      router.push("/");
      setLoading(false);
      return;
    } catch (error) {
      console.error("Logout API error:", error);
      toast.error("Logout failed");
      setErrorMessage("Logout failed");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, handleLogout };
};
