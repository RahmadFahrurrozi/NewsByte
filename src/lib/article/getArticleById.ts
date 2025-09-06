import { createClient } from "../supabase/client";

export async function getArticleById(articleId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
