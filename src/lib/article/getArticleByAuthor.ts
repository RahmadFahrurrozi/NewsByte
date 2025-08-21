import { IArticles } from "@/types/IArticles";
import { createClient } from "@/lib/supabase/client";
import { getPagination } from "@/utils/getPagination";

interface IArticleStats {
  approved: number;
  pending: number;
  rejected: number;
}

interface GetArticleByAuthorResponse {
  data: IArticles[] | null;
  error: Error | null;
  total: number;
  stats: IArticleStats;
}

export async function getArticleByAuthor(
  author_id: string,
  page: number,
  perPage: number
): Promise<GetArticleByAuthorResponse> {
  const supabase = createClient();
  const { from, to } = getPagination(page, perPage);

  const { data, error, count } = await supabase
    .from("articles")
    .select(`*, profiles(*)`, { count: "exact" })
    .eq("author_id", author_id)
    .order("created_at", { ascending: false })
    .range(from, to);

  const [
    { count: approvedCount },
    { count: pendingCount },
    { count: rejectedCount },
  ] = await Promise.all([
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("author_id", author_id)
      .eq("article_status", "approved"),
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("author_id", author_id)
      .eq("article_status", "pending"),
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("author_id", author_id)
      .eq("article_status", "rejected"),
  ]);

  const stats: IArticleStats = {
    approved: approvedCount ?? 0,
    pending: pendingCount ?? 0,
    rejected: rejectedCount ?? 0,
  };

  return {
    data,
    error,
    total: count ?? 0,
    stats,
  };
}
