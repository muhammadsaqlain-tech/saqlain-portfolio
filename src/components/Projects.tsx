import { motion } from "motion/react";
import { FiArrowUpRight, FiLayout, FiShield, FiShoppingCart, FiBookOpen, FiPieChart } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolio";

// Cover-art icon per project visual key (from portfolio.ts). Decorative only.
const visualIcons = {
  pos: <FiShoppingCart />,
  audit: <FiShield />,
  sites: <FiLayout />,
  student: <FiBookOpen />,
  finance: <FiPieChart />,
} as const;

export default function Projects() {
  const featured = projects.find((project) => project.featured);
  const others = projects.filter((project) => !project.featured);
  return (
    <section className="section-shell section-light" id="projects">
      <div className="wrap">
        <SectionHeading eyebrow="Selected work" title={<>Projects with a <em>purpose.</em></>} description="A selection of practical work and experiments. Descriptions focus on what each project does rather than inflated claims." />
        {featured && (
          <motion.article className="featured-project reveal" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
            <div className="featured-project-copy">
              <div className="project-label"><span className="project-label-dot" /> FEATURED PROJECT <span>01 / 05</span></div>
              <h3>{featured.name}<span className="title-period">.</span></h3>
              <p>{featured.description}</p>
              <ul className="project-points">
                <li>Analyzes files without executing them.</li>
                <li>Uses hashes and file indicators as part of a static-analysis workflow.</li>
                <li>Reports uncertainty clearly when an external lookup is unavailable.</li>
              </ul>
              <div className="tag-row">{featured.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </div>
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
          </motion.article>
        )}
        <div className="project-grid">
          {others.map((project, index) => (
            <motion.article className="project-card reveal" key={project.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.07 }}>
              {/* Decorative cover art — abstract, never a fake screenshot */}
              {project.visual && (
                <div className={`project-visual pv-${project.visual}`} aria-hidden="true">
                  <span className="pv-icon">{visualIcons[project.visual]}</span>
                </div>
              )}
              <div className="project-card-top"><span className="project-number">{project.number}</span></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.note && <span className="project-note">{project.note}</span>}
              <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="project-card-bottom"><span>Personal project / study</span><span className="project-arrow" aria-hidden="true"><FiArrowUpRight /></span></div>
            </motion.article>
          ))}
        </div>
        <p className="projects-footnote"><FiShield /> Security assessments are described at a high level; do not publish private findings or test systems without explicit authorization.</p>
      </div>
    </section>
  );
}
