import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { FiBookOpen, FiCode, FiCompass, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { journey } from "../data/portfolio";

const icons = [<FiBookOpen />, <FiCode />, <FiCompass />];

export default function Journey() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  // The accent line draws itself as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.78", "end 0.55"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="section-shell section-dark" id="journey">
      <div className="wrap">
        <SectionHeading eyebrow="Learning path" title={<>Education and learning</>} description="An honest snapshot of education, personal projects, and the areas I’m actively learning." />
        <div className="journey-layout">
          <div className="journey-list" ref={listRef}>
            {!reduce && <motion.span className="journey-progress" style={{ scaleY: draw }} aria-hidden="true" />}
            {journey.map((item, index) => (
              <motion.article className="journey-item reveal" key={item.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}>
                <div className="journey-icon">{icons[index]}</div>
                <div className="journey-content">
                  <div className="journey-meta"><span>{item.period}</span><span className="journey-status">{item.status}</span></div>
                  <h3>{item.title}</h3><p className="journey-org">{item.organization}</p><p>{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <aside className="journey-aside reveal">
            <span className="aside-index">NEXT CHAPTER</span>
            <h3>Build a stronger foundation.</h3>
            <p>Linux, networking, scripting, and cloud fundamentals are the current priorities. The goal is to turn learning into demonstrable, well-documented work.</p>
            <a href="#contact" className="text-link">Connect about opportunities <FiArrowUpRight /></a>
            <div className="aside-decoration" aria-hidden="true">MS<span>.</span></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
