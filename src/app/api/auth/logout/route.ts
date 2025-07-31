import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    console.log("=== LOGOUT API START ===");

    const supabase = await createClient();

    // Sign out user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Logout failed",
        },
        { status: 400 }
      );
    }

    console.log("User logged out successfully");
    console.log("=== LOGOUT API END ===");

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
