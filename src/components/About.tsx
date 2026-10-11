import { motion } from "motion/react";
import { FiCode, FiTerminal, FiShield, FiAward, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/portfolio";

const focus = [
  { icon: <FiTerminal />, title: "Linux & scripting", text: "Building confidence with the command line and small automation scripts." },
  { icon: <FiShield />, title: "Security fundamentals", text: "Learning to analyze carefully, document findings, and avoid unsupported claims." },
  { icon: <FiCode />, title: "Practical projects", text: "Turning coursework and curiosity into tools people can inspect and test." },
];

export default function About() {
  return (
    <section className="section-shell section-light" id="about">
      <div className="wrap">
        <SectionHeading title={<>About me</>} description="I’m an undergraduate student growing my technical skills one project and one concept at a time." />
        <div className="about-layout">
          <motion.div className="about-story reveal" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <span className="story-index">01 — THE APPROACH</span>
            <h3>Build things <span>that work.</span></h3>
            <p>I’m Muhammad Saqlain, an aspiring cloud engineer and CS undergraduate. I learn by doing — labs, scripts, and small projects that teach me how systems work.</p>
            <p>My work includes PhishGuard, desktop apps in C#/.NET, and passive security assessments.</p>
            <div className="cert-list" aria-label="Certifications">
              <span className="cert-heading"><FiAward aria-hidden="true" /> Certifications</span>
              {certifications.map((cert) => (
                <a key={cert.title} className="cert-link" href={cert.url} target="_blank" rel="noopener noreferrer">
                  <span><strong>{cert.issuer}</strong> — {cert.title} <span className="cert-year">({cert.year})</span></span>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
          <div className="focus-list">
            {focus.map((item, index) => (
              <motion.article className="focus-item reveal" key={item.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}>
                <span className="focus-icon">{item.icon}</span>
                <div><span className="focus-number">0{index + 1}</span><h4>{item.title}</h4><p>{item.text}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
