"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
  frameClassName?: string;
  /** @deprecated Zoom-on-hover removed — kept for compatibility. */
  zoomOnHover?: boolean;
  delay?: number;
};

export function MotionImage({
  className,
  frameClassName,
  delay = 0,
  alt,
  zoomOnHover: _zoomOnHover,
  ...props
}: MotionImageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden", frameClassName)}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...transition.base, delay }}
    >
      <Image alt={alt} className={cn("object-cover", className)} {...props} />
    </motion.div>
  );
}

export function FloatIn({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...transition.base, delay }}
    >
      {children}
    </motion.div>
  );
}
