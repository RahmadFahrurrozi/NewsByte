"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  ArrowUpDown,
  FilterIcon,
  Trash2,
  Eye,
  PencilLine,
  Repeat,
  X,
} from "lucide-react";
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
import { formatDateWithTime } from "@/utils/formatedDate";
import ArticleListSkeleton from "@/components/ArticleSkeleton";
import { IArticles } from "@/types/IArticles";
import Link from "next/link";
import EmptyArticleAuthor from "@/components/EmptyArticleAuthor";
import useDeleteDialogConfirmation from "@/hooks/useDeleteDialogConfirmation";
import DeleteDialog from "@/components/DeleteDialogConfirmation";
import QuickAction from "@/components/MyArticle/QuicAction";
import ArticleStats from "@/components/MyArticle/ArticleStats";
import QuickInfoCard from "@/components/MyArticle/QuickInfoCard";
import { useSearchParams, useRouter } from "next/navigation";
import ErrorState from "@/components/ErrorState";
import { useMyArticlesFilters } from "@/hooks/useMyArticlesFilters";
import { Input } from "@/components/ui/input";

export default function MyarticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authorId = useAuth()?.user?.id ?? "";

  const { filters, setFilters, page, setPage, perPage, resetFilters } =
    useMyArticlesFilters();

  const {
    data: articles,
    isLoading,
    isError,
    isFetching,
  } = useArticleByAuthor(authorId, page, perPage, filters);

  const isEmpty = !isLoading && articles?.data && articles.data.length === 0;

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`?${newParams.toString()}`, { scroll: false });
    setPage(newPage);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);
    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`, { scroll: false });
    setPage(1);
  };

  const handleResetFilters = () => {
    resetFilters();
    router.push("?", { scroll: false });
  };

  const latestUpdatedArticle = articles?.data
    ?.slice()
    ?.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )[0];

  const stats = articles?.stats || { approved: 0, pending: 0, rejected: 0 };

  //delete action
  const {
    isOpenDeleteDialog,
    setIsOpenDeleteDialog,
    openDialog,
    selectedArticle,
    closeDialog,
    confirmDelete,
    isLoadingDelete,
  } = useDeleteDialogConfirmation();

  if (isError)
    return (
      <section className="py-5 px-6 flex items-center justify-center min-h-[60vh]">
        <ErrorState onRetry={() => router.refresh()} />
      </section>
    );

  return (
    <section className="py-5 px-6">
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
          <ArticleStats
            total={articles?.total}
            stats={stats}
            latestUpdatedArticle={latestUpdatedArticle}
          />

          {/* Quick Actions */}
          <QuickAction />
        </div>

        {/* Right content area */}
        <div className="lg:w-2/3 w-full">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <QuickInfoCard stats={stats} />
          </div>

          {/* Main article Display */}
          <div className="space-y-4">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-lg md:text-xl font-semibold">All Article</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-2">
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search article by title..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pr-10"
                  />
                  {filters.search && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 size-8 cursor-pointer"
                      onClick={() => setFilters({ ...filters, search: "" })}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
                {/* Category Filter */}
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="category" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Thechnology">Technology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Politics">Politics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <FilterIcon className="w-4 h-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Filter */}
                <Select
                  value={filters.sort}
                  onValueChange={(value) => handleFilterChange("sort", value)}
                >
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <ArrowUpDown className="w-4 h-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant={"default"}
                  size="sm"
                  className="cursor-pointer"
                  onClick={handleResetFilters}
                >
                  <Repeat className="size-4" />
                  <span>Reset Filter</span>
                </Button>
              </div>
            </div>

            {/* Article List */}
            {isLoading || isFetching ? (
              <ArticleListSkeleton />
            ) : isEmpty ? (
              <EmptyArticleAuthor />
            ) : (
              <div className="space-y-4">
                {articles?.data?.map((article: IArticles) => (
                  <Card key={article.id} className="w-full">
                    <CardContent className="px-4 md:px-6 py-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        {/* Left Content */}
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium truncate max-w-[200px] md:max-w-[400px]">
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
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {article.article_status} on{" "}
                            {formatDateWithTime(article.created_at)}
                          </p>
                          <Badge variant="outline">{article.categories}</Badge>
                        </div>

                        {/* Right Content - Manage */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                className="bg-blue-500/90 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:text-neutral-50 cursor-pointer"
                                size="sm"
                              >
                                Manage
                              </Button>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-base pt-2 sm:pt-0 sm:text-lg font-semibold">
                                Choose what you want to do
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground">
                                You can edit this article before publishing
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col sm:flex-row w-full gap-2">
                              <Link
                                href={`/dashboard-user/my-articles/${article.id}/edit`}
                              >
                                <Button
                                  variant="ghost"
                                  className="flex items-center justify-center gap-2 bg-violet-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer"
                                  size="sm"
                                >
                                  <PencilLine className="size-4" />
                                  Edit
                                </Button>
                              </Link>

                              {/* View Button */}
                              <Link
                                href={`/dashboard-user/my-articles/preview/${article.id}`}
                              >
                                <Button
                                  variant="ghost"
                                  className="flex items-center justify-center gap-2 bg-teal-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer"
                                  size="sm"
                                >
                                  <Eye className="size-4" />
                                  <span>View</span>
                                </Button>
                              </Link>

                              {/* Delete Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center justify-center gap-2 bg-red-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer"
                                size="sm"
                                onClick={() => openDialog(article)}
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

            {/* {isEmpty && ( */}
            <div className="mt-8 flex justify-center">
              <PaginationComponent
                currentPage={page}
                totalItems={articles?.total ?? 0}
                itemsPerPage={perPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* delete confirmation dialog */}
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        article={selectedArticle}
        onCancel={closeDialog}
        onConfirm={confirmDelete}
        isLoading={isLoadingDelete}
      />
    </section>
  );
}
