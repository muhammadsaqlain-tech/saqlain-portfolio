import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const categories = ["All", "Languages", "Tools & Platforms", "Currently Learning"] as const;

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
  const visible = skills.filter((skill) => selected === "All" || skill.category === selected);

  // Spotlight: each card stores the cursor position in CSS vars so a soft
  // radial glow can follow the pointer. Delegated on the grid — one listener.
  function handleSpotlight(event: MouseEvent<HTMLDivElement>) {
    const card = (event.target as HTMLElement).closest(".skill-card") as HTMLElement | null;
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  }

  return (
    <section className="section-shell section-dark" id="skills">
      <div className="wrap">
        <SectionHeading eyebrow="Tools & technologies" title={<>A growing toolkit, <em>built honestly.</em></>} description="Skills are grouped by how I use them. Topics marked as learning are works in progress, not claims of expertise." />
        <div className="skill-toolbar reveal">
          <div className="filter-tabs" role="tablist" aria-label="Filter skills">
            {categories.map((category) => (
              <button key={category} role="tab" aria-selected={selected === category} className={selected === category ? "filter-tab selected" : "filter-tab"} onClick={() => setSelected(category)}>{category}</button>
            ))}
          </div>
          <span className="skill-count">{String(visible.length).padStart(2, "0")} technologies / topics</span>
        </div>
        <motion.div layout className="skills-grid" onMouseMove={handleSpotlight}>
          <AnimatePresence mode="popLayout">
            {visible.map((skill, index) => (
              <motion.article className="skill-card" key={skill.name} layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.24, delay: Math.min(index * 0.025, 0.2) }}>
                <span className={`skill-mark skill-mark-${skill.icon}`} aria-hidden="true">
                  <SkillIcon icon={skill.icon} />
                </span>
                <span className="skill-text"><h3>{skill.name}</h3><p>{skill.detail}</p></span>
                {skill.category === "Currently Learning" && <span className="skill-state learning">Learning</span>}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
