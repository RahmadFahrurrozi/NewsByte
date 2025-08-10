import { createClient } from "@/lib/supabase/client";
import { IArticles } from "@/types/IArticles";

export async function getApprovedArticles(): Promise<{
  data: IArticles[] | null;
  error: Error | null;
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(`*, profiles(*)`)
    .eq("article_status", "approved")
    .order("created_at", { ascending: false });

  return { data, error };
}
