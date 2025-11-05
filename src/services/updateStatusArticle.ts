export default async function updateStatusArticleService(
  articleId: string,
  status: string
) {
  try {
    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("status", status);

    const response = await fetch("/api/admin/update-status-article", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal mengupdate profile!");
    }

    const result = await response.json();
    if (!result.success) {
      const errorMessage = result.error || "Updated Failed!";
      throw new Error(errorMessage);
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Updated failed");
    }

    throw new Error("Internal server error");
  }
}
