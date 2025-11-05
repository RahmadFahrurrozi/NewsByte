import { createClient } from "../../lib/supabase/client";
import { reassonsArtcleValues } from "@/schemas/reassonsArticle.schema";
import { IReassonArticle } from "@/types/IReassonArticle";

const supabase = createClient();

export const rejectArticleWithReasson = async (
  articleId: string,
  reassonData: reassonsArtcleValues,
  reviewer: string
): Promise<void> => {
  console.log("update article status");
  const { error: articleError } = await supabase
    .from("articles")
    .update({
      article_status: "rejected",
      updated_at: new Date().toISOString(),
    })
    .eq("id", articleId)
    .select()
    .single();

  if (articleError) {
    console.log(`Failed to reject article: ${articleError.message}`);
    throw new Error(`Failed to reject article: ${articleError.message}`);
  }

  //create rejection article
  const { data, error: reassonError } = await supabase
    .from("article_reviews")
    .insert([
      {
        article_id: articleId,
        title: reassonData.title,
        message: reassonData.message,
        reviewer: reassonData.reviewer || reviewer,
        created_at: new Date().toISOString(),
      },
    ]);

  console.table(`Reasson created: ${data}`);

  if (reassonError) {
    console.log(`Failed to create reasson: ${reassonError.message}`);
    throw new Error(`Failed to create reasson: ${reassonError.message}`);
  }
};

export const getarticleReassons = async (
  articleId: string
): Promise<IReassonArticle[]> => {
  const { data, error } = await supabase
    .from("article_reviews")
    .select("*")
    .eq("article_id", articleId)
    .order("created_At", { ascending: false });

  if (error) {
    throw new Error(`Failed to get article reassons: ${error.message}`);
  }

  return data || [];
};
