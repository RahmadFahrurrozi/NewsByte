import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("sb-access-token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("Middleware - Path:", pathName);
  console.log("Middleware - Token exists:", !!token);
  console.log("Middleware - Role:", role);

  // Redirect to login if accessing protected routes without token
  if (
    (pathName.startsWith("/dashboard-user") ||
      pathName.startsWith("/dashboard-admin")) &&
    !token
  ) {
    console.log("Redirecting to login - no token");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role-based access control
  if (pathName.startsWith("/dashboard-user") && role !== "user") {
    console.log("Redirecting to unauthorized - not user role");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathName.startsWith("/dashboard-admin") && role !== "admin") {
    console.log("Redirecting to unauthorized - not admin role");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard-user/:path*",
    "/dashboard-admin/:path*",
    "/unauthorized",
  ],
};
