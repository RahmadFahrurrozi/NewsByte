"use client";

import CreateArticleForm from "@/components/CreateArticleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { WRITING_GUIDELINES, WRITING_TIPS } from "@/constants/guidelinesTips";
import { FileText } from "lucide-react";

export default function WriteArticlePage() {
  return (
    <section className="min-h-screen pb-5 px-6">
      <div className="mx-auto flex flex-col md:flex-row gap-5">
        {/* Left Side - Illustration and Info */}
        <div className="w-full md:w-2/5">
          <Card className="shadow-md rounded-2xl backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold">
                Create Amazing Content
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Share your knowledge and ideas with the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl overflow-hidden mb-6">
                <DotLottieReact src="/up-rocket.lottie" loop autoplay />
              </div>
              <Tabs defaultValue="tips" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
                  <TabsTrigger
                    value="tips"
                    className="rounded-lg data-[state=active]:shadow-sm"
                  >
                    Writing Tips
                  </TabsTrigger>
                  <TabsTrigger
                    value="guidelines"
                    className="rounded-lg data-[state=active]:shadow-sm"
                  >
                    Guidelines
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="tips"
                  className="mt-5 text-sm leading-relaxed"
                >
                  {WRITING_TIPS.map((tip, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent
                  value="guidelines"
                  className="mt-5 text-sm leading-relaxed"
                >
                  {WRITING_GUIDELINES.map((guideline, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{guideline}</span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5">
          <Card className="shadow-sm rounded-x hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 text-cyan-500">
                    {/* Icon document style */}
                    <FileText className="w-5 h-5" />
                  </span>
                  <p className="text-foreground">Write Your Article</p>
                </CardTitle>
              </div>
              <CardDescription className="mt-2">
                Start sharing your thoughts and knowledge with the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateArticleForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
