"use client";

import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import regsiterUser from "@/services/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUserProfile } from "@/types/IUserProfile";

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
    setLoading(true);
    setErrorMessage("");

    try {
      const result: IRegisterResponse = await regsiterUser(values);

      if (!result.success) {
        toast.error(result.error || "Registration failed");
        setErrorMessage(result.error || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Registration successful! Redirecting to Dashboard...");
      window.location.href = "/dashboard-user";
      router.refresh();
    } catch (error) {
      console.error("Registration API errror:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Registeration failed";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
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
