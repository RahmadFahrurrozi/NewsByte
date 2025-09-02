"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EmptyArticleAuthor() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6">
        <DotLottieReact src="/notFound.lottie" loop autoplay />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No articles yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        You haven't created any articles yet. Start writing your first article
        to share your knowledge with the world.
      </p>
      <Link href="/dashboard-user/write-article">
        <Button variant={"outline"} className="gap-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Your First Article
        </Button>
      </Link>
    </div>
  );
}
