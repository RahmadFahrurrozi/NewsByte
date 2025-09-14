"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles = [],
  fallbackPath = "/",
}: ProtectedRouteProps) {
  const { user, userRole, loading, isInitialized } = useAuth();
  const router = useRouter();
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    // Reset redirect flag when auth state changes significantly
    if (!isInitialized) {
      hasRedirectedRef.current = false;
      return;
    }

    // Prevent multiple redirects
    if (hasRedirectedRef.current) return;

    // Don't redirect while still loading
    if (loading) return;

    // Check authentication
    if (!user) {
      console.log("No user found, redirecting to:", fallbackPath);
      hasRedirectedRef.current = true;
      router.push(fallbackPath);
      return;
    }

    // Check authorization
    if (
      allowedRoles.length > 0 &&
      userRole &&
      !allowedRoles.includes(userRole)
    ) {
      console.log("User role not allowed:", userRole, "Allowed:", allowedRoles);
      hasRedirectedRef.current = true;
      router.push("/unauthorized");
      return;
    }

    // Reset redirect flag if user is properly authenticated and authorized
    if (
      user &&
      (allowedRoles.length === 0 ||
        !userRole ||
        allowedRoles.includes(userRole))
    ) {
      hasRedirectedRef.current = false;
    }
  }, [
    user,
    userRole,
    loading,
    isInitialized,
    router,
    allowedRoles,
    fallbackPath,
  ]);

  // Show loading while auth is initializing or loading
  if (!isInitialized || loading) {
    return <LoadingSkeleton />;
  }

  // Don't render anything if redirecting (prevents flash of content)
  if (!user) {
    return <LoadingSkeleton />;
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return <LoadingSkeleton />;
  }

  // Render children only when fully authenticated and authorized
  return <>{children}</>;
}

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-md">
      <div className="flex gap-3 items-center mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-full max-w-[200px]" />
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </div>
  );
};
