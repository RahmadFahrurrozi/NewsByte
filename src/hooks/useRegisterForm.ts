"use client";

import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IRegisterResponse {
  success: boolean;
  profileData: IUserProfile;
  error?: string;
}

export function useRegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log("=== REGISTRATION START ===");
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      const result: IRegisterResponse = await response.json();

      console.log("API Response:", {
        status: response.status,
        success: result.profileData,
        error: result.error,
      });

      if (!response.ok || !result.success) {
        const errorMsg = result.error || "Registration failed";
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
        return;
      }

      console.log("Registration successful");
      toast.success("Registration successful! Redirecting to dashboard...");

      // Redirect to dashboard since no email verification needed
      router.push("/dashboard-user");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Network error occurred";
      toast.error(errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      console.log("=== REGISTRATION END ===");
      setLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    loading,
    errorMessage,
  };
}
