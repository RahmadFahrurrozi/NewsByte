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
import { Textarea } from "../ui/textarea";
import { Book, MessageCircleMore, Sparkles } from "lucide-react";

export default function ArticleReassons() {
  const { form, handleCancle, onSubmit } = useArticleReassons();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start sm:flex-row p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-1/2 flex flex-col items-center justify-center text-center px-4">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-[90px] opacity-50" />

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

      <div className="w-full max-w-1/2">
        {/* Premium Header Section */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Send Feedback
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
                Share Your Insights
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
                        Review Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter a compelling summary of your feedback..."
                          className="h-12 bg-white/50 dark:bg-white/5 border-border focus:border-primary focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300"
                          {...field}
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
                        Detailed Feedback
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Deliver specific, actionable insights and suggestions that drive meaningful improvement..."
                          className="min-h-[140px] resize-none bg-white/50 dark:bg-white/5 border-border focus:border-primary focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300"
                          {...field}
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
                    className="flex-1 h-12 border-border text-foreground hover:bg-muted/50 transition-all duration-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-secondary-foreground to-accent text-primary-foreground"
                  >
                    Submit Review
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            ✨ Your feedback empowers authors to create exceptional content
          </p>
        </div>
      </div>
    </div>
  );
}
