"use client";

import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import loginUser from "@/services/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ILoginResponse {
  success: boolean;
  loginData: IUser;
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

      toast.success("login successful!");
      if (result.role == "admin") {
        router.push("/dashboard-admin");
      } else if (result.role == "user") {
        router.push("/dashboard-user");
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
