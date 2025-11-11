"use client";

import { useAuth } from "@/contexts/AuthContextProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";
import { FileText, Search, Repeat, Share2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticleByAuthor } from "@/hooks/useGetArticleByAuthor";
import { IArticles } from "@/types/IArticles";
import ArticleListDashboardSkeleton from "@/components/MainDashboardUser/ArticleListSkeleton";
import ErrorState from "@/components/ErrorState";
import { useRouter } from "next/navigation";
import { formatDateWithTime } from "@/utils/formatedDate";
import { getStatusBadge, getStatusIcon } from "@/utils/getStatusArticle";
import { useMyArticlesFilters } from "@/hooks/useMyArticlesFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleCardStats } from "@/components/MainDashboardUser/ArticleCardStats";
import EmptyArticleAuthor from "@/components/EmptyArticleAuthor";

interface StatusStat {
  status: string;
  count: number;
  color: string;
}

interface MonthlyData {
  month: string;
  published: number;
  pending: number;
  rejected: number;
}

interface CategoryData {
  subject: string;
  articles: number;
  fullMark: number;
}

// Loading Skeleton Component
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-start mb-8">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-8 w-64" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Statistics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((item) => (
            <Card key={item} className="border-0 shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="h-80">
                <Skeleton className="h-full w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Chart Skeleton */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="h-80">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function ArticleDashboard() {
  const router = useRouter();
  const { username } = useAuth();
  const authorId = useAuth()?.user?.id || "";
  const { filters, setFilters, resetFilters } = useMyArticlesFilters();
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, value);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
  const {
    data: articleData,
    isLoading,
    isError,
    isFetching,
  } = useArticleByAuthor(authorId, 1, 5, filters);

  const isEmpty =
    !isLoading && articleData?.data && articleData.data.length === 0;

  const stats = articleData?.stats || { approved: 0, pending: 0, rejected: 0 };

  const monthlyData: MonthlyData[] = [
    { month: "Jan", published: 18, pending: 7, rejected: 3 },
    { month: "Feb", published: 22, pending: 5, rejected: 2 },
    { month: "Mar", published: 15, pending: 9, rejected: 5 },
    { month: "Apr", published: 27, pending: 4, rejected: 1 },
    { month: "May", published: 20, pending: 8, rejected: 4 },
    { month: "Jun", published: 25, pending: 6, rejected: 3 },
  ];

  // Data for radar chart - article distribution by category
  const categoryData: CategoryData[] = [
    { subject: "Technology", articles: 45, fullMark: 50 },
    { subject: "Business", articles: 32, fullMark: 50 },
    { subject: "Science", articles: 28, fullMark: 50 },
    { subject: "Health", articles: 38, fullMark: 50 },
    { subject: "Education", articles: 42, fullMark: 50 },
    { subject: "Politics", articles: 25, fullMark: 50 },
  ];

  // Data for line chart - view trends
  const viewTrendsData = [
    { week: "Week 1", views: 400 },
    { week: "Week 2", views: 800 },
    { week: "Week 3", views: 6098 },
    { week: "Week 4", views: 1800 },
    { week: "Week 5", views: 10000 },
    { week: "Week 6", views: 7500 },
  ];

  const handleResetFilters = () => {
    resetFilters();
    router.push("?", { scroll: false });
  };

  if (isError) {
    return (
      <ErrorState
        onRetry={() => router.refresh()}
        message="Failed to load articles. Please try again."
      />
    );
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-start mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-foreground">
              Article Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <div className="bg-green-500/20 p-1.5 rounded-full">
                <div className="bg-green-500 rounded-full size-2"></div>
              </div>
              <p className="text-muted-foreground text-xl">
                Welcome{" "}
                <span className="font-bold text-blue-500">{username}</span>
              </p>
            </div>
          </div>
          <Link href={"/dashboard-user/write-article"}>
            <Button className="cursor-pointer" size={"sm"}>
              <FileText className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <ArticleCardStats stats={stats} />

        {/* Charts and Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Article Trends</CardTitle>
              <CardDescription>
                Article performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="published"
                    stackId="1"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.5}
                    name="Published"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stackId="1"
                    stroke="#ea580c"
                    fill="#ea580c"
                    fillOpacity={0.5}
                    name="Pending"
                  />
                  <Area
                    type="monotone"
                    dataKey="rejected"
                    stackId="1"
                    stroke="#dc2626"
                    fill="#dc2626"
                    fillOpacity={0.5}
                    name="Rejected"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart for Article Distribution by Category */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Articles by Category</CardTitle>
              <CardDescription>
                Distribution of articles across different categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={categoryData}
                >
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" stroke="#374151" />
                  <PolarRadiusAxis stroke="#374151" />
                  <Radar
                    name="Articles"
                    dataKey="articles"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional chart */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>View Trends</CardTitle>
            <CardDescription>
              Article view trends over the past 6 weeks
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={viewTrendsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: "#7c3aed" }}
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Articles List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>5 Recent Articles</CardTitle>
                <CardDescription>
                  View and manage your recent articles{" "}
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={filters.search}
                    onChange={(event) =>
                      handleFilterChange("search", event.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 flex-col w-full sm:flex-row sm:w-auto">
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      handleFilterChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant={"ghost"}
                    onClick={handleResetFilters}
                    className="cursor-pointer"
                  >
                    <Repeat className="size-4" />
                    <span>Clear Filter</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {isLoading || isFetching ? (
                <ArticleListDashboardSkeleton />
              ) : isEmpty ? (
                <EmptyArticleAuthor />
              ) : (
                articleData?.data?.map((article: IArticles) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(article.article_status)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          {formatDateWithTime(article.created_at)}
                        </p>
                        <div className="mt-2">
                          {getStatusBadge(article.article_status)}
                        </div>
                      </div>
                    </div>
                    <Share2 className="size-4" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Link href={"/dashboard-user/my-articles"}>
          <div className="flex justify-end mt-4 ">
            <Button
              variant={"link"}
              className="flex items-center cursor-pointer"
            >
              <span>View all articles</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
