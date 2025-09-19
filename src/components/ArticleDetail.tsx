import { ArrowLeft, CalendarDays, User, Shield, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { IArticles } from "@/types/IArticles";
import { SafeArticle } from "./SaveArticles";

interface IArticleDetailProps {
  article: IArticles;
  mode?: "published" | "preview";
  showBackButton?: boolean;
}

export default function ArticleDetail({
  article,
  mode = "published",
  showBackButton = true,
}: IArticleDetailProps) {
  const isPreview = mode === "preview";

  return (
    <>
      {showBackButton && !isPreview && (
        <Link
          href={isPreview ? "/dashboard-user/my-articles" : "/"}
          className="fixed top-20 left-5 z-50 rounded-full p-2 border border-border bg-background/80 backdrop-blur-md shadow"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
      )}

      {isPreview && (
        <div className="fixed top-14 right-0.5 z-50 rounded-lg p-2 border border-yellow-500 bg bg-yellow-100/80 backdrop-blur-md shadow">
          <div className="flex items-center gap-2 text-yellow-600">
            <Eye className="size-4" />
            <span className="text-sm font-medium">Preview Mode</span>
          </div>
        </div>
      )}

      <section className="max-w-3xl mx-auto px-4 py-8">
        {isPreview && (
          <div className="mb-4">
            <Badge
              className={
                article.article_status === "approved"
                  ? "bg-green-100 text-green-800 px-6 py-1"
                  : article.article_status === "pending"
                  ? "bg-yellow-100 text-yellow-800 px-6 py-1"
                  : "bg-red-100 text-red-800 px-6 py-1"
              }
            >
              Status <span className="font-bold">{article.article_status}</span>
            </Badge>
            <p className="text-sm text-muted-foreground pt-4">
              This is how your article will look when published
            </p>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-6">
          {/* Author */}
          <div className="flex items-center gap-2">
            {article.profiles?.photo ? (
              <Image
                src={article.profiles.photo}
                alt={article.profiles.name || "Author"}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>{article.profiles?.name ?? "Unknown Author"}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(article.created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Thumbnail */}
        {article.thumbnile ? (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Image
              src={article.thumbnile}
              alt={article.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center animate-pulse mb-6 rounded-lg">
            <span className="text-muted-foreground">No Image Available</span>
          </div>
        )}

        {/* Content */}
        <SafeArticle className="tiptap" content={article.content || ""} />

        {isPreview && (
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href={`/dashboard-user/my-articles/${article.id}/edit`}>
                Edit Article
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard-user/my-articles">
                Back to My Articles
              </Link>
            </Button>
          </div>
        )}

        {!isPreview && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>
                Content has been verified by our team |{" "}
                <span className="font-bold">NewsByte</span>
                Team.
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
