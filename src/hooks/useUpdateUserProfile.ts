import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile, userProfileSchema } from "@/schemas/userProfile.schema";
import {
  uploadProfilePicture,
  updatedUserProfiles,
} from "@/services/auth/updatedUserProfiles";
import { toast } from "sonner";
import { IUserProfile } from "@/types/IUserProfile";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { getProfileData } from "@/services/auth/getProfileData";

const supabase = createClient();

export function useProfile() {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      const profileData = await getProfileData(user.id);

      if (!profileData.email && user.email) {
        profileData.email = user.email;
      }

      return profileData;
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatedUserProfiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Successfully updated profile!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onError: (error: Error) => {
      toast.error(`Failed to upload photo: ${error.message}`);
    },
  });

  // React Hook Form setup
  const form = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      userName: "",
      bio: "",
      website: "",
      medium: "",
      linkedin: "",
      twitterx: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        userName: profile.username || "",
        bio: profile.bio || "",
        website: profile.website || "",
        medium: profile.medium || "",
        linkedin: profile.linkedin || "",
        twitterx: profile.twitterx || "",
      });
    }
  }, [profile, form]);

  const calculateProfileCompletion = (data: Partial<IUserProfile>): number => {
    const fields = [
      data.name,
      data.bio,
      data.website,
      data.medium,
      data.linkedin,
      data.twitterx,
      data.photo,
    ];

    const filledFields = fields.filter(
      (field) => field && field.toString().trim().length > 0
    ).length;

    return Math.round((filledFields / fields.length) * 100);
  };

  const onSubmit = async (data: UserProfile) => {
    if (!profile) {
      toast.error("Profile data not loaded");
      return;
    }

    try {
      let photoUrl = profile.photo;

      if (data.photo && data.photo instanceof File) {
        photoUrl = await uploadPhotoMutation.mutateAsync(data.photo);
      }

      // Prepare data for update
      const updateData: IUserProfile = {
        id: profile.id,
        name: data.name,
        username: data.userName,
        bio: data.bio || "",
        website: data.website || "",
        medium: data.medium || "",
        linkedin: data.linkedin || "",
        twitterx: data.twitterx || "",
        photo: photoUrl,
        email: profile.email,
        role: profile.role,
        created_at: profile.created_at,
        updated_at: new Date().toISOString(),
        profile_completion: calculateProfileCompletion({
          ...data,
          photo: photoUrl,
        }),
      };

      await updateMutation.mutateAsync(updateData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Hitung profile completion dari current form values
  const profileCompletion = profile ? calculateProfileCompletion(profile) : 0;

  return {
    profile,
    isLoading,
    error,
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isUpdating: updateMutation.isPending,
    isUploadingPhoto: uploadPhotoMutation.isPending,
    profileCompletion,
  };
}
