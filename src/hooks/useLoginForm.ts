"use client";

import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import loginUser from "@/services/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/IUser";
interface ILoginResponse {
  success: boolean;
  data: {
    role: string;
    user: IUser;
  };
  message?: string;
  error?: string;
  role: string;
}

export function useLoginForm() {
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

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result: ILoginResponse = await loginUser(values);

      if (!result.success) {
        toast.error(result.error || "Login failed");
        setErrorMessage(result.error || "Login failed");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      const role = result.data.role;

      if (role === "admin") {
        window.location.href = "/dashboard-admin";
      } else if (role === "user") {
        window.location.href = "/dashboard-user";
      }

      router.refresh();
    } catch (error) {
      console.error("Login API error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, errorMessage, handleSubmit };
}
