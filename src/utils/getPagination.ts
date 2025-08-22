export function getPagination(page: number, perPage: number) {
  const from = (page - 1) * perPage;
  const to = page * perPage - 1;
  return { from, to };
}
