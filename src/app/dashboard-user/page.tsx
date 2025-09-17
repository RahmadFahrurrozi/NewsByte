"use client";

import { useAuth } from "@/contexts/AuthContextProvider";
import { Suspense } from "react";

export default function DashboardMainUser() {
  const { username } = useAuth();

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-3">Dashboard User</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <p className="text-gray-300">
          Welcome,{" "}
          <span className="text-blue-500 font-semibold">{username}</span>
        </p>
      </Suspense>
    </div>
  );
}
