"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Zap, Globe, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleUp: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-transparent px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          <Badge
            variant={"outline"}
            className="px-4 py-2 text-sm font-semibold border border-neutral-300 dark:border-neutral-700"
          >
            <Zap className="w-4 h-4 mr-2 text-green-500" />
            WELCOME TO NEWSBYTE
          </Badge>
        </motion.div>

        {/* Main Title with Stagger Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              NewsByte
            </span>
            <br />
          </motion.h1>
          <motion.span
            variants={itemVariants}
            className="text-foreground text-4xl font-semibold"
          >
            "Read. Discover. Engage. Your Daily Source of Insight."
          </motion.span>
        </motion.div>

        {/* Subtitle with Slide Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideInLeft}
          className="mb-8 mt-6"
        >
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Discover curated news stories that{" "}
            <span className="font-semibold text-primary">
              enlighten, engage, and inspire
            </span>
            . Your daily dose of meaningful content from around the globe.
          </p>
        </motion.div>

        {/* Features Icons */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex justify-center gap-8 mb-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Zap className="w-4 h-4 text-primary" />
            Real-time Updates
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Globe className="w-4 h-4 text-primary" />
            Global Coverage
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Curated Content
          </motion.div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100px" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-12 rounded-full"
        />

        {/* CTA Buttons with Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full font-semibold text-lg"
            >
              Browse Articles
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </div>
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
