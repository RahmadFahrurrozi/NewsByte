"use client";

import { useAuth } from "@/contexts/AuthContextProvider";
import { rejectArticleWithReasson } from "@/services/article/reassonArticle";
import {
  reassonsArtcleSchema,
  reassonsArtcleValues,
} from "@/schemas/reassonsArticle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useArticleReassons(articleId: string) {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<reassonsArtcleValues>({
    resolver: zodResolver(reassonsArtcleSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (data: reassonsArtcleValues) => {
      if (!articleId || !user?.id) {
        throw new Error("Article ID or user ID is not available.");
      }
      await rejectArticleWithReasson(articleId, data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article rejected successfully!");
      router.push(`/dashboard-admin/approval-articles`);
    },
    onError: (error: Error) => {
      console.error("Error rejecting article:", error);
      toast.error(`Failed to reject article: ${error.message}`);
    },
  });

  const onSubmit = (data: reassonsArtcleValues) => {
    if (!articleId) {
      toast.error("Article ID is missing");
      return;
    }
    if (!user?.id) {
      toast.error("You Must Login First");
      return;
    }
    rejectMutation.mutate(data);
  };

  const handleCancle = () => {
    form.reset();
    router.push(`/dashboard-admin/approval-articles`);
  };

  return {
    form,
    onSubmit,
    handleCancle,
    isLoading: rejectMutation.isPending,
    articleId,
  };
}
