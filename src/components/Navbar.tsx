import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Journey", "#journey"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saqlain-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const next = saved ? saved === "light" : prefersLight;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "journey", "contact"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Hide the bar while scrolling down, reveal it on scroll up.
  // Never hides while the mobile menu is open.
  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > 160 && y > last && !open);
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open ]);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem("saqlain-theme", next ? "light" : "dark");
  }

  const navLinks = (
    <>
      {links.map(([label, href]) => (
        <a
          key={href}
          href={href}
          className={active === href.slice(1) ? "nav-link active" : "nav-link"}
          onClick={() => setOpen(false)}
        >
          {label}
        </a>
      ))}
    </>
  );

  return (
    <header className={hidden ? "site-nav nav-hidden" : "site-nav"}>
      <div className="nav-inner wrap">
        <a className="brand" href="#home" aria-label="Muhammad Saqlain home">
          <span className="brand-mark">MS<span>.</span></span>
          <span className="brand-name">Muhammad Saqlain<span className="brand-dot">/</span></span>
        </a>
        <nav className="desktop-links" aria-label="Main navigation">{navLinks}</nav>
        <div className="nav-actions">
          <button className="icon-button theme-button" onClick={toggleTheme} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            {light ? <FiMoon /> : <FiSun />}
          </button>
          <a className="button button-small button-primary nav-contact" href="#contact">Let’s talk <FiArrowUpRight /></a>
          <button className="icon-button menu-button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-menu" aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}>
            {navLinks}
            <a className="button button-primary mobile-menu-cta" href="#contact" onClick={() => setOpen(false)}>Let’s talk <FiArrowUpRight /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
