import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArticleByAuthor } from "@/lib/article/getArticleByAuthor";

export function useArticleByAuthor(
  authorId: string,
  page: number,
  perPage: number,
  filters: {
    category?: string;
    status?: string;
    sort?: string;
    search?: string;
  } = {}
) {
  return useQuery({
    queryKey: ["articles", authorId, page, perPage, filters],
    queryFn: () =>
      getArticleByAuthor({
        author_id: authorId,
        page,
        perPage,
        ...filters,
      }),
    placeholderData: keepPreviousData,
    enabled: !!authorId,
  });
}
