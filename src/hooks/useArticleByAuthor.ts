import { useQuery } from "@tanstack/react-query";
import { getArticleByAuthor } from "@/lib/article/getArticleByAuthor";

export function useArticleByAuthor(
  authorId: string,
  page: number,
  perPage: number
) {
  return useQuery({
    queryKey: ["articles", authorId, page, perPage],
    queryFn: () => getArticleByAuthor(authorId, page, perPage),
  });
}
