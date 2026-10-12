import { motion } from "motion/react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import portrait from "../assets/saqlain-original.jpg";
import portraitWebp from "../assets/saqlain-original.webp";

export default function About() {
  const picRef = useRef<HTMLDivElement>(null);

  const handleSpot = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = picRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <section className="section-shell section-light" id="about">
      <div className="wrap">
        <SectionHeading title={<>About me</>} />
        <div className="about-split">
          <div className="about-pic about-spotlight" ref={picRef} onMouseMove={handleSpot}>
            <picture>
              <source srcSet={portraitWebp} type="image/webp" />
              <img className="spot-bw" src={portrait} alt="Portrait of Muhammad Saqlain" loading="lazy" />
            </picture>
            <picture aria-hidden="true">
              <source srcSet={portraitWebp} type="image/webp" />
              <img className="spot-color" src={portrait} alt="" />
            </picture>
          </div>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p>I’m Muhammad Saqlain, a CS undergraduate working toward becoming a cloud engineer. I don’t just study concepts — I build small projects that force me to understand how systems actually work, from Python automation scripts and Windows desktop applications to Linux labs and cloud fundamentals.</p>
            <p>I use AI tools to speed up prototyping, then review, test, and debug everything myself. The AI suggests — I decide. Every line that ships is something I understand.</p>
            <p>My current focus is the cloud engineering toolkit: Linux, networking, Python, and AWS. Along the way I’ve built PhishGuard (a file-intelligence toolkit), desktop apps in C#/.NET, and performed passive security assessments of live web applications.</p>
            <p><strong>Every project makes me better — and I’m just getting started.</strong></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
