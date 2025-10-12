import { IUserProfile } from "@/types/IUserProfile";
import { createClient } from "../supabase/client";

const supabase = createClient();

export async function getProfileData(userId: string): Promise<IUserProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
