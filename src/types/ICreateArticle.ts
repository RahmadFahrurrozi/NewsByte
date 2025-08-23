export default interface ICreateArticle {
  title: string;
  thumbnile?: string;
  content: string;
  categories: string;
  author_id: string;
  article_status: "pending" | "approved" | "rejected";
}
