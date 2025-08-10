export const dynamic = "force-dynamic";

import EmptyArticleClient from "@/components/EmptyArticleClient";
import ErrorArticleClient from "@/components/ErrorArticleClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryColor } from "@/constants/categoryColors";
import { getApprovedArticles } from "@/lib/article/getApprovedArticles";
import { IArticles } from "@/types/IArticles";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: articles, error } = await getApprovedArticles();

  const isEmpty = !articles || articles.length === 0;

  if (error) {
    console.log("error", error);
    return (
      console.error("Error loading news:", error), (<ErrorArticleClient />)
    );
  }

  if (isEmpty) {
    return <EmptyArticleClient />;
  }

  console.log("articles", articles);
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-2xl font-semibold">Recent News</h2>
        <ArrowRight className="size-6 text-primary" />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {articles?.map((article: IArticles) => (
          <article
            key={article.id}
            className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-card"
          >
            {/* Image */}
            {article.thumbnile ? (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.thumbnile}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">
                  No Image Available
                </span>
              </div>
            )}

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Category Badge */}
              <div className="mb-3">
                <Badge
                  variant="secondary"
                  className={`inline-block px-3 py-1 text-xs font-semibold ${getCategoryColor(
                    article.categories
                  )}`}
                >
                  {article.categories}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {article.content}
              </p>

              {/* Metadata */}
              <div className="mt-auto pt-4 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.profiles?.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <Link href={`/article/${article.slug}`}>
                <Button
                  className="mt-6 w-full cursor-pointer"
                  variant="outline"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  Read More
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
