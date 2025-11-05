import { IUser } from "@/types/IUser";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getUser(): Promise<IUser | null> {
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      async get(name) {
        return (await cookieStore).get(name)?.value;
      }
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  
  if(!user) {
    return null;
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from('profiles')
    .select('id, username, role, photo')
    .eq('id', user.id)
    .single();

  if(fetchError || !existingUser) {
    console.error("Error fetching profile or profile not found:", fetchError);
    // Jika tidak ada data profil, kembalikan data dasar dari Supabase user
    return {
      id: user.id,
      username: user.email?.split('@')[0],
      photo: undefined,
      email: user.email,
      role: 'user', // Default role
    };
  }

  const dataUser: IUser = {
    id: existingUser.id,
    username: existingUser.username,
    photo: existingUser.photo,
    email: user.email,
    role: existingUser.role,
  }

  return dataUser;
}