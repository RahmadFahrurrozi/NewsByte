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
        // Coba dapatkan data user dari auth.users terlebih dahulu untuk memastikan memiliki data terbaru
        const { data: authUserData, error: authError } =
          await supabase.auth.getUser();
        const authUser = authUserData?.user;

        if (authError) {
          console.error("Error fetching auth user:", authError);
        }

        // Coba ambil profil dari database
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        // Jika profil ditemukan, gunakan data tersebut
        if (!error && profile) {
          const userData = {
            role: profile.role,
            username: profile.username,
          };
          userDataCache.set(userId, userData); // Cache the result
          return userData;
        }

        // Jika profil tidak ditemukan (PGRST116) atau error lainnya
        if (error) {
          // Jika kita memiliki data auth user, coba buat profil baru
          if (
            authUser &&
            (error.code === "PGRST116" ||
              error.message.includes("does not exist"))
          ) {
            try {
              // Ekstrak data dari user_metadata
              const username =
                authUser.user_metadata?.name ||
                authUser.user_metadata?.full_name ||
                authUser.email?.split("@")[0] ||
                `user_${userId.substring(0, 8)}`;

              const role = authUser.user_metadata?.role || "user";

              // create new profile
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
                userDataCache.set(userId, userData);
                return userData;
              }

              if (insertError) {
                console.error("Error creating new profile:", insertError);
              }
            } catch (insertErr) {
              console.error("Exception during profile creation:", insertErr);
            }
          }

          // Fallback ke user_metadata jika tersedia
          if (authUser?.user_metadata) {
            const userData = {
              role: authUser.user_metadata.role || "user",
              username:
                authUser.user_metadata.name ||
                authUser.user_metadata.full_name ||
                authUser.email?.split("@")[0] ||
                `user_${userId.substring(0, 8)}`,
            };
            userDataCache.set(userId, userData);
            return userData;
          }
        }

        // Fallback jika semua cara gagal
        const fallbackData = {
          role: "user",
          username: `user_${userId.substring(0, 8)}`,
        };
        userDataCache.set(userId, fallbackData); // Cache the fallback result
        return fallbackData;
      } catch (error) {
        // Tampilkan informasi error yang lebih detail
        console.error(
          "Error fetching user data:",
          JSON.stringify(error, null, 2)
        );

        // Pastikan selalu mengembalikan nilai yang valid meskipun terjadi error
        const fallbackData = { role: "user", username: null };
        userDataCache.set(userId, fallbackData); // Cache fallback data untuk menghindari error berulang
        return fallbackData;
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
