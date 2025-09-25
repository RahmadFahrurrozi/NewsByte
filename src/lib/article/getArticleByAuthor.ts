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

export async function getArticleByAuthor({
  author_id,
  page,
  perPage,
  category,
  status,
  sort = "desc",
  search,
}: IGetArticleParams): Promise<GetArticleByAuthorResponse> {
  const supabase = createClient();
  const { from, to } = getPagination(page, perPage);

  let query = supabase
    .from("articles")
    .select(`*, profiles(*)`, { count: "exact" })
    .eq("author_id", author_id);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

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

  if (search) {
    approvedQuery = approvedQuery.ilike("title", `%${search}%`);
  }

  if (category && category !== "all") {
    approvedQuery = approvedQuery.eq("categories", category);
  }
  statsQueries.push(approvedQuery);

  let pendingQuery = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", author_id)
    .eq("article_status", "pending");

  if (search) {
    pendingQuery = pendingQuery.ilike("title", `%${search}%`);
  }

  if (category && category !== "all") {
    pendingQuery = pendingQuery.eq("categories", category);
  }
  statsQueries.push(pendingQuery);

  let rejectedQuery = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", author_id)
    .eq("article_status", "rejected");

  if (search) {
    rejectedQuery = rejectedQuery.ilike("title", `%${search}%`);
  }

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
