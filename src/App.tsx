import { Suspense, lazy, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Footer from "./components/Footer";

// Lazy-load the sections below the fold; the fallback holds their space.
const Skills = lazy(() => import("./components/Skills"));
const Certifications = lazy(() => import("./components/Certifications"));
const Projects = lazy(() => import("./components/Projects"));
const Journey = lazy(() => import("./components/Journey"));
const Contact = lazy(() => import("./components/Contact"));

function SectionFallback() {
  return <div className="section-fallback" aria-hidden="true" />;
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    // Lazy sections mount later, so keep watching for new .reveal nodes too —
    // unobserved ones would stay invisible (opacity 0 until .in-view).
    const findReveals = (root: Node): HTMLElement[] => {
      const found: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.classList.contains("reveal")) found.push(root);
      if (root instanceof Element) root.querySelectorAll<HTMLElement>(".reveal").forEach((node) => found.push(node));
      return found;
    };
    if (reduceMotion || !("IntersectionObserver" in window)) {
      const showAll = (root: Node) => findReveals(root).forEach((node) => node.classList.add("in-view"));
      showAll(document);
      const mutation = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(showAll)));
      mutation.observe(document.body, { childList: true, subtree: true });
      return () => {
        mutation.disconnect();
        document.documentElement.classList.remove("motion-ready");
      };
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const watchAll = (root: Node) => findReveals(root).forEach((node) => observer.observe(node));
    watchAll(document);
    const mutation = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(watchAll)));
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutation.disconnect();
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
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Certifications /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Journey /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Footer />
      {!reduceMotion && <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />}
    </>
  );
}
