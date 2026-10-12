import { Suspense, lazy, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// Below-fold sections lazy-loaded: less JS blocks the first paint (better TBT/SI)
const Marquee = lazy(() => import("./components/Marquee"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Certifications = lazy(() => import("./components/Certifications"));
const Projects = lazy(() => import("./components/Projects"));
const Journey = lazy(() => import("./components/Journey"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("in-view"));
      return () => document.documentElement.classList.remove("motion-ready");
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [reduceMotion]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <Marquee />
          <About />
          <Skills />
          <Certifications />
          <Projects />
          <Journey />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {!reduceMotion && <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />}
    </>
  );
}
