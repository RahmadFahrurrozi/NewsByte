import { createClient } from "../../lib/supabase/server";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schema";

export default async function loginUser(payload: LoginFormValues) {
  const validatedData = loginSchema.parse(payload);
  const supabase = await createClient();

  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

  if (loginError) {
    throw new Error("Email or password is incorrect");
  }

  // === Get user role ===
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", loginData.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message || "Profile not found");
  }

  return { user: loginData.user, role: profileData.role };
}
