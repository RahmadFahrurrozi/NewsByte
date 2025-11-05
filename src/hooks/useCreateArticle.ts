import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  createArticleValues,
} from "@/schemas/createArticle.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextProvider";
import { createArticleByAuthor } from "@/services/article/createArticleByAuthor";

export default function useCreateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<createArticleValues>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      thumbnile: undefined,
      content: "",
      categories: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createArticleByAuthor,
    onSuccess: () => {
      toast.success("Article created successfully!");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push(`/dashboard-user/my-articles`);
    },
    onError: (error) => {
      console.error("Error creating article", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create article";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (values: createArticleValues) => {
    mutation.mutate({
      ...values,
      author_id: user?.id || "",
      article_status: "pending",
    });
  };
  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
