// lib/article/getArticleByAuthor.ts
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

interface GetArticleByAuthorParams {
  author_id: string;
  page: number;
  perPage: number;
  category?: string;
  status?: string;
  sort?: string;
}

export async function getArticleByAuthor({
  author_id,
  page,
  perPage,
  category,
  status,
  sort = "desc",
}: GetArticleByAuthorParams): Promise<GetArticleByAuthorResponse> {
  const supabase = createClient();
  const { from, to } = getPagination(page, perPage);

  let query = supabase
    .from("articles")
    .select(`*, profiles(*)`, { count: "exact" })
    .eq("author_id", author_id);

  if (category && category !== "all") {
    query = query.eq("categories", category);
  }

  if (status && status !== "all") {
    const statusMap: Record<string, string> = {
      published: "approved",
      pending: "pending",
      rejected: "rejected",
    };

    const dbStatus = statusMap[status] || status;
    query = query.eq("article_status", dbStatus);
  }

  const ascending = sort === "asc";
  query = query.order("created_at", { ascending });

  query = query.range(from, to);

  const { data, error, count } = await query;

  const statsQueries = [];

  let approvedQuery = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", author_id)
    .eq("article_status", "approved");

  if (category && category !== "all") {
    approvedQuery = approvedQuery.eq("categories", category);
  }
  statsQueries.push(approvedQuery);

  let pendingQuery = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", author_id)
    .eq("article_status", "pending");

  if (category && category !== "all") {
    pendingQuery = pendingQuery.eq("categories", category);
  }
  statsQueries.push(pendingQuery);

  let rejectedQuery = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", author_id)
    .eq("article_status", "rejected");

  if (category && category !== "all") {
    rejectedQuery = rejectedQuery.eq("categories", category);
  }
  statsQueries.push(rejectedQuery);

  const [
    { count: approvedCount },
    { count: pendingCount },
    { count: rejectedCount },
  ] = await Promise.all(statsQueries);

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
