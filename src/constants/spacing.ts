/**
 * Spacing scale (rem). Mirrors CSS tokens in globals.css.
 * Use these for JS-driven layout math; prefer Tailwind/CSS tokens in markup.
 */
export const space = {
  0: "0",
  1: "0.25rem", // 4
  2: "0.5rem", // 8
  3: "0.75rem", // 12
  4: "1rem", // 16
  5: "1.25rem", // 20
  6: "1.5rem", // 24
  8: "2rem", // 32
  10: "2.5rem", // 40
  12: "3rem", // 48
  16: "4rem", // 64
  20: "5rem", // 80
  24: "6rem", // 96
  32: "8rem", // 128
} as const;

export const sectionSpace = {
  sm: "var(--section-space-sm)",
  md: "var(--section-space-md)",
  lg: "var(--section-space-lg)",
} as const;

export const containerSize = {
  sm: "40rem", // 640
  md: "48rem", // 768
  lg: "72rem", // 1152
  xl: "80rem", // 1280
} as const;

export const gridCols = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  12: 12,
} as const;

export type SpaceToken = keyof typeof space;
export type SectionSpace = keyof typeof sectionSpace;
export type ContainerSize = keyof typeof containerSize;
