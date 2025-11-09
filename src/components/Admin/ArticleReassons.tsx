"use client";

import useArticleReassons from "@/hooks/useReassonsArticle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Book,
  MessageCircleMore,
  Sparkles,
  Loader2,
} from "lucide-react";
import { RichEditor } from "../tiptap/simple/RichEditor";

interface ArticleReassonsProps {
  articleId: string;
}

export default function ArticleReassons({ articleId }: ArticleReassonsProps) {
  const { form, handleCancle, onSubmit, isLoading } =
    useArticleReassons(articleId);

  if (!articleId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Article</h2>
          <p className="text-muted-foreground mb-4">
            Article ID is missing. Please go back to the articles list.
          </p>
          <Button onClick={handleCancle}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 sm:gap-0 items-center sm:flex-row p-4 sm:p-6 lg:p-8">
      <div className="relative w-full sm:max-w-1/2 h-full flex flex-col items-center justify-start text-center px-4">
        {/* Centered Gradient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[200px] opacity-35 z-0"
          style={{
            background: `radial-gradient(circle at center, #8FFFB0 0%, transparent 70%)`,
          }}
        />

        {/* Hero Text */}
        <div className="relative z-10 mb-6">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Voice Matters
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-md mx-auto">
            Every piece of feedback helps shape better content be part of the
            improvement.
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="relative z-10 max-w-md w-full">
          <DotLottieReact
            src="/Share.lottie"
            className="w-full"
            loop
            autoplay
          />
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 mt-8 space-y-3 text-left">
          <div className="flex items-center gap-3 bg-black/10 dark:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            <MessageCircleMore className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Give meaningful and honest reviews
            </p>
          </div>
          <div className="flex items-center gap-3 bg-black/10 dark:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            <Sparkles className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Help authors grow with your insights
            </p>
          </div>
          <div className="flex items-center gap-3 bg-black/10 dark:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            <Book className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Contribute to a culture of excellence
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:max-w-1/2">
        <div className="mb-12">
          <div className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Reject Article #{articleId.slice(0, 8)}...
              </span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Share comprehensive feedback to elevate article quality and deliver
            exceptional value to authors
          </p>
        </div>

        <Card className="glass-effect glow-accent border-0 overflow-hidden">
          {/* Gradient decorative top border */}
          <div className="h-1 rounded-full mx-8 bg-gradient-to-r from-slate-500 via-accent to-secondary" />

          <CardHeader className="pb-2">
            <div className="space-y-3">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Rejection Feedback
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Provide detailed, constructive feedback that matters
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-6 sm:px-8 pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-foreground mb-2.5 block">
                        Reason Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
                          placeholder="e.g., Insufficient Research, Poor Structure..."
                          className="h-12 bg-white/50 dark:bg-white/5 border-border focus:border-primary focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-foreground mb-2.5 block">
                        Detailed Explanation
                      </FormLabel>
                      <FormControl>
                        <RichEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancle}
                    disabled={isLoading}
                    className="flex-1 h-12 border-border text-foreground hover:bg-muted/50 transition-all duration-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Rejecting Article...
                      </>
                    ) : (
                      "Reject Article"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            ⚠️ This action cannot be undone. The article will be rejected and
            the author will receive your feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
