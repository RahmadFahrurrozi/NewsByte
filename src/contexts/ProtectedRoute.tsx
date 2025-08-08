"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useEffect } from "react";
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
  const { user, userRole, username, loading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Hanya jalankan redirect logic setelah auth benar-benar initialized
    if (!isInitialized || loading) return;

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
  }, [
    user,
    userRole,
    loading,
    isInitialized,
    router,
    allowedRoles,
    fallbackPath,
  ]);

  // Tampilkan loading skeleton sampai auth benar-benar siap
  if (!isInitialized || loading) {
    return <LoadingSkeleton />;
  }

  // Jika user null atau role tidak sesuai, jangan render apapun
  if (
    !user ||
    (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole))
  ) {
    return null;
  }

  // Jika username sudah ada sebelum render children
  if (user && !username && !loading) {
    return <LoadingSkeleton />;
  }

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
