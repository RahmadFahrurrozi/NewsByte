import {
  reassonsArtcleSchema,
  reassonsArtcleValues,
} from "@/schemas/reassonsArticle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useArticleReassons() {
  const form = useForm<reassonsArtcleValues>({
    resolver: zodResolver(reassonsArtcleSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit = (data: reassonsArtcleValues) => {
    console.log("Reasson Article Data:", data);
  };

  const handleCancle = () => {
    form.reset();
  };

  return {
    form,
    onSubmit,
    handleCancle,
  };
}
