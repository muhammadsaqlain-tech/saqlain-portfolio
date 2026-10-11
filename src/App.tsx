import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <Marquee />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
      {!reduceMotion && <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />}
    </>
  );
}
