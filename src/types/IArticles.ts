import { IUserProfile } from "./IUserProfile";
export type IArticlesStatus = "approved" | "pending" | "rejected";

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
  profiles: IUserProfile;
  created_at: string;
  updated_at: string;
}
