export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const supabase = createClient();
  const { slug } = await params;

  const { data: article, error } = await supabase
    .from("articles")
    .select(
      `*,
      profiles (
        name,
        username,
        photo
      )
    `
    )
    .eq("slug", slug)
    .eq("article_status", "approved")
    .single();

  if (!article || error) {
    return notFound();
  }

  return <ArticleDetail article={article} mode="published" />;
}
