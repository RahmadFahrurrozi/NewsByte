"use client";

import { useParams } from "next/navigation";
import EditArticleForm from "@/components/EditArticleForm";

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  if (!articleId) {
    return (
      <div className="px-6 pb-5">
        <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
        <p className="text-gray-300">Article ID is required</p>
      </div>
    );
  }

  return (
    <div className="px-6 pb-4">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <EditArticleForm articleId={articleId} />
    </div>
  );
}
