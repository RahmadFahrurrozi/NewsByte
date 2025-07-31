"use client";

import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useRouter } from "next/navigation";
export default function Unauthorized() {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      <DotLottieReact src="/CCTVCamera.lottie" loop autoplay className="w-96" />
      <h1 className="text-2xl font-bold">Upps!</h1>
      <p className="text-gray-600">
        You are not authorized to access this page.
      </p>
      <Button
        className="mt-4 cursor-pointer"
        variant="outline"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </div>
  );
}
