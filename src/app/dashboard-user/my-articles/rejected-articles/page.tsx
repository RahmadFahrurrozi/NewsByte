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
import {
  AlertCircle,
  FileText,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

interface Article {
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

export default function RejectedArticlePages() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("month");
  const [loading, setLoading] = useState<boolean>(true);

  // Data for charts
  const rejectionStats: RejectionStat[] = [
    { reason: "Content Quality", count: 12, color: "#3A86FF" }, // Bright blue
    { reason: "Plagiarism", count: 8, color: "#FF006E" }, // Magenta
    { reason: "Irrelevant Topic", count: 15, color: "#8338EC" }, // Purple
    { reason: "Wrong Format", count: 5, color: "#FB5607" }, // Orange
    { reason: "Other", count: 3, color: "#FFBE0B" }, // Yellow
  ];

  const monthlyData: MonthlyData[] = [
    { month: "Jan", rejected: 5, approved: 45 },
    { month: "Feb", rejected: 7, approved: 48 },
    { month: "Mar", rejected: 10, approved: 42 },
    { month: "Apr", rejected: 8, approved: 46 },
    { month: "May", rejected: 12, approved: 49 },
    { month: "Jun", rejected: 9, approved: 51 },
  ];

  // Fetch article data (simulation)
  useEffect(() => {
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          title: "The Impact of AI Technology in Modern Education",
          author: "Ahmad Santoso",
          date: "May 15, 2023",
          reason: "Content Quality",
          status: "Rejected",
        },
        {
          id: 2,
          title: "Digital Marketing Strategies for SMEs",
          author: "Dewi Lestari",
          date: "April 22, 2023",
          reason: "Irrelevant Topic",
          status: "Rejected",
        },
        {
          id: 3,
          title: "Analysis of Fintech Development in Indonesia",
          author: "Rizky Pratama",
          date: "April 10, 2023",
          reason: "Plagiarism",
          status: "Rejected",
        },
        {
          id: 4,
          title: "Hydroponic Plant Cultivation Techniques",
          author: "Sari Wijaya",
          date: "March 5, 2023",
          reason: "Wrong Format",
          status: "Rejected",
        },
        {
          id: 5,
          title: "Innovations in Environmentally Friendly Technology",
          author: "Budi Hartono",
          date: "February 28, 2023",
          reason: "Content Quality",
          status: "Rejected",
        },
      ]);
      setLoading(false);
    }, 1500);
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
              <CardTitle className="text-sm font-medium">Top Reason</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Irrelevance</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Rejected Articles List */}
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
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <RefreshCw className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
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
                          by {article.author} • {article.date}
                        </p>
                        <Badge
                          variant="outline"
                          className="mt-2 bg-destructive/10 text-destructive"
                        >
                          {article.reason}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
