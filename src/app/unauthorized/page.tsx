"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Unauthorized() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      <DotLottieReact src="/loading.lottie" loop autoplay className="w-96" />
      <h1 className="text-2xl font-bold">Hold up</h1>
      <p className="text-gray-600">
        You are not authorized to access this page.
      </p>
    </div>
  );
}
