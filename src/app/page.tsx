export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { getCategoryColor } from "@/lib/categoryColors";
import { supabase } from "@/lib/supabase";
import { INews } from "@/types/INews";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const { data: news, error } = await supabase.from("news").select("*");

  if (error) {
    console.log("error", error);
    return (
      <div className="text-red-500 p-4">
        Error loading news: {error.message}
      </div>
    );
  }

  console.log("data news", news);

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-2xl font-semibold">Recent News</h2>
        <ArrowRight className="size-6 text-primary" />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {news?.map((item: INews) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-card"
          >
            {/* Image */}
            {item.thumbnile ? (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.thumbnile}
                  alt={item.title}
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
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                    item.categories
                  )}`}
                >
                  {item.categories}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {item.content}
              </p>

              {/* Metadata */}
              <div className="mt-auto pt-4 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <Button className="mt-6 w-full cursor-pointer" variant="outline">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
