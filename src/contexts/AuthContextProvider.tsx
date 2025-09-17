"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
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

  // Ref untuk tracking mounted state dan prevent race conditions
  const isMountedRef = useRef(true);
  const initializingRef = useRef(false);
  const currentUserIdRef = useRef<string | null>(null);

  // Cache untuk user data - pindah ke ref agar persistent
  const userDataCacheRef = useRef(
    new Map<string, { role: string | null; username: string | null }>()
  );

  // Helper function to update user data atomically
  const updateUserData = useCallback(
    (
      newUser: User | null,
      newRole: string | null = null,
      newUsername: string | null = null
    ) => {
      if (!isMountedRef.current) return;

      // Batch state updates to prevent multiple re-renders
      setUser((prevUser) => {
        // Only update if actually different
        if (prevUser?.id !== newUser?.id) {
          setUserRole(newRole);
          setUsername(newUsername);
          return newUser;
        }

        // Update role/username even if user is same (might be updated data)
        if (newRole !== null || newUsername !== null) {
          if (newRole !== null) setUserRole(newRole);
          if (newUsername !== null) setUsername(newUsername);
        }

        return prevUser;
      });
    },
    []
  );

  // Helper function to fetch user data dengan improved caching dan error handling
  const fetchUserData = useCallback(
    async (userId: string) => {
      // Prevent fetching for same user multiple times
      if (
        currentUserIdRef.current === userId &&
        userDataCacheRef.current.has(userId)
      ) {
        return userDataCacheRef.current.get(userId)!;
      }

      try {
        // Coba ambil profil dari database
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role, username")
          .eq("id", userId)
          .single();

        // Jika profil ditemukan, gunakan data tersebut
        if (!error && profile) {
          const userData = {
            role: profile.role,
            username: profile.username,
          };
          userDataCacheRef.current.set(userId, userData);
          return userData;
        }

        // Jika profil tidak ditemukan, coba buat yang baru
        if (
          error &&
          (error.code === "PGRST116" ||
            error.message.includes("does not exist"))
        ) {
          // Get fresh auth user data
          const { data: authUserData } = await supabase.auth.getUser();
          const authUser = authUserData?.user;

          if (authUser && authUser.id === userId) {
            const username =
              authUser.user_metadata?.name ||
              authUser.user_metadata?.full_name ||
              authUser.email?.split("@")[0] ||
              `user_${userId.substring(0, 8)}`;

            const role = authUser.user_metadata?.role || "user";

            // Try to create new profile
            const { data: newProfile, error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: userId,
                username: username,
                role: role,
                created_at: new Date().toISOString(),
              })
              .select("role, username")
              .single();

            if (!insertError && newProfile) {
              const userData = {
                role: newProfile.role,
                username: newProfile.username,
              };
              userDataCacheRef.current.set(userId, userData);
              return userData;
            }

            // If insert failed, fallback to metadata
            const userData = {
              role: role,
              username: username,
            };
            userDataCacheRef.current.set(userId, userData);
            return userData;
          }
        }

        // Final fallback
        const fallbackData = {
          role: "user",
          username: `user_${userId.substring(0, 8)}`,
        };
        userDataCacheRef.current.set(userId, fallbackData);
        return fallbackData;
      } catch (error) {
        console.error("Error fetching user data:", error);

        const fallbackData = {
          role: "user",
          username: `user_${userId.substring(0, 8)}`,
        };
        userDataCacheRef.current.set(userId, fallbackData);
        return fallbackData;
      }
    },
    [supabase]
  );

  // Single initialization effect
  useEffect(() => {
    // Prevent multiple initialization
    if (initializingRef.current) return;

    initializingRef.current = true;
    isMountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting initial session:", error);
          throw error;
        }

        if (!isMountedRef.current) return;

        if (session?.user) {
          currentUserIdRef.current = session.user.id;
          const { role, username } = await fetchUserData(session.user.id);

          if (isMountedRef.current) {
            updateUserData(session.user, role, username);
          }
        } else {
          currentUserIdRef.current = null;
          if (isMountedRef.current) {
            updateUserData(null, null, null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (isMountedRef.current) {
          updateUserData(null, null, null);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setIsInitialized(true);
          initializingRef.current = false;
        }
      }
    };

    initializeAuth();

    // Auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Skip if still initializing to prevent race condition
      if (initializingRef.current) return;

      console.log("Auth state change:", event);

      try {
        if (session?.user) {
          // Only fetch data if user actually changed
          if (currentUserIdRef.current !== session.user.id) {
            currentUserIdRef.current = session.user.id;
            setLoading(true);

            const { role, username } = await fetchUserData(session.user.id);

            if (isMountedRef.current) {
              updateUserData(session.user, role, username);
            }
          } else {
            // Same user, just update user object
            if (isMountedRef.current) {
              setUser(session.user);
            }
          }
        } else {
          currentUserIdRef.current = null;
          userDataCacheRef.current.clear();

          if (isMountedRef.current) {
            updateUserData(null, null, null);
          }
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
        if (isMountedRef.current) {
          updateUserData(null, null, null);
        }
      } finally {
        if (
          isMountedRef.current &&
          session?.user &&
          currentUserIdRef.current === session.user.id
        ) {
          setLoading(false);
        }
      }
    });

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - hanya run sekali

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
