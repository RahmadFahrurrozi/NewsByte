import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/register";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await registerUser(body);
    return NextResponse.json({
      success: true,
      data: result,
      message: "User registered successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          succes: false,
          message: error.message || "Registration failed",
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      message: "internal server error",
    },
    { status: 500 }
  );
}
