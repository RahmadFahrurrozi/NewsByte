import { createClient } from "../../lib/supabase/client";
import { IUserProfile } from "@/types/IUserProfile";

const supabase = createClient();

export async function uploadProfilePicture(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `profileUser/${fileName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("profile-picture")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: publicUrl } = supabase.storage
    .from("profile-picture")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}

export async function updatedUserProfiles(profile: IUserProfile) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profile.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
