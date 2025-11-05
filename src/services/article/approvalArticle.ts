import { createClient } from "@/lib/supabase/client";

export const approveArticle = async (articleId: string): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("articles")
    .update({
      article_status: "approved",
      updated_at: new Date().toISOString(),
    })
    .eq("id", articleId)
    .select()
    .single();

  if (error) throw new Error(`Failed to approve article: ${error.message}`);
};
