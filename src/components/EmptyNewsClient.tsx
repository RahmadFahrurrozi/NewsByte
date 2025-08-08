"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function EmptyNewsClient() {
  return (
    <div className="flex items-center flex-col justify-center min-h-[80vh]">
      <DotLottieReact src="/CCTVCamera.lottie" loop autoplay className="w-96" />
      <h1 className="text-2xl font-bold">Upps!</h1>
      <p className="text-gray-600">No news found!, waiting for new aricles</p>
      <Button className="mt-4 cursor-pointer">Back to home</Button>
    </div>
  );
}
