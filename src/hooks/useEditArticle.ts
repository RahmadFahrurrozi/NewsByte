import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getArticleById } from "@/lib/article/getArticleById";
import {
  editArticleSchema,
  editArticleValues,
} from "@/schemas/editArticle.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { editArticleByAuthor } from "@/lib/article/editArticleByAuthor";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";
import IEditArticle from "@/types/IEditArticle";

interface UseEditArticleProps {
  articleId: string;
  onSuccess?: () => void;
}

export default function useEditArticle({
  articleId,
  onSuccess,
}: UseEditArticleProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();

  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useQuery<IEditArticle>({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
    placeholderData: keepPreviousData,
  });

  const form = useForm<editArticleValues>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: article?.title,
      thumbnile: article?.thumbnile,
      content: article?.content,
      categories: article?.categories,
    },
  });

  const mutation = useMutation({
    mutationFn: editArticleByAuthor,
    onSuccess: () => {
      toast.success("Article edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      if (onSuccess) onSuccess();
      router.push(`/dashboard-user/my-articles`);
    },
    onError: (error) => {
      console.error("Error editing article", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to edit article"
      );
    },
  });

  const onSubmit = (values: editArticleValues) => {
    if (!articleId) {
      toast.error("Article ID is required");
      return;
    }

    mutation.mutate({
      ...values,
      author_id: user?.id || "",
      article_id: articleId,
    });
  };

  const isLoading = mutation.isPending || isArticleLoading;
  const isError = mutation.isError || isArticleError;

  return {
    form,
    onSubmit,
    isLoading,
    isError,
  };
}
