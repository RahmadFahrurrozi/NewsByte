"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export const useLogoutUser = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(`${error.message}`);
    } else {
      toast.success("Logout Successfully!");
      router.push("/auth/login");
    }
  };

  return { handleLogout };
};
