export type IArticlesStatus = "published" | "pending" | "rejected";

export interface IArticles {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_id: string;
  categories: string;
  thumbnile: string;
  article_status: IArticlesStatus;
  review_notes: string;
  created_at: string;
  updated_at: string;
}
