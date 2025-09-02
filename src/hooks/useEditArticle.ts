import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editArticleSchema,
  editArticleValues,
} from "@/schemas/editArticle.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContextProvider";
import { editArticleByAuthor } from "@/lib/article/editArticleByAuthor";

export default function useEditArticle() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm<editArticleValues>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: "",
      thumbnile: undefined,
      content: "",
      categories: "",
    },
  });

  const mutation = useMutation({
    mutationFn: editArticleByAuthor,
    onSuccess: () => {
      toast.success("Article edited successfully!");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["ariticles"] });
    },
    onError: (error) => {
      console.error("Error editing article", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to edit article";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (values: editArticleValues) => {
    mutation.mutate({
      ...values,
      author_id: user?.id || "",
    });
  };

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
