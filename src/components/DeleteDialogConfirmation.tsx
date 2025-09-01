"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { IArticles } from "@/types/IArticles";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  article: IArticles | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteDialog({
  isOpen,
  onOpenChange,
  article,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle className="text-lg font-semibold">
              Confirm Deletion
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete the article{" "}
            <span className="font-bold">"{article?.title}"</span> ? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 sm:flex-none cursor-pointer"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1 sm:flex-none cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Article"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
