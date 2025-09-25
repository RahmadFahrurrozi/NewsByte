interface IGetArticleParams {
  author_id: string;
  page: number;
  perPage: number;
  category?: string;
  status?: string;
  sort?: string;
  search?: string;
}
