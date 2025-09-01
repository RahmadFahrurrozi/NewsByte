export default interface ICreateArticle {
  title: string;
  thumbnile?: File | string;
  content: string;
  categories: string;
  author_id: string;
  article_status: "pending" | "approved" | "rejected";
}
