"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import useCreateArticle from "@/hooks/useCreateArticle";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { RichEditor } from "./tiptap/simple/RichEditor";
import {
  Building2,
  Code,
  HeartHandshake,
  Landmark,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CreateArticleForm() {
  const { form, handleSubmit, isLoading } = useCreateArticle();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnile"
          render={({ field }) => {
            const [preview, setPreview] = useState<string | null>(null);
            const inputRef = useRef<HTMLInputElement | null>(null);
            return (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>

                {preview && (
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-fit cursor-pointer"
                      onClick={() => {
                        field.onChange(null);
                        setPreview(null);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                      <span>Remove Thumbnail</span>
                    </Button>
                  </div>
                )}

                <FormDescription>
                  Upload thumbnail image for your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                The main content of your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full cursor-pointer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Business">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" />
                      <p>Business</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Technology">
                    <div className="flex items-center gap-2">
                      <Code className="size-4" />
                      <p>Technology</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Health">
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="size-4" />
                      <p>Health</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Politics">
                    <div className="flex items-center gap-2">
                      <Landmark className="size-4" />
                      <p>Politics</p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Categories related to your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant={"outline"}
            className="cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
