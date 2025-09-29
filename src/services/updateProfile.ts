import { IUpdateProfileResponse } from "@/hooks/useUpdateProfile";
import { UpdateProfileForm } from "@/schemas/profile.schema";

export default async function updateProfileService(
    payload: UpdateProfileForm
): Promise<IUpdateProfileResponse> {
    try {
        const formData = new FormData();
        formData.append("username", payload.username);
        if(payload.photo) {
            formData.append("photo", payload.photo);
        }
        const response = await fetch("/api/admin/update-profile", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Gagal mengupdate profile!");
        }

        const result = await response.json();
        if(!result.success) {
            const errorMessage = result.error || "Updated Failed!";
            throw new Error(errorMessage); 
        }
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Login failed");
        }

        throw new Error("Internal server error");
    }
}