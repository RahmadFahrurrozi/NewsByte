import { IArticles } from "@/types/IArticles";
import { createClient } from "@/lib/supabase/client";

interface IRejectedArticles {
  data: IArticles[] | null;
  error: Error | null;
}

export async function getRejectedArticles(): Promise<IRejectedArticles> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }

  if (!user) {
    throw new Error(`User not Aunthenticated`);
  }

  const { data, error } = await supabase
    .from("articles")
    .select(`*, profiles(*)`)
    .eq("article_status", "rejected")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to get rejected articles: ${error.message}`);
  }

  return { data, error };
}
