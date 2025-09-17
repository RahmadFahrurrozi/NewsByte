export default interface IEditArticle {
  article_id: string;
  title?: string;
  thumbnile?: File | string | null;
  content?: string;
  categories?: string;
  author_id: string;
}
