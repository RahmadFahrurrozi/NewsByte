import { deleteArticle } from "@/lib/article/deleteArticle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteArticle() {
  const queryClient = useQueryClient();
  const useDeleteArticle = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      toast.success("Article deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("Error deleting article", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete article";
      toast.error(errorMessage);
    },
  });
  return useDeleteArticle;
}
