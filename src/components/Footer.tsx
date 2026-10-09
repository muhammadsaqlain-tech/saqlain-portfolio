import { FiArrowUp } from "react-icons/fi";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">MS<span>.</span></span><span className="brand-name">Muhammad Saqlain<span className="brand-dot">/</span></span></a>
        <p className="footer-location">Jaranwala, Pakistan · Open to remote</p>
        <div className="footer-right"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home" aria-label="Back to top"><FiArrowUp /></a></div>
      </div>
    </footer>
  );
}
