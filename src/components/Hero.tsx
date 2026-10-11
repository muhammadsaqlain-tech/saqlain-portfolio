import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowDownRight, FiArrowUpRight, FiDownload, FiMapPin, FiTerminal } from "react-icons/fi";
import portrait from "../assets/saqlain-original.jpg";
import { profile } from "../data/portfolio";
import Magnetic from "./Magnetic";

// Easing that feels hand-tuned: fast start, soft landing.
const EASE = [0.2, 0.7, 0.2, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Gentle parallax: the portrait drifts slightly slower than the scroll.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section className="hero section-shell" id="home" ref={sectionRef}>
      {/* Ambient colour fields drifting behind the content */}
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <motion.p className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>UNDERGRADUATE STUDENT</motion.p>
          {/* Masked line reveals: each line slides up from behind an overflow mask */}
          <h1 className="hero-title">
            <span className="mask">
              <motion.span className="mask-inner" initial={{ y: "112%" }} animate={{ y: "0%" }} transition={{ duration: 0.8, delay: 0.14, ease: EASE }}>
                Muhammad
              </motion.span>
            </span>
            <span className="mask">
              <motion.span className="mask-inner hero-accent" initial={{ y: "112%" }} animate={{ y: "0%" }} transition={{ duration: 0.8, delay: 0.24, ease: EASE }}>
                Saqlain.
              </motion.span>
            </span>
          </h1>
          <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }}>
            Aspiring cloud engineer <i>·</i> building practical skills
          </motion.p>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.55 }}>
            I build practical tools, learn by solving real problems, and document what I discover. My current focus is cloud fundamentals — AWS, Linux, networking — alongside Python and practical projects.
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Magnetic><a className="button button-primary" href="#projects">Explore my work <FiArrowUpRight /></a></Magnetic>
            <Magnetic><a className="button button-secondary" href="#contact">Get in touch <FiArrowDownRight /></a></Magnetic>
            <Magnetic><a className="button button-secondary" href={profile.resume} download="Muhammad-Saqlain-Resume.pdf">Resume <FiDownload /></a></Magnetic>
          </motion.div>
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}>
            <span><FiMapPin /> {profile.location}</span>
            <span><FiTerminal /> Learning in public</span>
          </motion.div>
        </div>
        <motion.div className="hero-visual" style={{ y: visualY }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
          <div className="portrait-halo" />
          <div className="portrait-grid" aria-hidden="true" />
          {/* Portrait: plain frame with a single entrance animation (no looping float — keeps it calm) */}
          <div className="portrait-frame">
            <img src={portrait} alt="Portrait of Muhammad Saqlain" fetchPriority="high" />
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </motion.div>
      </div>
      <div className="hero-bottom wrap"><span>01 / INTRODUCTION</span><span>Scroll to explore <FiArrowDownRight /></span></div>
    </section>
  );
}
