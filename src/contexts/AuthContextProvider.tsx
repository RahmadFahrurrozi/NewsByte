"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  username: string | null;
  loading: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const supabase = createClient();

  // Cache untuk user data
  const userDataCache = new Map<
    string,
    { role: string | null; username: string | null }
  >();

  // Helper function to fetch user data dengan caching
  const fetchUserData = useCallback(
    async (userId: string) => {
      // Check cache first
      if (userDataCache.has(userId)) {
        return userDataCache.get(userId)!;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role, username")
          .eq("id", userId)
          .single();

        if (error) throw error;

        const userData = {
          role: profile?.role ?? null,
          username: profile?.username ?? null,
        };

        userDataCache.set(userId, userData); // Cache the result
        return userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return { role: null, username: null };
      }
    },
    [supabase]
  );

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (!isMounted) return;

        setUser(session?.user ?? null);

        if (session?.user) {
          const { role, username } = await fetchUserData(session.user.id);
          if (isMounted) {
            setUserRole(role);
            setUsername(username);
          }
        } else {
          setUserRole(null);
          setUsername(null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED"
      ) {
        setLoading(true);
      }

      try {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { role, username } = await fetchUserData(session.user.id);
          if (isMounted) {
            setUserRole(role);
            setUsername(username);
          }
        } else {
          setUserRole(null);
          setUsername(null);
          userDataCache.clear();
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserData]);

  const value = {
    user,
    userRole,
    username,
    loading,
    isInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
