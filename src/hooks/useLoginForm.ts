"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ILoginResponse {
  success: boolean;
  data?: {
    user: IUser;
    role: string;
  };
  error?: string;
}

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
  const router = useRouter();

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Call API route instead of direct Supabase
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result: ILoginResponse = await response.json();

      if (!result.success) {
        toast.error(result.error || "Login failed");
        setErrorMessage(result.error || "Login failed");
        return;
      }

      toast.success("Login successful!");

      // Redirect based on role
      const userRole = result.data?.role;
      if (userRole === "admin") {
        router.push("/dashboard-admin");
      } else if (userRole === "user") {
        router.push("/dashboard-user");
      } else {
        router.push("/");
      }

      // Refresh the page to update auth state
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Network error occurred";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading, errorMessage };
}
