import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/portfolio";

export default function Certifications() {
  return (
    <section className="section-shell certs-rows-section" id="certifications">
      <div className="wrap">
        <SectionHeading title={<>Certifications</>} description="Verified credentials — click to check each one." />
        <ul className="cert-rows">
          {certifications.map((cert, index) => (
            <motion.li
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="cert-row" href={cert.url} target="_blank" rel="noreferrer">
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-title">{cert.title}<code className="cert-id">ID: {cert.credentialId}</code></span>
                <span className="cert-year">{cert.year}</span>
                <span className="cert-arrow" aria-hidden="true"><FiArrowUpRight /></span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
