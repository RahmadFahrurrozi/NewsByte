"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ErrorArticleClient() {
  return (
    <div className="flex items-center flex-col justify-center min-h-[80vh]">
      <DotLottieReact src="/error.lottie" loop autoplay className="w-[500px]" />
      <h1 className="text-2xl font-bold">Upps!</h1>
      <p className="text-foreground">
        <span className="font-bold text-red-500">Shometing went wrong!</span>{" "}
        please try again later.
      </p>
    </div>
  );
}
