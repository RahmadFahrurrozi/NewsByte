"use client";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export function useSocialLogin() {
  const supabase = createClient();
  const [socialLoading, setSocialLoading] = useState(false);

  const hadnleLoginGoogle = async () => {
    setSocialLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/dashboard-user`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        toast.error("Google login failed");
        console.error("Google login error:", error.message);
      }
    } finally {
      setSocialLoading(false);
    }
  };

  return {
    hadnleLoginGoogle,
    socialLoading,
  };
}
