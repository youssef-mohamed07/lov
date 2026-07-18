import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

export const transition = {
  fast: { duration: 0.25, ease: easeOutExpo } satisfies Transition,
  base: { duration: 0.55, ease: easeOutExpo } satisfies Transition,
  slow: { duration: 0.8, ease: easeOutExpo } satisfies Transition,
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export type RevealVariant =
  | "fade"
  | "up"
  | "scale"
  | "fade-scale"
  | "left"
  | "right";

export const revealMap: Record<RevealVariant, Variants> = {
  fade: fadeVariants,
  up: fadeUpVariants,
  scale: scaleVariants,
  "fade-scale": fadeScaleVariants,
  left: slideLeftVariants,
  right: slideRightVariants,
};
