import { getRejectedArticles } from "@/services/article/getRejectedArticle";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetRejectedArticles = () => {
  return useQuery({
    queryKey: ["rejected-articles"],
    queryFn: () => getRejectedArticles(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
