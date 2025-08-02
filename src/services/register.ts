import { RegisterFormValues } from "@/schemas/auth.schema";

interface IRegisterResponse {
  success: boolean;
  profileData: IUserProfile;
  error?: string;
}

export default async function regsiterUser(
  payload: RegisterFormValues
): Promise<IRegisterResponse> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: IRegisterResponse = await response.json();

    if (!response.ok || !result.success) {
      const errorMessage = result.error || "Registration failed";
      throw new Error(errorMessage);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Registration failed");
    }

    throw new Error("Internal server error");
  }
}
