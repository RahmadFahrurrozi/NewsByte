export default interface IEditArticle {
  title?: string;
  thumbnile?: File | string;
  content?: string;
  categories?: string;
  author_id: string;
}
