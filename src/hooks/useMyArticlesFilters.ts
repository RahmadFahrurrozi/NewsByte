import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useMyArticlesFilters() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    status: searchParams.get("status") || "all",
    sort: searchParams.get("sort") || "desc",
  });

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [perPage] = useState(5);

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    const status = searchParams.get("status") || "all";
    const sort = searchParams.get("sort") || "desc";
    const pageParam = Number(searchParams.get("page")) || 1;

    setFilters({ category, status, sort });
    setPage(pageParam);
  }, [searchParams]);

  const resetFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      sort: "desc",
    });
    setPage(1);
  };

  return {
    filters,
    setFilters,
    page,
    setPage,
    perPage,
    resetFilters,
  };
}
