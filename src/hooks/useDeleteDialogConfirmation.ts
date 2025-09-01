import { useState } from "react";
import { IArticles } from "@/types/IArticles";
import useDeleteArticle from "./useDeleteArticle";

export default function useDeleteDialogConfirmation() {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticles | null>(
    null
  );
  const deleteArticle = useDeleteArticle();

  const openDialog = (article: IArticles) => {
    setSelectedArticle(article);
    setIsOpenDeleteDialog(true);
  };

  const closeDialog = () => {
    setSelectedArticle(null);
    setIsOpenDeleteDialog(false);
  };

  const confirmDelete = () => {
    if (selectedArticle) {
      deleteArticle.mutate(selectedArticle.id),
        {
          on: closeDialog,
        };
    }
    closeDialog();
  };

  return {
    isOpenDeleteDialog,
    setIsOpenDeleteDialog,
    openDialog,
    selectedArticle,
    closeDialog,
    confirmDelete,
    isLoadingDelete: deleteArticle.isPending,
  };
}
