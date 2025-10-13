"use client"

import { useForm } from "react-hook-form";
import { IUserProfile } from "@/types/IUserProfile";
import { updateProfile, UpdateProfileForm } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import updateProfileService from "@/services/updateProfile";
import { AdminProfileClientProps } from "@/components/AdminProfile";
 
export interface IUpdateProfileResponse {
  success: boolean;
  updateProfileData: IUserProfile;
  error?: string;
}

export function useUpdateProfile({ dataUser }: AdminProfileClientProps ) {
  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfile),
    defaultValues: {
      username: dataUser.username || ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [profile, setProfile] = useState({
    username: dataUser.username,
    email: dataUser.email,
    photo: dataUser.photo,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const photoValue = form.watch("photo");

  useEffect(() => {
    if(photoValue instanceof FileList && photoValue.length > 0) {
      const file = photoValue[0];
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewImage(newPreviewUrl);

      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [photoValue]);

  const handleSubmit = async (values: UpdateProfileForm) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result: IUpdateProfileResponse = await updateProfileService(values);
      if (!result.success) {
        toast.error(result.error);
      }

      toast.success("update successfull!");
      window.location.href = window.location.pathname;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Update failed!";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  return { form, loading, profile, previewImage, handleSubmit };
}