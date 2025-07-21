export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INews } from "@/types/INews";
import { EllipsisIcon, Eye, PenLine, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/categoryColors";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const { data: news, error } = await supabase.from("news").select("*");

  if (error) {
    console.error("Error fetching news:", error);
    return (
      <div className="text-red-500 p-4">
        Error loading news: {error.message}
      </div>
    );
  }
  console.log("Fetched news data:", news);

  return (
    <>
      <div className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p>Welcome to your dashboard! [name]</p>
        </div>
        <div className="mt-4">
          <Button variant="default">
            <Plus className="size-4" />
            <Link href="/dashboard/create-news">Create News</Link>
          </Button>
        </div>
      </div>
      <Table className="w-full border-collapse rounded-2xl border border-muted">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow className="rounded-t-2xl">
            <TableHead>Thumbnile</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Categoies</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news?.map((item: INews) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.thumbnile ? (
                  <img
                    src={item.thumbnile}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-muted-foreground">No Image</span>
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`inline-block px-3 py-1 text-xs font-semibold ${getCategoryColor(
                    item.categories
                  )}`}
                >
                  {item.categories}
                </Badge>
              </TableCell>
              <TableCell>{item.content.slice(0, 50)}...</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisIcon className="cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="size-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PenLine className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
