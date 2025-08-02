import { LoginFormValues } from "@/schemas/auth.schema";

interface ILoginResponse {
  success: boolean;
  loginData: IUser;
  error?: string;
}

export default async function loginUser(
  payload: LoginFormValues
): Promise<ILoginResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: ILoginResponse = await response.json();

    if (!response.ok || !result.success) {
      const errorMessage = result.error || "Login failed";
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
