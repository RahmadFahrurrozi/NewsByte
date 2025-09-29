import { LoginFormValues } from "@/schemas/auth.schema";
import { IUser } from "@/types/IUser";

interface ILoginResponse {
  success: boolean;
  data: {
    role: string;
    user: IUser;
  };
  message?: string;
  error?: string;
  role: string;
}

export default async function loginUser(
  payload: LoginFormValues
): Promise<ILoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: ILoginResponse = await response.json();

  return result;
}
