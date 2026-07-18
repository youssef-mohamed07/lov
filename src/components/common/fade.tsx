"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import {
  fadeUpVariants,
  fadeVariants,
  revealMap,
  staggerContainer,
  transition,
  type RevealVariant,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
};

export function Fade({
  children,
  className,
  delay = 0,
  immediate = false,
  ...props
}: FadeProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={fadeVariants}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
      transition={{ ...transition.base, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeStaggerProps = {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
};

export function FadeStagger({
  children,
  className,
  immediate = false,
}: FadeStaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
    >
      {children}
    </motion.div>
  );
}

export function FadeItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={revealMap[variant] ?? fadeUpVariants}
      transition={transition.base}
    >
      {children}
    </motion.div>
  );
}
