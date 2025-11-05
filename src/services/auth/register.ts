import { createClient } from "../../lib/supabase/server";
import { RegisterFormValues, registerSchema } from "@/schemas/auth.schema";

export async function registerUser(payload: RegisterFormValues) {
  const validatedData = registerSchema.parse(payload);
  const supabase = await createClient();

  const { data: registerData, error: registerError } =
    await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          username: validatedData.username,
        },
      },
    });

  if (registerError || !registerData.user) {
    throw new Error(registerError?.message || "Registration failed");
  }

  // === STEP 2: Create user profile in 'profiles' table ===
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: registerData.user.id,
      username: validatedData.username,
      role: "user",
    })
    .select()
    .single();

  if (profileError) {
    // Cek jika username duplikat (kode 23505 untuk PostgreSQL unique violation)
    if (profileError.code === "23505") {
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", registerData.user.id)
        .single();

      if (fetchError) throw new Error("Profile exists, fetch failed");
      return { user: registerData.user, profile: existingProfile };
    }

    if (profileError.message?.includes("username")) {
      throw new Error("Username is already taken");
    }

    throw new Error(`Profile creation failed: ${profileError.message}`);
  }

  return {
    user: registerData.user,
    profile: profileData,
  };
}
