"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContextProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertCircle,
  FileText,
  CheckCircle,
  Clock,
  Download,
  Filter,
  RefreshCw,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Repeat,
  DownloadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

// Define types
interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  status: "published" | "pending" | "rejected";
  views?: number;
  reason?: string;
}

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

        {/* Articles List Skeleton */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Skeleton className="h-9 w-full sm:w-64" />
                <div className="flex gap-2 flex-col w-full sm:flex-row sm:w-auto">
                  <Skeleton className="h-9 w-full sm:w-20" />
                  <Skeleton className="h-9 w-full sm:w-28" />
                  <Skeleton className="h-9 w-full sm:w-32" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div className="flex items-start gap-4 w-full">
                    <Skeleton className="h-4 w-4 mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function ArticleDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Data for charts - Warna lebih kontras
  const statusStats: StatusStat[] = [
    { status: "Published", count: 125, color: "#16a34a" }, // Green-600
    { status: "Pending", count: 42, color: "#ea580c" }, // Orange-600
    { status: "Rejected", count: 18, color: "#dc2626" }, // Red-600
  ];

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

  const { username } = useAuth();

  // Fetch article data (simulation)
  useEffect(() => {
    setTimeout(() => {
      const data: Article[] = [
        {
          id: 1,
          title: "The Impact of AI Technology in Modern Education",
          author: "Ahmad Santoso",
          date: "May 15, 2023",
          status: "published",
          views: 1245,
        },
        {
          id: 2,
          title: "Digital Marketing Strategies for SMEs",
          author: "Dewi Lestari",
          date: "April 22, 2023",
          status: "pending",
        },
        {
          id: 3,
          title: "Analysis of Fintech Development in Indonesia",
          author: "Rizky Pratama",
          date: "April 10, 2023",
          status: "rejected",
          reason: "Plagiarism",
        },
        {
          id: 4,
          title: "Hydroponic Plant Cultivation Techniques",
          author: "Sari Wijaya",
          date: "March 5, 2023",
          status: "published",
          views: 876,
        },
        {
          id: 5,
          title: "Innovations in Environmentally Friendly Technology",
          author: "Budi Hartono",
          date: "February 28, 2023",
          status: "published",
          views: 1532,
        },
        {
          id: 6,
          title: "Modern Web Development Best Practices",
          author: "Joko Widodo",
          date: "June 12, 2023",
          status: "pending",
        },
        {
          id: 7,
          title: "The Future of Renewable Energy",
          author: "Ani Susanti",
          date: "June 5, 2023",
          status: "rejected",
          reason: "Irrelevant Topic",
        },
        {
          id: 8,
          title: "Data Science for Business Intelligence",
          author: "Rudi Hermawan",
          date: "May 28, 2023",
          status: "published",
          views: 987,
        },
      ];
      setArticles(data);
      setFilteredArticles(data);
      setLoading(false);
    }, 2000); // Increased timeout to better see the skeleton
  }, []);

  // Filter articles based on status and search query
  useEffect(() => {
    let result = articles;

    if (statusFilter !== "all") {
      result = result.filter((article) => article.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(result);
  }, [statusFilter, searchQuery, articles]);

  const clearFilters = () => {
    setStatusFilter("all");
    setSearchQuery("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-600 text-white hover:bg-green-700">
            Published
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-600 text-white hover:bg-amber-700">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-600 text-white hover:bg-red-700">
            Rejected
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Render skeleton if loading
  if (loading) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-foreground">Published Articles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">125</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="mr-2 h-4 w-4 text-amber-600" />
                <span className="text-foreground">Pending Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">42</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                <span className="text-foreground">Rejected Articles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">18</div>
              <p className="text-xs text-muted-foreground">
                -3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

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
                <CardTitle>Articles</CardTitle>
                <CardDescription>
                  Manage all articles in the system
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-col w-full sm:flex-row sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto cursor-pointer"
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                        All Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("published")}
                      >
                        Published
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("pending")}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("rejected")}
                      >
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant={"ghost"}
                    onClick={clearFilters}
                    className="cursor-pointer"
                  >
                    <Repeat className="size-4" />
                    <span>Clear Filter</span>
                  </Button>
                  <Button variant={"default"} className="cursor-pointer">
                    <DownloadIcon className="size-4" />
                    <span>Download Data</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article: Article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(article.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          by {article.author} • {article.date}
                          {article.views && ` • ${article.views} views`}
                        </p>
                        <div className="mt-2">
                          {getStatusBadge(article.status)}
                          {article.reason && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-gray-100 text-gray-800 border-gray-300"
                            >
                              {article.reason}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <Button
                    className="mt-4 cursor-pointer"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
