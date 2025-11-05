import ApprovalAdmin from "@/components/Admin/ApprovalAdmin";
import { getPendingArticles } from "@/services/article/getPendingArticles";

export default async function AdminProfilePage() {
  const { data, error } = await getPendingArticles();
  return <ApprovalAdmin data={data} error={error} />;
}
