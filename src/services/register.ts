import { RegisterFormValues } from "@/schemas/auth.schema";

interface IRegisterResponse {
  success: boolean;
  profileData: IUserProfile;
  error?: string;
}

export default async function regsiterUser(
  payload: RegisterFormValues
): Promise<IRegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: IRegisterResponse = await response.json();

  return result;
}
