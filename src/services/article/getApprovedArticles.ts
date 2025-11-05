import { createClient } from "@/lib/supabase/client";
import { IArticles } from "@/types/IArticles";
import { getPagination } from "@/utils/getPagination";

interface IArticlesApproved {
  data: IArticles[] | null;
  error: Error | null;
}

export async function getApprovedArticles(
  page: number,
  perPage: number
): Promise<IArticlesApproved> {
  const supabase = createClient();
  const { from, to } = getPagination(page, perPage);

  const { data, error } = await supabase
    .from("articles")
    .select(`*, profiles(*)`)
    .eq("article_status", "approved")
    .range(from, to)
    .order("created_at", { ascending: false });

  return { data, error };
}
