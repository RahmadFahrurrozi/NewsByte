"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <DotLottieReact
          src="/AbstractIsometricLoader.lottie"
          loop
          autoplay
          className="w-96"
        />
      </div>
    </div>
  );
}
