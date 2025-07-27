"use client";
import { RegisterForm } from "@/components/RegsiterForm";

export default function LoginPage() {
  const handleSuccess = () => {};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}
