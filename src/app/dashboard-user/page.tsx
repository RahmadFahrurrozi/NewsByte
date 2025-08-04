"use client";

import { useAuth } from "@/contexts/AuthContextProvider";

export default function DashboardMainUser() {
  const { username } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Dashboard User</h1>
      <p className="text-gray-300">
        Welcome, <span className="text-blue-500 font-semibold">{username}</span>
      </p>
    </div>
  );
}
