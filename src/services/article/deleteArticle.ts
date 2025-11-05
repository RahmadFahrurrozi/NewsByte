import { createClient } from "../../lib/supabase/client";

export async function deleteArticle(articleId: string) {
  const supabase = createClient();

  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("thumbnile")
    .eq("id", articleId)
    .single();

  if (fetchError) {
    return { error: fetchError };
  }

  if (!article) {
    return { error: { message: "Article not found" } };
  }

  if (article.thumbnile) {
    let filePath = article.thumbnile;

    if (article.thumbnile.includes("/storage/v1/object/public/articles/")) {
      const urlParts = article.thumbnile.split(
        "/storage/v1/object/public/articles/"
      );
      if (urlParts.length > 1) {
        filePath = urlParts[1];
      }
    }

    const { error: storageError } = await supabase.storage
      .from("articles")
      .remove([filePath]);

    if (storageError) {
      console.warn("Could not delete thumbnail:", storageError);
    }
  }

  const { error: deleteError } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);

  return { error: deleteError };
}
