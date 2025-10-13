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
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { RichEditor } from "./tiptap/simple/RichEditor";
import { ThumbnailUpload } from "./ThumbnailUpload";
import useEditArticle from "@/hooks/useEditArticle";
import CategoriesSelect from "./CategoriesSelect";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

export default function EditArticleForm({ articleId }: { articleId: string }) {
  const { form, onSubmit, isLoading, isError, isDataReady } = useEditArticle({
    articleId,
  });
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (isDataReady && form.formState.defaultValues) {
      const timer = setTimeout(() => {
        setIsFormReady(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isDataReady, form]);

  if (isLoading && !isDataReady) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32 ml-auto" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">Failed to load article data</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  value={field.value || ""}
                />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <div className="max-w-md w-full">
                  <ThumbnailUpload
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is the thumbnail of your article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                {isFormReady ? (
                  <RichEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                ) : (
                  <Skeleton className="h-64 w-full" />
                )}
              </FormControl>
              <FormDescription>
                This is the content of your article.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                {isFormReady ? (
                  <CategoriesSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                ) : (
                  <Skeleton className="h-10 w-full" />
                )}
              </FormControl>
              <FormDescription>
                This is the categories of your article.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center">
          <Button
            type="submit"
            variant={"outline"}
            className="cursor-pointer"
            disabled={isLoading || !isFormReady}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
