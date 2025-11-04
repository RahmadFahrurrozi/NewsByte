import { createClient } from "../supabase/client";
import { slugify } from "@/utils/slugify";
import ICreateArticle from "@/types/ICreateArticle";

const supabase = createClient();

export async function uploadThumbnail(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("articles")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: publicUrl } = supabase.storage
    .from("articles")
    .getPublicUrl(fileName);
  return publicUrl.publicUrl;
}

export async function createArticleByAuthor(articleData: ICreateArticle) {
  let slug = slugify(articleData.title);

  const { data: existing } = await supabase
    .from("articles")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  let thumbnailUrl = "";
  if (articleData.thumbnile instanceof File) {
    thumbnailUrl = await uploadThumbnail(articleData.thumbnile);
  } else if (typeof articleData.thumbnile === "string") {
    thumbnailUrl = articleData.thumbnile;
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: articleData.title,
      thumbnile: thumbnailUrl,
      content: articleData.content,
      author_id: articleData.author_id,
      categories: articleData.categories,
      article_status: articleData.article_status ?? "pending",
      slug,
    })
    .select()
    .single();

  if (error) throw new Error(error.message || "Failed to create article");

  return data;
}
