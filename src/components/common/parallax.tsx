"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ParallaxProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  /** Vertical travel in px from top → bottom of scroll range. */
  offset?: number;
  className?: string;
};

export function Parallax({
  children,
  className,
  offset = 80,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
