import { updateStatusArticle } from "@/lib/article/updateStatusArticle";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: roleUser, error: fetchError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (!user || roleUser?.role != "admin") {
    return NextResponse.json(
      {
        error: `Unauthorized`,
      },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const articleId = formData.get("articleId") as string;
  const status = formData.get("status") as string;

  const update = updateStatusArticle(articleId, status);

  if (!update) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  return NextResponse.json({ success: true, update });
}
