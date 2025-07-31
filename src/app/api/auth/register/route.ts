import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { registerSchema } from "@/schemas/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("=== REGISTER API START ===");

    // Validate input dengan Zod
    const validatedData = registerSchema.parse(body);
    console.log("Data validation successful");

    const supabase = await createClient();

    // Step 1: Sign up user dengan Supabase Auth
    console.log("Step 1: Creating user account");
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          username: validatedData.username,
        },
      },
    });

    console.log("Auth signup result:", {
      hasUser: !!authData?.user,
      hasSession: !!authData?.session,
      userId: authData?.user?.id,
      userEmail: authData?.user?.email,
      authError: authError?.message,
    });

    if (authError) {
      console.error("Auth signup error:", authError);
      return NextResponse.json(
        {
          success: false,
          error: authError.message || "Authentication failed",
        },
        { status: 400 }
      );
    }

    if (!authData.user) {
      console.error("User creation failed - no user returned");
      return NextResponse.json(
        {
          success: false,
          error: "User creation failed",
        },
        { status: 400 }
      );
    }

    // Step 2: Create profile entry
    console.log("Step 2: Creating user profile");

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        username: validatedData.username,
        role: "user",
      })
      .select()
      .single();

    console.log("Profile creation result:", {
      success: !profileError,
      profileData: profileData,
      error: profileError?.message,
      status: profileError?.code,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);

      // Handle duplicate profile (23505 = unique_violation)
      if (profileError.code === "23505") {
        console.log("Profile already exists, checking existing profile");

        const { data: existingProfile, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (fetchError) {
          console.error("Failed to fetch existing profile:", fetchError);
          return NextResponse.json(
            {
              success: false,
              error:
                "Profile creation failed and unable to fetch existing profile",
            },
            { status: 500 }
          );
        }

        if (existingProfile) {
          console.log("Using existing profile");
          return NextResponse.json({
            success: true,
            data: {
              user: authData.user,
              profile: existingProfile,
              message: "Registration successful",
            },
          });
        }
      }

      // Handle username already taken
      if (profileError.message?.includes("username")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Username is already taken. Please choose a different username.",
          },
          { status: 400 }
        );
      }

      // Generic profile error
      return NextResponse.json(
        {
          success: false,
          error: `Profile creation failed: ${profileError.message}`,
        },
        { status: 500 }
      );
    }

    console.log("Registration completed successfully");
    console.log("=== REGISTER API END ===");

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        user: authData.user,
        profile: profileData,
        message: "Registration successful",
      },
    });
  } catch (error) {
    console.error("Registration API error:", error);

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Registration failed",
      },
      { status: 500 }
    );
  }
}
