"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ForgotPasswordPage() {
  return (
    <>
      <section className="flex items-center flex-col justify-center min-h-screen">
        <DotLottieReact src="/loading.lottie" loop autoplay className="w-96" />
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-600">Will be implemented soon</p>
      </section>
    </>
  );
}
