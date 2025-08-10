"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EmptyArticleClient() {
  return (
    <div className="flex items-center flex-col justify-center min-h-[80vh]">
      <DotLottieReact
        src="/notFound.lottie"
        loop
        autoplay
        className="w-[500px]"
      />
      <h1 className="text-2xl font-bold">Upps!</h1>
      <p className="text-gray-600">No news found!, waiting for new aricles</p>
    </div>
  );
}
