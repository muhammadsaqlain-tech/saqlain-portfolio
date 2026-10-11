import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section className="section-shell section-light" id="about">
      <div className="wrap">
        <SectionHeading title={<>About me</>} description="I’m an undergraduate student growing my technical skills one project and one concept at a time." />
        <motion.div className="about-clean reveal" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <span className="story-index">01 — THE APPROACH</span>
          <h3>Build things <span>that work.</span></h3>
          <p>I’m Muhammad Saqlain, an aspiring cloud engineer and CS undergraduate. I learn by doing — labs, scripts, and small projects that teach me how systems work.</p>
          <p>I’m also a vibe coder — I use AI tools to prototype faster and learn smarter, then verify everything myself.</p>
          <p>My work includes PhishGuard, desktop apps in C#/.NET, and passive security assessments.</p>
        </motion.div>
      </div>
    </section>
  );
}
