import { useState } from "react";
import { useRouter } from "next/navigation";
import updateStatusArticleService from "@/services/updateStatusArticle";
import { toast } from "sonner";

interface UseArticleApprovalReturn {
  isLoading: boolean;
  isLoadingRejected: boolean;
  processingArticleId: string | null;
  handleApproval: (
    articleId: string,
    status: "approved" | "rejected"
  ) => Promise<void>;
  isProcessing: (articleId: string) => boolean;
  reset: () => void;
}

export function useApprovalArticle(): UseArticleApprovalReturn {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRejected, setIsLoadingRejected] = useState(false);
  const [processingArticleId, setProcessingArticleId] = useState<string | null>(
    null
  );

  const handleApproval = async (
    articleId: string,
    status: "approved" | "rejected"
  ) => {
    if (status === "approved") {
      setIsLoading(true);
    } else {
      setIsLoadingRejected(true);
    }
    setProcessingArticleId(articleId);

    try {
      await updateStatusArticleService(articleId, status);
      toast.success(
        `Successfully ${
          status === "approved" ? "approved" : "rejected"
        } article`
      );
      router.refresh();
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(`${errorMessage}`);
    } finally {
      setIsLoading(false);
      setIsLoadingRejected(false);
      setProcessingArticleId(null);
    }
  };

  const isProcessing = (articleId: string) => processingArticleId === articleId;

  const reset = () => {
    setIsLoading(false);
    setIsLoadingRejected(false);
    setProcessingArticleId(null);
  };

  return {
    isLoading,
    isLoadingRejected,
    processingArticleId,
    handleApproval,
    isProcessing,
    reset,
  };
}
