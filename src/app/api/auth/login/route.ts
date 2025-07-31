import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/schemas/auth.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi input with Zod
    const validatedData = loginSchema.parse(body);

    const supabase = await createClient();

    // Sign in user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

    console.log("Auth login result:", {
      hasUser: !!authData?.user,
      hasSession: !!authData?.session,
      userId: authData?.user?.id,
      userEmail: authData?.user?.email,
      authError: authError?.message,
    });
    if (authError) {
      return NextResponse.json(
        {
          success: false,
          error: authError.message || "Invalid email or password",
        },
        { status: 400 }
      );
    }

    // Get user role dari profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          error: profileError.message || "Failed to fetch user role",
        },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json({
      success: true,
      data: {
        user: authData.user,
        role: profile.role,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
