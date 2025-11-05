// app/profile/page.tsx
import AdminProfile from "@/components/AdminProfile";
import { getUser } from "@/services/auth/getUser";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const dataUser = await getUser();
  if (!dataUser) {
    redirect("/login");
  }

  return <AdminProfile dataUser={dataUser} />;
}
