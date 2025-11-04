"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveArticle } from "@/lib/article/approvalArticle";
import { toast } from "sonner";

interface UseArticleApprovalReturn {
  isLoading: boolean;
  processingArticleId: string | null;
  handleApprove: (articleId: string) => Promise<void>;
  handleRejectWithReason: (articleId: string) => void;
  isProcessing: (articleId: string) => boolean;
  reset: () => void;
}

export function useApprovalArticle(): UseArticleApprovalReturn {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [processingArticleId, setProcessingArticleId] = useState<string | null>(
    null
  );

  const handleApprove = async (articleId: string) => {
    setIsLoading(true);
    setProcessingArticleId(articleId);

    try {
      await approveArticle(articleId);
      toast.success("Article approved successfully");
      router.refresh();
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(`${errorMessage}`);
    } finally {
      setIsLoading(false);
      setProcessingArticleId(null);
    }
  };

  const handleRejectWithReason = (articleId: string) => {
    router.push(`/dashboard-admin/reassons-articles/${articleId}`);
  };

  const isProcessing = (articleId: string) => processingArticleId === articleId;

  const reset = () => {
    setIsLoading(false);
    setProcessingArticleId(null);
  };

  return {
    isLoading,
    processingArticleId,
    handleApprove,
    handleRejectWithReason,
    isProcessing,
    reset,
  };
}
