import IEditArticle from "@/types/IEditArticle";
import { createClient } from "../supabase/client";

export async function editArticleByAuthor(articleDataEdit: IEditArticle) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .update({
      title: articleDataEdit.title,
      thumbnile: articleDataEdit.thumbnile,
      content: articleDataEdit.content,
      author_id: articleDataEdit.author_id,
      categories: articleDataEdit.categories,
    })
    .eq("id", articleDataEdit.author_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "faileed to update article");
  }

  return data;
}
