import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Magnetic wrapper — a call-to-action leans a few pixels toward the cursor
 * while hovering, then springs back. Subtle on purpose: felt, not seen.
 * Disabled automatically for users who prefer reduced motion.
 */
export default function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  function handleMove(event: MouseEvent) {
    if (reduce || !frame.current) return;
    const box = frame.current.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * 0.16);
    y.set((event.clientY - (box.top + box.height / 2)) * 0.16);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={frame}
      className="magnetic"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}
