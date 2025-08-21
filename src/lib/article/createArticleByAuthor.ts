import { createClient } from "../supabase/client";
import { slugify } from "@/utils/slugify";
import { IArticles } from "@/types/IArticles";

export async function createArticleByAuthor(articleData: IArticles) {
  const supabase = await createClient();

  let slug = slugify(articleData.title);
  const { data: existing } = await supabase
    .from("articles")
    .select("slug")
    .eq("slug", slug)
    .single();
  if (existing && existing.slug) {
    slug = `${slug}-${existing.slug.split("-").pop()}`;
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: articleData.title,
      thumbnile: articleData.thumbnile,
      content: articleData.content,
      author_id: articleData.author_id,
      categories: articleData.categories,
      article_status: articleData.article_status ?? "pending",
      slug,
    })
    .select()
    .single();

  return { data, error };
}
