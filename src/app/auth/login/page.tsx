"use client";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  const handleSuccess = () => {};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
}
