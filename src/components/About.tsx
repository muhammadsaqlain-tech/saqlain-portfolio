import { motion } from "motion/react";
import { FiCode, FiTerminal, FiShield, FiTarget, FiDownload } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/portfolio";

const focus = [
  { icon: <FiTerminal />, title: "Linux & scripting", text: "Building confidence with the command line and small automation scripts." },
  { icon: <FiShield />, title: "Security fundamentals", text: "Learning to analyze carefully, document findings, and avoid unsupported claims." },
  { icon: <FiCode />, title: "Practical projects", text: "Turning coursework and curiosity into tools people can inspect and test." },
];

export default function About() {
  return (
    <section className="section-shell section-light" id="about">
      <div className="wrap">
        <SectionHeading eyebrow="A little about me" title={<>Curiosity, consistency, <em>real work.</em></>} description="I’m an undergraduate student growing my technical skills one project and one concept at a time." />
        <div className="about-layout">
          <motion.div className="about-story reveal" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <span className="story-index">01 — THE APPROACH</span>
            <h3>Learn the fundamentals.<br /><span>Build things that work.</span></h3>
            <p>I’m Muhammad Saqlain, an undergraduate student interested in Linux, Python, IT support, and cloud security. I prefer practical learning: make something, test it, document the limitations, and improve it.</p>
            <p>My project work includes PhishGuard, a C#/.NET restaurant POS application, and passive security assessments. I try to be clear about what I know, what I have built, and what I am still learning.</p>
            <div className="story-note"><FiTarget /><span><strong>Current goal</strong> — find an opportunity to learn, contribute, and grow through real technical work.</span></div>
            <a className="button button-secondary resume-button" href={profile.resume} download="Muhammad-Saqlain-Resume.pdf"><FiDownload /> Download resume</a>
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
