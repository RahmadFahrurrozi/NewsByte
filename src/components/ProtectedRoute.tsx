"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

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
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(fallbackPath);
        return;
      }

      if (
        allowedRoles.length > 0 &&
        userRole &&
        !allowedRoles.includes(userRole)
      ) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [user, userRole, loading, router, allowedRoles, fallbackPath]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 p-2 rounded-md pt-10 my-3">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-10 w-10 rounded- mb-4" />
          <Skeleton className="h-4 w-24 rounded-full mb-4" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Don't render children if user is not authenticated or doesn't have required role
  if (
    !user ||
    (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole))
  ) {
    return null;
  }

  return <>{children}</>;
}
