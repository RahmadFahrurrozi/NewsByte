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
} from "lucide-react";
import {
  IoAnalyticsSharp,
  IoDocumentOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import PaginationComponent from "@/components/PaginationComponent";
import getBadgeColorStatus from "@/utils/getColorStstus";
import articlesData from "@/constants/dataDummyArticles";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

export default function MyarticlesPage() {
  return (
    <section className="container mx-auto py-5">
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
                <span>{articlesData.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  Published
                  <CheckCircle2 className="text-green-500 size-4" />
                </span>
                <span className="font-medium">
                  {
                    articlesData.filter(
                      (article) => article.status === "published"
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  Drafts
                  <IoDocumentTextOutline className="size-4 text-orange-300" />
                </span>
                <span className="font-medium">
                  {
                    articlesData.filter(
                      (article) => article.status === "pending"
                    ).length
                  }
                </span>
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
              <Button
                variant="outline"
                className="w-full justify-start gap-3 cursor-pointer border border-dashed p-6"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </Button>
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
                  {
                    articlesData.filter(
                      (article) => article.status === "pending"
                    ).length
                  }{" "}
                  unpublished Article waiting for review
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
            <div className="space-y-4">
              {articlesData.map((article) => (
                <Card key={article.id}>
                  <CardContent className="px-6 py-3">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{article.title}</h3>
                          <Badge
                            className={getBadgeColorStatus(article.status)}
                          >
                            {article.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {article.status} on {article.publishDate}
                        </p>
                        <div className="mt-2 flex gap-2">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="bg-blue-500 cursor-pointer text-white border-foreground hover:border-foreground/50 transition-all duration-200 ease-in-out"
                        size="sm"
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
