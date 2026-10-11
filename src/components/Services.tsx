import { motion } from "motion/react";
import { FiCode, FiTool, FiShield, FiLayout, FiMonitor } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { services } from "../data/portfolio";

const serviceIcons: Record<string, React.ReactNode> = {
  python: <FiCode />,
  support: <FiTool />,
  desktop: <FiMonitor />,
  shield: <FiShield />,
  web: <FiLayout />,
};

export default function Services() {
  return (
    <section className="section-shell" id="services">
      <div className="wrap">
        <SectionHeading
          eyebrow="What I offer"
          title={<>What I can help with</>}
          description="Practical help for small teams and individuals."
        />
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              className="service-card reveal"
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <span className="service-icon" aria-hidden="true">{serviceIcons[service.icon]}</span>
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
