import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import portrait from "../assets/saqlain-original.jpg";

type Props = {
  heroRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
};

type Rect = { x: number; y: number; w: number; h: number };

/**
 * Single shared profile image traveling Hero -> About on scroll.
 * One <img>, position: fixed. Position is a pure function of scrollY
 * (FLIP-style: measure document coords once, interpolate on scroll).
 * No per-frame measurement -> no jitter. Reverse scroll reverses it.
 */
export default function SharedPortrait({ heroRef, aboutRef }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const img = imgRef.current;
    const heroEl = heroRef.current;
    const aboutEl = aboutRef.current;
    if (!img || !heroEl || !aboutEl) return;

    let heroDoc: Rect | null = null;
    let aboutDoc: Rect | null = null;
    let raf = 0;
    let lastY = -1;

    const smooth = (t: number) => t * t * (3 - 2 * t);
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    // Measure document coords (stable — placeholders have no transforms)
    const measure = () => {
      const hr = heroEl.getBoundingClientRect();
      const ar = aboutEl.getBoundingClientRect();
      const sy = window.scrollY;
      heroDoc = { x: hr.left, y: hr.top + sy, w: hr.width, h: hr.height };
      aboutDoc = { x: ar.left, y: ar.top + sy, w: ar.width, h: ar.height };
      lastY = -1; // force repaint
    };

    const render = () => {
      raf = 0;
      if (!heroDoc || !aboutDoc) return;
      const sy = window.scrollY;
      if (sy === lastY) return;
      lastY = sy;

      const vh = window.innerHeight;
      // Travel window: about enters viewport -> about halfway up
      const s0 = aboutDoc.y - vh;
      const s1 = aboutDoc.y - vh * 0.5;
      const progress = s1 > s0 ? clamp01((sy - s0) / (s1 - s0)) : 1;
      const e = smooth(progress);

      // Arc path: y eases slightly differently + gentle upward lift mid-flight
      const arc = Math.sin(progress * Math.PI);
      const dx = heroDoc.x + (aboutDoc.x - heroDoc.x) * e;
      const dy = heroDoc.y + (aboutDoc.y - heroDoc.y) * e - arc * 40;
      // Subtle scale-up mid-flight (image "lifts" then settles)
      const lift = 1 + arc * 0.05;
      const w = (heroDoc.w + (aboutDoc.w - heroDoc.w) * e) * lift;
      const h = (heroDoc.h + (aboutDoc.h - heroDoc.h) * e) * lift;

      if (w > 4 && h > 4) {
        // fixed positioning: viewport coords = doc coords - scrollY
        img.style.transform = `translate3d(${dx.toFixed(1)}px, ${(dy - sy).toFixed(1)}px, 0)`;
        img.style.width = `${w.toFixed(1)}px`;
        img.style.height = `${h.toFixed(1)}px`;
        img.style.borderRadius = `${(20 * e).toFixed(1)}px`;
      }

      const inRange = sy < aboutDoc.y + aboutDoc.h + vh && sy > heroDoc.y - vh;
      img.style.opacity = inRange ? "1" : "0";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    // Initial measure after layout settles (fonts/images can shift layout)
    measure();
    const t1 = setTimeout(measure, 500);
    const t2 = setTimeout(measure, 1500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    onScroll();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, heroRef, aboutRef]);

  if (reduce) return null;

  return (
    <img
      ref={imgRef}
      src={portrait}
      alt="Portrait of Muhammad Saqlain"
      className="shared-portrait"
      draggable={false}
    />
  );
}
