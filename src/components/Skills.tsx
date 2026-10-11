import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import SectionHeading from "./SectionHeading";
import { FaGlobe } from "react-icons/fa"; // only for "Networking" — no brand logo exists for it
import { skills, type Skill } from "../data/portfolio";

// Official brand logos, bundled locally (devicons) so they never depend on a CDN.
import pythonLogo from "../assets/icons/python.svg";
import csharpLogo from "../assets/icons/csharp.svg";
import cplusplusLogo from "../assets/icons/cplusplus.svg";
import sqlserverLogo from "../assets/icons/sqlserver.svg";
import bashLogo from "../assets/icons/bash.svg";
import html5Logo from "../assets/icons/html5.svg";
import css3Logo from "../assets/icons/css3.svg";
import linuxLogo from "../assets/icons/linux.svg";
import gitLogo from "../assets/icons/git.svg";
import dotnetLogo from "../assets/icons/dotnet.svg";
import vscodeLogo from "../assets/icons/vscode.svg";
import awsLogo from "../assets/icons/aws.svg";

const categories = ["All", "Comfortable", "Working knowledge", "Learning now"] as const;

// Maps each skill's icon key (from portfolio.ts) to its official logo file.
// "htmlcss" and "network" are special-cased in SkillIcon below.
const skillLogos: Record<string, string> = {
  python: pythonLogo,
  csharp: csharpLogo,
  cplusplus: cplusplusLogo,
  sqlserver: sqlserverLogo,
  bash: bashLogo,
  linux: linuxLogo,
  git: gitLogo,
  dotnet: dotnetLogo,
  vscode: vscodeLogo,
  aws: awsLogo,
};

/**
 * Returns the logo for a skill.
 * Kept as a plain helper (not inline JSX logic) so the render below stays readable.
 * Logos are decorative — the skill name is printed right below as the heading.
 */
function SkillIcon({ icon }: { icon: Skill["icon"] }) {
  if (icon === "htmlcss") {
    return (
      <span className="html-css-logos">
        <img src={html5Logo} alt="" width={20} height={26} loading="lazy" />
        <img src={css3Logo} alt="" width={20} height={26} loading="lazy" />
      </span>
    );
  }
  if (icon === "network") {
    return <FaGlobe aria-hidden="true" />;
  }
  const src = skillLogos[icon];
  return src ? <img src={src} alt="" width={26} height={26} loading="lazy" /> : null;
}

export default function Skills() {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");
  const reduce = useReducedMotion();
  const visible = skills.filter((skill) => selected === "All" || skill.category === selected);

  return (
    <section className="section-shell section-dark" id="skills">
      <div className="wrap">
        <SectionHeading eyebrow="Tools & technologies" title={<>Skills</>} description="Grouped by how well I know them." />
        <div className="skill-toolbar reveal">
          <div className="filter-tabs" role="tablist" aria-label="Filter skills">
            {categories.map((category) => (
              <button key={category} role="tab" aria-selected={selected === category} className={selected === category ? "filter-tab selected" : "filter-tab"} onClick={() => setSelected(category)}>{category}</button>
            ))}
          </div>
          <span className="skill-count">{String(visible.length).padStart(2, "0")} technologies / topics</span>
        </div>
        <motion.div layout={!reduce} className="skills-grid" transition={reduce ? undefined : { type: "spring", stiffness: 350, damping: 32 }}>
          <AnimatePresence mode="popLayout">
            {visible.map((skill, index) => (
              <motion.article className="skill-card" key={skill.name} layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 400, damping: 30, delay: Math.min(index * 0.02, 0.12) }}>
                <span className={`skill-mark skill-mark-${skill.icon}`} aria-hidden="true">
                  <SkillIcon icon={skill.icon} />
                </span>
                <span className="skill-card-body">
                  <h3>{skill.name}</h3>
                  <p>{skill.detail}</p>
                  <span className="skill-badge" style={{ visibility: skill.category === "Learning now" ? "visible" : "hidden" }} aria-hidden={skill.category !== "Learning now"}>
                    <i className="dot" aria-hidden="true" />Learning
                  </span>
                </span>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
