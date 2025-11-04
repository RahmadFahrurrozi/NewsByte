"use client";

import ArticleReassons from "@/components/Admin/ArticleReassons";
import { useParams } from "next/navigation";

export default function ReassonArticlesPage() {
  const params = useParams();
  const articleId = params.articleId as string;
  return <ArticleReassons articleId={articleId} />;
}
