import { createClient } from "../supabase/client";

export async function updateStatusArticle(articleId: string, status: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId)
        .single();

    if (error) throw new Error(error.message);
    if (data) {
        const { data, error } = await supabase.from("articles").update({
            article_status: status,
        }).eq("id", articleId);

        if(error) throw new Error(error.message);

        return data;

    } else {
        throw new Error("Article not found");
    }
}
