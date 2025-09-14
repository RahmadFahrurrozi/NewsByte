import IEditArticle from "@/types/IEditArticle";
import { createClient } from "../supabase/client";

export async function editArticleByAuthor(
  articleDataEdit: IEditArticle & { article_id: string }
) {
  const supabase = createClient();
  let thumbnileUrl = articleDataEdit.thumbnile as string | null;

  if (articleDataEdit.thumbnile instanceof File) {
    const file = articleDataEdit.thumbnile;
    const fileExt = file.name.split(".").pop();
    const fileName = `article_${articleDataEdit.article_id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      throw new Error(`Failed to upload thumbnail: ${uploadError.message}`);
    }

    const { data: publicUrl } = supabase.storage
      .from("articles")
      .getPublicUrl(fileName);

    thumbnileUrl = publicUrl.publicUrl;
  }

  const { data, error } = await supabase
    .from("articles")
    .update({
      title: articleDataEdit.title,
      thumbnile: thumbnileUrl,
      content: articleDataEdit.content,
      author_id: articleDataEdit.author_id,
      categories: articleDataEdit.categories,
    })
    .eq("id", articleDataEdit.article_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Gagal memperbarui artikel");
  }

  return data;
}
