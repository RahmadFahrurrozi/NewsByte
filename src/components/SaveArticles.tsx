"use client";

import DOMPurify from "dompurify";

interface SafeArticleProps {
  content: string;
  className?: string;
}

export function SafeArticle({ content, className }: SafeArticleProps) {
  return (
    <article
      className={
        className ??
        "prose dark:prose-invert max-w-none prose-headings:font-semibold prose-img:rounded-lg prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:rounded"
      }
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
