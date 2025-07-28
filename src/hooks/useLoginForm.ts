"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useState } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

export function useLoginFormUser() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const router = useRouter();

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to login");
        setErrorMessage(data.error || "Failed to login");
        return;
      }

      toast.success("Login Successfully!");

      // Force refresh untuk memastikan cookies terbaca oleh middleware
      window.location.href =
        data.role === "admin" ? "/dashboard-admin" : "/dashboard-user";
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading, errorMessage };
}
