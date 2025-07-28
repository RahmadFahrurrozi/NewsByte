export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { INews } from "@/types/INews";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single<INews>();

  if (!data || error) {
    return notFound();
  }

  return (
    <>
      <Link
        href="/"
        className="fixed top-20 z-50 rounded-full p-2 border border-border bg-background/80 backdrop-blur-md shadow"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>
      <section className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="flex items-center gap-6 text-muted-foreground text-sm mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {data.author}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(data.created_at).toLocaleDateString()}
          </div>
        </div>
        {data.thumbnile ? (
          <div className="mb-6">
            <Image
              src={data.thumbnile}
              alt={data.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center animate-pulse mb-6">
            <span className="text-muted-foreground">No Image Available</span>
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none">{data.content}</div>
      </section>
    </>
  );
}
