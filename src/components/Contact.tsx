import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/portfolio";

export default function Contact() {
  const hasGithub = Boolean(profile.github.trim());
  const hasLinkedin = Boolean(profile.linkedin.trim());
  const subject = encodeURIComponent("Portfolio contact — Muhammad Saqlain");
  const body = encodeURIComponent("Hi Saqlain,\n\nI’m reaching out about...");
  const mailto = `mailto:${profile.email}`;
  return (
    <section className="section-shell section-light" id="contact">
      <div className="wrap">
        <SectionHeading title={<>Contact</>} description="For internship opportunities, collaboration, or a technical conversation, email is the most reliable way to reach me." />
        <div className="contact-layout">
          <div className="contact-intro reveal">
            <span className="contact-symbol"><FiSend /></span>
            <h3>Have something in mind?</h3>
            <p>Share a little context and I’ll get back to you when I can. This button opens Gmail; this static site does not store messages.</p>
            <div className="contact-actions">
              <a className="button button-primary" href={`${mailto}?subject=${subject}&body=${body}`}>Write an email <FiArrowUpRight /></a>
              <a className="button button-secondary" href={profile.resume} target="_blank" rel="noreferrer"><FiArrowUpRight /> Resume</a>
              <a className="button button-icon" href={profile.resume} download="Muhammad-Saqlain-Resume.pdf" aria-label="Download resume"><FiDownload /></a>
            </div>
          </div>
          <div className="contact-details reveal">
            <a className="contact-detail" href={mailto}><span className="contact-detail-icon"><FiMail /></span><span><small>EMAIL</small><strong>{profile.email}</strong></span><FiArrowUpRight className="contact-detail-arrow" /></a>
            <div className="contact-detail"><span className="contact-detail-icon"><FiMapPin /></span><span><small>LOCATION</small><strong>{profile.location}</strong></span></div>
            {hasGithub && <a className="contact-detail" href={profile.github} target="_blank" rel="noreferrer"><span className="contact-detail-icon"><FiGithub /></span><span><small>GITHUB</small><strong>View repositories</strong></span><FiArrowUpRight className="contact-detail-arrow" /></a>}
            {hasLinkedin && <a className="contact-detail" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="contact-detail-icon"><FiLinkedin /></span><span><small>LINKEDIN</small><strong>Connect professionally</strong></span><FiArrowUpRight className="contact-detail-arrow" /></a>}
          </div>
        </div>
      </div>
    </section>
  );
}
