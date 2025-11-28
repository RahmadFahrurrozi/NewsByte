import { createClient } from "../supabase/client";

const supabase = createClient();

export async function changePassword(oldPassword: string, newPassword: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) {
        throw new Error("User not authenticated");
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: oldPassword
    });
    if(signInError) {
        throw new Error("Old password doest not match");
    }
    // function updateUser berasal dari supabase, otomatis diketahui user dari session login di browser
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if(error) {
        throw new Error(error.message);
    }
    return data;
}