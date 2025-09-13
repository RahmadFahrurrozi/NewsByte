import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                }
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if(!user) {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: 401 })
    }

    const formData = await request.formData();
    const username = formData.get("username") as string;
    const photo = formData.get("photo") as File | null;
    let imageUrl = null;

    const { data: oldPhoto, error: fetchError } = await supabase.from("profiles").select("photo").eq("id", user.id).single();
    let oldImageUrl = null;
    if(fetchError || !oldPhoto) {
        console.error("Gagal mengambil gambar lama", fetchError);
    } else if(oldPhoto.photo) {
        const publicUrlParts = oldPhoto.photo.split("/");
        const oldPhotoName = publicUrlParts[publicUrlParts.length - 1]
        oldImageUrl = `${user.id}/${oldPhotoName}`;
    }

    if(photo) {
        const fileExtension = photo.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `${user.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage.from("profile-picture").upload(filePath, photo, {
            cacheControl: '3600',
            upsert: false
        });

        if(uploadError) {
            console.log("upload error", uploadError.message);
            return NextResponse.json({error: uploadError.message}, {status: 500});
        }

        const {data: publicUrlData} = supabase.storage.from("profile-picture").getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
        
        if(oldImageUrl) {
            const { error: deleteError } = await supabase.storage.from("profile-picture").remove([oldImageUrl]);
            if(deleteError) {
                console.log("Gagal menghapus gambar lama", deleteError);
            }
        }
    }

    const { data, error } = await supabase.from("profiles").update({
        username: username,
        photo: imageUrl
    }).eq("id", user.id); 

    if(error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

    return NextResponse.json({ success: true, data });
}