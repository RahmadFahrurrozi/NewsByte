import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNewsSchema,
  createNewsSchema,
} from "../schemas/createNewsSchema";

export default function useCreateNews() {
  const form = useForm<CreateNewsSchema>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: "",
      content: "",
      categories: "",
      author: "",
      thumbnile: undefined,
    },
  });
  const onSubmit = async (data: CreateNewsSchema) => {
    console.log("Form submitted with data:", data);
  };

  return {
    form,
    onSubmit,
  };
}
