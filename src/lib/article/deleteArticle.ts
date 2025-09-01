import { createClient } from "../supabase/client";

export async function deleteArticle(articleId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);
  return { error };
}
