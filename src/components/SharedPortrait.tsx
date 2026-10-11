import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import portrait from "../assets/saqlain-original.jpg";

type Props = {
  heroRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Single shared profile image that travels from Hero to About on scroll.
 * One <img> element, position: fixed, driven by scroll via rAF.
 * Tracks live placeholder rects in Hero and About, interpolating
 * position/size with smoothstep easing. Reverse scroll reverses it.
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

    let raf = 0;
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const update = () => {
      const hr = heroEl.getBoundingClientRect();
      const ar = aboutEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 while About is below viewport, 1 once About is well into view
      const progress = clamp01((vh - ar.top) / (vh - vh * 0.35));
      const e = smooth(progress);

      const hx = hr.left + hr.width / 2;
      const hy = hr.top + hr.height / 2;
      const ax = ar.left + ar.width / 2;
      const ay = ar.top + ar.height / 2;

      const cx = hx + (ax - hx) * e;
      const cy = hy + (ay - hy) * e;
      const w = hr.width + (ar.width - hr.width) * e;
      const h = hr.height + (ar.height - hr.height) * e;

      // Guard against zero-size placeholders (not yet laid out)
      if (w > 4 && h > 4) {
        img.style.transform = `translate3d(${(cx - w / 2).toFixed(1)}px, ${(cy - h / 2).toFixed(1)}px, 0)`;
        img.style.width = `${w.toFixed(1)}px`;
        img.style.height = `${h.toFixed(1)}px`;
        img.style.borderRadius = `${(20 * e).toFixed(1)}px`;
      }

      // Hide when far outside the relevant scroll range (perf + no stray pixels)
      const inRange = ar.top < vh * 1.3 && hr.bottom > -vh * 0.3;
      img.style.opacity = inRange ? "1" : "0";

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [reduce, heroRef, aboutRef]);

  // Reduced motion: no traveling image; Hero renders a static <img> instead.
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
