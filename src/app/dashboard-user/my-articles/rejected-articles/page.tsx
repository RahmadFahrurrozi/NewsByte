"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AlertCircle, FileText, Download, Filter } from "lucide-react";
import { useGetRejectedArticles } from "@/hooks/useGetRejectedArticle";
import { IArticles } from "@/types/IArticles";

interface IRejectedArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  reason: string;
  status: string;
}

interface RejectionStat {
  reason: string;
  count: number;
  color: string;
}

interface MonthlyData {
  month: string;
  rejected: number;
  approved: number;
}

// Skeleton Components
const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="pb-2">
      <div className="h-4 bg-muted rounded w-3/4"></div>
    </CardHeader>
    <CardContent>
      <div className="h-7 bg-muted rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-muted rounded w-2/3"></div>
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <div className="h-80 bg-muted rounded-md animate-pulse"></div>
);

const ArticleItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-start space-x-4">
      <div className="bg-muted p-2 rounded-full h-9 w-9"></div>
      <div className="space-y-2">
        <div className="h-5 bg-muted rounded w-64"></div>
        <div className="h-4 bg-muted rounded w-48"></div>
        <div className="h-6 bg-muted rounded w-24"></div>
      </div>
    </div>
    <div className="flex space-x-2">
      <div className="h-9 bg-muted rounded w-16"></div>
      <div className="h-9 bg-muted rounded w-24"></div>
    </div>
  </div>
);

// Component untuk Article List dengan TanStack Query
const RejectedArticlesList = () => {
  const { data, isLoading, isError, error, refetch } = useGetRejectedArticles();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <ArticleItemSkeleton />
        <ArticleItemSkeleton />
        <ArticleItemSkeleton />
        <ArticleItemSkeleton />
        <ArticleItemSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading articles
            </h3>
            <p className="text-sm text-red-600 mt-1">
              {error?.message || "Something went wrong"}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-2 text-sm text-red-800 hover:text-red-900 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const articles = data?.data || [];

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-muted p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No rejected articles
        </h3>
        <p className="text-muted-foreground">
          There are no articles that have been rejected yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article: IArticles) => (
        <div
          key={article.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-destructive/10 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-muted-foreground">
                by {article.profiles?.username || "Unknown"} •{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <Badge
                variant="outline"
                className="mt-2 bg-destructive/10 text-destructive"
              >
                Rejected
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Details
            </Button>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View Article
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function RejectedArticlePages() {
  const [timeFilter, setTimeFilter] = useState<string>("month");
  const [isloading, setLoading] = useState<boolean>(true);

  // Data for charts
  const rejectionStats: RejectionStat[] = [
    { reason: "Content Quality", count: 12, color: "#3A86FF" },
    { reason: "Plagiarism", count: 8, color: "#FF006E" },
    { reason: "Irrelevant Topic", count: 15, color: "#8338EC" },
    { reason: "Wrong Format", count: 5, color: "#FB5607" },
    { reason: "Other", count: 3, color: "#FFBE0B" },
  ];

  const monthlyData: MonthlyData[] = [
    { month: "Jan", rejected: 5, approved: 45 },
    { month: "Feb", rejected: 7, approved: 48 },
    { month: "Mar", rejected: 10, approved: 42 },
    { month: "Apr", rejected: 8, approved: 46 },
    { month: "May", rejected: 12, approved: 49 },
    { month: "Jun", rejected: 9, approved: 51 },
  ];

  // Simulasi loading untuk bagian statistik dan chart
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Rejected Articles
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor articles rejected in the system
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {isloading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">43</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rejection Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">15%</div>
                  <p className="text-xs text-muted-foreground">
                    of total submissions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Reason
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    Irrelevance
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Need attention
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resubmissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">8</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully accepted
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Charts and Visualizations */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Rejection Statistics</CardTitle>
                  <CardDescription>
                    Comparison of rejected vs approved articles
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {isloading ? (
                    <ChartSkeleton />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="rejected"
                          fill="var(--color-destructive)"
                          name="Rejected Articles"
                        />
                        <Bar
                          dataKey="approved"
                          fill="oklch(76.5% 0.177 163.223)"
                          name="Approved Articles"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rejection Reasons</CardTitle>
                  <CardDescription>
                    Distribution by rejection reason
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {isloading ? (
                    <ChartSkeleton />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={rejectionStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="reason"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {rejectionStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Rejected Articles List dengan TanStack Query */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Rejected Articles List</CardTitle>
                <CardDescription>
                  Articles rejected in the last 30 days
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RejectedArticlesList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
