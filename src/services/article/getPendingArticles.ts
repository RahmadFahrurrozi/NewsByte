import { IArticles } from "@/types/IArticles";
import { createClient } from "../../lib/supabase/client";

interface IArticlesPending {
  data: IArticles[] | null;
  error: Error | null;
}

export async function getPendingArticles(): Promise<IArticlesPending> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`*, profiles(*)`)
    .eq("article_status", "pending")
    .order("created_at", { ascending: false });

  if (data?.length === 0) {
    const { data, error } = { data: null, error: null };
    return { data, error };
  }

  return { data, error };
}
