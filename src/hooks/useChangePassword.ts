import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { changePassword } from "@/lib/auth/changePassword";
import { changePasswordFormValues, changePasswordSchema } from "@/schemas/changePassword.schema";

export function useChangePassword() {
    const formChangePassword = useForm<changePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_new_password: ""
        }
    });

    const mutation = useMutation({
        mutationFn: async (data: changePasswordFormValues) => {
            return await changePassword(data.old_password, data.new_password);
        },
        onSuccess: () => {
            toast.success("Password update successfully!");
            formChangePassword.reset();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const onSubmitChangePassword = (data: changePasswordFormValues) => {
        mutation.mutate(data);
    }

    return {
        formChangePassword, 
        onSubmitChangePassword: formChangePassword.handleSubmit(onSubmitChangePassword),
        isLoadingChangePassword: mutation.isPending
    }
}