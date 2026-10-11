import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import portrait from "../assets/saqlain-original.jpg";

export default function About() {
  return (
    <section className="section-shell section-light" id="about">
      <div className="wrap">
        <SectionHeading title={<>About me</>} />
        <div className="about-split">
          <div className="about-pic">
            <img src={portrait} alt="Portrait of Muhammad Saqlain" loading="lazy" />
          </div>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p>I’m Muhammad Saqlain, a CS undergraduate working toward becoming a cloud engineer. I don’t just study concepts — I build small projects that force me to understand how systems actually work, from Python automation scripts and Windows desktop applications to Linux labs and cloud fundamentals.</p>
            <p>I’m a vibe coder too. I use AI tools to prototype faster, explore ideas, and learn smarter — but I verify everything myself. The AI suggests, I decide. Every line that ships is something I understand.</p>
            <p>My current focus is the cloud engineering toolkit: Linux, networking, Python, and AWS. Along the way I’ve built PhishGuard (a file-intelligence toolkit), desktop apps in C#/.NET, and performed passive security assessments of live web applications.</p>
            <p><strong>Every project makes me better — and I’m just getting started.</strong></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
