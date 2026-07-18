"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { revealMap, transition, type RevealVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = revealMap[variant];

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ ...transition.base, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
