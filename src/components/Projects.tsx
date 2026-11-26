import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { FiArrowRight, FiArrowUpRight, FiLayout, FiShield, FiShoppingCart, FiBookOpen, FiPieChart } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { profile, projects, type Project } from "../data/portfolio";

// Cover-art icon per project visual key (from portfolio.ts). Decorative only.
const visualIcons = {
  pos: <FiShoppingCart />,
  audit: <FiShield />,
  sites: <FiLayout />,
  student: <FiBookOpen />,
  finance: <FiPieChart />,
} as const;

function useWide() {
  const query = "(min-width: 960px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

function Panel({ project, index, total }: { project: Project; index: number; total: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={project.featured ? "panel panel-featured" : "panel"}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-top">
        <span className="panel-count">{index + 1} / {total}</span>
        {project.note && <span className="panel-note">{project.note}</span>}
      </div>
      {project.visual && (
        <div className={`project-visual pv-${project.visual}`} aria-hidden="true">
          <span className="pv-icon">{visualIcons[project.visual]}</span>
        </div>
      )}
      <h3 className="panel-title">{project.name}<span className="title-period">.</span></h3>
      <div className="panel-body">
        <div>
          <p className="panel-desc">{project.description}</p>
          {project.featured && (
            <ul className="project-points">
              <li>Analyzes files without executing them.</li>
              <li>Uses hashes and file indicators as part of a static-analysis workflow.</li>
              <li>Reports uncertainty clearly when an external lookup is unavailable.</li>
            </ul>
          )}
          <p className="panel-stack">{project.tags.join("  /  ")}</p>
          {project.href && (
            <a className="panel-link" href={project.href} target="_blank" rel="noreferrer">
              Source on GitHub <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
        {project.featured && (
          <div className="terminal-card" aria-label="Illustrative PhishGuard terminal output">
            <div className="terminal-scan" aria-hidden="true" />
            <div className="terminal-top"><span className="terminal-dots"><i /><i /><i /></span><span>phishguard / scan</span><span className="terminal-status">LOCAL DEMO</span></div>
            <div className="terminal-content">
              <p><span className="terminal-prompt">$</span> phishguard scan invoice.pdf<span className="terminal-cursor" aria-hidden="true" /></p>
              <p><span className="terminal-muted">01</span> hash <b>SHA-256 calculated</b></p>
              <p><span className="terminal-muted">02</span> file <b>signature inspected</b></p>
              <p><span className="terminal-muted">03</span> pdf <b>indicators extracted</b></p>
              <div className="terminal-divider" />
              <p><span className="terminal-prompt">→</span> status <span className="terminal-warning">review required</span></p>
              <small>Illustrative interface · not a live scan</small>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const wide = useWide();
  const reduce = useReducedMotion();
  const ordered = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [wide]);

  // Vertical scroll drives the horizontal track while the section is pinned.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);
  const horizontal = wide && !reduce;

  return (
    <section
      className={horizontal ? "section-shell section-light projects projects-pinned" : "section-shell section-light projects"}
      id="projects"
      ref={section}
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="projects-sticky">
        <div className="wrap projects-head">
          <SectionHeading eyebrow="Selected work" title={<>Projects</>} description="A selection of practical work and experiments. Descriptions focus on what each project does rather than inflated claims." />
          {profile.github && (
            <a className="head-link" href={profile.github} target="_blank" rel="noreferrer">
              View all on GitHub <FiArrowRight aria-hidden="true" />
            </a>
          )}
        </div>
        <motion.div className="projects-track" ref={track} style={horizontal ? { x } : undefined}>
          {ordered.map((project, i) => (
            <Panel key={project.name} project={project} index={i} total={ordered.length} />
          ))}
        </motion.div>
        {horizontal && (
          <div className="wrap projects-foot">
            <span className="panel-hint">Scroll to explore</span>
            <span className="projects-bar"><motion.i style={{ scaleX: bar }} /></span>
          </div>
        )}
      </div>
      <div className="wrap">
        <p className="projects-footnote"><FiShield /> Security assessments are described at a high level; do not publish private findings or test systems without explicit authorization.</p>
      </div>
    </section>
  );
}
