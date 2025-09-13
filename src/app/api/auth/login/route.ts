import { NextResponse } from "next/server";
import loginUser from "@/lib/auth/login";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);
    return NextResponse.json({
      success: true,
      data: result,
      message: "User logged in successfully",
      role: result.role
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Login failed",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "internal server error",
      },
      { status: 500 }
    );
  }
}
