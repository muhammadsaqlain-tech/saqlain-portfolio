import { motion } from "motion/react";
import { FiAward, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/portfolio";

export default function Certifications() {
  return (
    <section className="section-shell" id="certifications">
      <div className="wrap">
        <SectionHeading title={<>Certifications</>} description="Verified credentials — click to check each one." />
        <div className="certs-grid">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              className="cert-card reveal"
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <span className="cert-card-icon"><FiAward aria-hidden="true" /></span>
              <div>
                <strong>{cert.issuer}</strong>
                <span>{cert.title} ({cert.year})</span>
              </div>
              <FiArrowUpRight className="cert-card-arrow" aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
