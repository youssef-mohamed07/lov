"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { scaleVariants, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={scaleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...transition.base, delay }}
    >
      {children}
    </motion.div>
  );
}
