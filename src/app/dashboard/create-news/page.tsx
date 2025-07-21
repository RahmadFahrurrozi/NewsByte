import { Form } from "@/components/ui/form";
import useCreateNews from "../hooks/useCreateNews";

export default function CreateNews() {
  return (
    <section className="pt-6 flex flex-col min-h-screen">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Create News</h1>
        <p className="text-gray-500">
          Create your news article by filling out the form below.
        </p>
      </div>
    </section>
  );
}
