"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IArticles } from "@/types/IArticles";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import updateStatusArticleService from "@/services/updateStatusArticle";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ArticlePendingProps {
  data: IArticles[] | null;
  error: Error | null;
}

export default function ApprovalAdmin({ data, error }: ArticlePendingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRejected, setIsLoadingRejected] = useState(false);

  // 2. Buat fungsi handler yang akan dipanggil
  const handleApproval = async (
    articleId: string,
    status: "approved" | "rejected"
  ) => {
    if(status == "approved") {
      setIsLoading(true);
    } else if(status == "rejected") {
      setIsLoadingRejected(true);
    }
    try {
      await updateStatusArticleService(articleId, status);
      toast.success(
        `Artikel berhasil di-${status === "approved" ? "setujui" : "tolak"}.`
      );
      router.refresh(); // Memuat ulang data dari server
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat memperbarui status"
      if (err instanceof Error) {
        // Jika err adalah objek Error, kita ambil pesannya
        errorMessage = err.message;
      }
      toast.error(`${errorMessage}`);
    } finally {
      setIsLoading(false);
      setIsLoadingRejected(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Halaman Approval Admin</h1>

      <div className="border rounded-lg">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author Name</TableHead>
              <TableHead>Tanggal Upload</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((article, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{(index += 1)}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.categories}</TableCell>
                <TableCell>{article.profiles.name}</TableCell>
                <TableCell>
                  {format(new Date(article.created_at), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Lihat & Setujui
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{article.title}</DialogTitle>
                        </DialogHeader>
                        <div className="h-[450px] overflow-y-auto p-4 border rounded-md my-4">
                          <p className="mb-4">{article.content}</p>
                        </div>
                        <DialogFooter>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleApproval(article.id, "rejected")
                            }
                          >
                            {isLoadingRejected ? "Menolak..." : "Tolak"}
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() =>
                              handleApproval(article.id, "approved")
                            }
                          >
                            {isLoading ? "Menyetujui..." : "Terima"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
