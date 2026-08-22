"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const interactiveSelector =
  "a, button, summary, label, [role='button'], [role='tab'], [data-cursor='action']";
const editableSelector =
  "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const trailX = useSpring(pointerX, {
    stiffness: 460,
    damping: 34,
    mass: 0.55,
  });
  const trailY = useSpring(pointerY, {
    stiffness: 460,
    damping: 34,
    mass: 0.55,
  });

  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function updateVisible(next: boolean) {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    }

    function updateInteractive(next: boolean) {
      if (interactiveRef.current === next) return;
      interactiveRef.current = next;
      setInteractive(next);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      const element = event.target instanceof Element ? event.target : null;
      const editable = Boolean(element?.closest(editableSelector));

      updateVisible(!editable);
      updateInteractive(
        !editable && Boolean(element?.closest(interactiveSelector)),
      );
    }

    function onPointerLeave() {
      updateVisible(false);
      setPressed(false);
    }

    function onPointerDown() {
      setPressed(true);
    }

    function onPointerUp() {
      setPressed(false);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="custom-cursor-layer pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute top-0 left-0 -mt-5 -ml-5 size-10"
        style={{ x: trailX, y: trailY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.9 : interactive ? 1.14 : 1,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div
          className={
            interactive
              ? "size-full rounded-full border border-accent bg-accent-soft/55 shadow-[0_8px_20px_-10px_rgba(249,171,108,0.75)] transition-colors"
              : "size-full rounded-full border border-brand/70 bg-brand-soft/25 shadow-[0_8px_20px_-12px_rgba(13,128,175,0.65)] transition-colors"
          }
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 -mt-2.5 -ml-2.5 size-5"
        style={{ x: pointerX, y: pointerY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.78 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <span className="inline-flex size-full items-center justify-center rounded-full border border-white bg-white shadow-[0_4px_14px_-4px_rgba(14,14,15,0.45)]">
          <Image
            src="/brand/heart-icon.svg"
            alt=""
            width={14}
            height={13}
            className="h-3.5 w-auto"
          />
        </span>
      </motion.div>
    </div>
  );
}
