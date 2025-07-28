import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError || !loginData) {
    return NextResponse.json(
      { error: loginError?.message || "Failed to login" },
      { status: 400 }
    );
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", loginData.user?.id)
    .single();

  if (profileError || !profileData) {
    return NextResponse.json(
      { error: profileError?.message || "Profile not found" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();

  // Set access token cookie
  cookieStore.set("sb-access-token", loginData.session?.access_token || "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Set refresh token cookie
  cookieStore.set("sb-refresh-token", loginData.session?.refresh_token || "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  // Set role cookie
  cookieStore.set("role", profileData.role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({
    message: "Login successful",
    user: loginData.user,
    role: profileData.role,
  });
}
