"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  Tags,
  Filter,
  ArrowUpDown,
  Calendar,
  FilterIcon,
  Trash2,
  Eye,
  PencilLine,
} from "lucide-react";
import {
  IoAnalyticsSharp,
  IoDocumentOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import PaginationComponent from "@/components/PaginationComponent";
import getBadgeColorStatus from "@/utils/getColorStstus";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useArticleByAuthor } from "@/hooks/useGetArticleByAuthor";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useState } from "react";
import { formatDateWithTime } from "@/utils/formatedDate";
import ArticleListSkeleton from "@/components/ArticleSkeleton";
import { IArticles } from "@/types/IArticles";
import Link from "next/link";

export default function MyarticlesPage() {
  const authorId = useAuth()?.user?.id ?? "";
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: articles,
    isLoading,
    isError,
  } = useArticleByAuthor(authorId, page, perPage);

  const stats = {
    approved:
      articles?.data?.filter(
        (approved) => approved.article_status === "approved"
      ).length ?? 0,
    pending:
      articles?.data?.filter((pending) => pending.article_status === "pending")
        .length ?? 0,
    rejected:
      articles?.data?.filter(
        (rejected) => rejected.article_status === "rejected"
      ).length ?? 0,
  };

  if (isError) return <div>Error</div>;

  return (
    <section className="py-5">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left area -  ticky */}
        <div className="lg:sticky lg:top-6 lg:w-1/3 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">My Articles</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manage and organize all your published Article in one place. Track
              performance and create new content easily.
            </p>
          </div>

          {/* article stats card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IoAnalyticsSharp className="w-5 h-5" />
                Article Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total article:</span>
                <span>{articles?.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  Published
                  <CheckCircle2 className="text-green-500 size-4" />
                </span>
                <span className="font-medium">{stats.approved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  Pending
                  <IoDocumentTextOutline className="size-4 text-orange-300" />
                </span>
                <span className="font-medium">{stats.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  Rejected
                  <BiErrorAlt className="size-4 text-red-500" />
                </span>
                <span className="font-medium">{stats.rejected}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="size-4" /> <p>Last Updated:</p>
                    <p>2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link href={"/dashboard-user/write-article"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 cursor-pointer border border-dashed p-6"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Article</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 cursor-pointer p-6"
              >
                <Tags className="w-4 h-4" />
                <span>Manage Categories</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="lg:w-2/3 w-full">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <IoDocumentOutline className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Unpublished Article</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {stats.pending} unpublished Article waiting for review
                </p>
                <Button variant="link" className="p-0 h-auto cursor-pointer">
                  View all articles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <IoAnalyticsSharp className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Analytics Overview</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Track performance and engagement metrics
                </p>
                <Button variant="link" className="p-0 h-auto cursor-pointer">
                  View analytics <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main article Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Article</h2>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="cursor-pointer">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    <SelectItem className="cursor-pointer" value="all">
                      All
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="category1">
                      Tech
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="sp">
                      Sport
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="health">
                      Health
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="cursor-pointer">
                    <FilterIcon className="w-4 h-4" />
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="all">
                      All
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="published">
                      Published
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="draft">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="cursor-pointer">
                    <ArrowUpDown className="w-4 h-4" />
                    <SelectValue placeholder="Short by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="asc">
                      Ascending
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="desc">
                      Descending
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* article list */}
            {isLoading ? (
              <ArticleListSkeleton />
            ) : (
              <div className="space-y-4">
                {articles?.data?.map((article: IArticles) => (
                  <Card key={article.id}>
                    <CardContent className="px-6 py-3">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">
                              {article.title}
                            </h3>
                            <Badge
                              className={getBadgeColorStatus(
                                article.article_status
                              )}
                            >
                              {article.article_status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {article.article_status} on{" "}
                            {formatDateWithTime(article.created_at)}
                          </p>
                          <Badge variant="outline">{article.categories}</Badge>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="bg-blue-500/90 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:text-neutral-50 cursor-pointer"
                              size="sm"
                            >
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                Choose what you want to do
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground">
                                You can edit this article before publishing
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex gap-3">
                              {/* Edit Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center gap-2 bg-violet-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer"
                                size="sm"
                              >
                                <PencilLine className="size-4" />
                                <span>Edit</span>
                              </Button>

                              {/* View Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center gap-2 bg-teal-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer"
                                size="sm"
                              >
                                <Eye className="size-4" />
                                <span>View</span>
                              </Button>

                              {/* Delete Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center gap-2 bg-red-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer"
                                size="sm"
                              >
                                <Trash2 className="size-4" />
                                <span>Delete</span>
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <PaginationComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
