export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User, Shield } from "lucide-react";
import { sanitizeContent } from "@/utils/sanitizeContent";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const supabase = await createClient();
  const { slug } = await params;

  const { data, error } = await supabase
    .from("articles")
    .select(
      `*,
      profiles (
        name,
        username,
        photo
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (!data || error) {
    return notFound();
  }

  const safeContent = sanitizeContent(data?.content || "");

  return (
    <>
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-20 z-50 rounded-full p-2 border border-border bg-background/80 backdrop-blur-md shadow"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>

      <section className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-6">
          {/* Author */}
          <div className="flex items-center gap-2">
            {data.profiles?.photo ? (
              <Image
                src={data.profiles.photo}
                alt={data.profiles.name || "Author"}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>{data.profiles?.name ?? "Unknown Author"}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(data.created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Thumbnail */}
        {data.thumbnile ? (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Image
              src={data.thumbnile}
              alt={data.title}
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
        <article
          className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-img:rounded-lg prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />

        {/* Security Badge */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>
              Konten telah disanitasi dengan DOMPurify untuk keamanan. Editor:
              Tiptap
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
