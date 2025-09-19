export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/client";
import { notFound, redirect } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";
import { getCurrentUser } from "@/lib/supabase/supabaseHelperServer";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewArticlePage({ params }: PageProps) {
  const supabase = createClient();
  const user = await getCurrentUser();
  const { id } = await params;

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
    .eq("id", id)
    .single();

  if (!article || error) {
    return notFound();
  }

  if (!user || user.id !== article.author_id) {
    redirect("/unauthorized");
  }

  return <ArticleDetail article={article} mode="preview" />;
}
