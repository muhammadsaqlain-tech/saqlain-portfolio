/**
 * portfolio.ts — the single source of truth for all personal content.
 *
 * Everything public about Saqlain (name, email, links, skills, projects,
 * journey) lives here and ONLY here. Components just render it; they never
 * hard-code personal details. To update the site, edit this file and rebuild.
 *
 * Honesty rules for this file:
 * - List only skills Saqlain can actually discuss or demonstrate.
 * - Things still being learned go under "Currently Learning", never as expertise.
 * - No invented stats, testimonials, clients, or metrics.
 * - Leave github/linkedin as "" (empty) to hide them instead of linking nowhere.
 */

export type Skill = {
  name: string;
  detail: string;
  category: "Comfortable" | "Learning now";
  icon: string;
};

export type Project = {
  number: string;
  name: string;
  description: string;
  tags: string[];
  note?: string;
  featured?: boolean;
  href?: string;
  // Picks the decorative cover art for the card. Purely illustrative —
  // never a fake screenshot. Keep the set small and intentional.
  visual?: "pos" | "audit" | "sites" | "student" | "finance";
};

export const profile = {
  name: "Muhammad Saqlain",
  firstName: "Muhammad",
  lastName: "Saqlain",
  role: "Aspiring Cloud Engineer",
  email: "muhammadsaqlain4787@gmail.com",
  location: "Faisalabad, Pakistan",
  github: "https://github.com/muhammadsaqlain-tech",
  linkedin: "https://linkedin.com/in/muhammadsaqlain-tech",
  availability: "Available for remote internships",
  resume: "/saqlain-resume.pdf", // real resume, served from public/ — update the file there to change it
};

export type Certification = {
  issuer: string;
  title: string;
  year: string;
  url: string;
  credentialId: string;
};

export const certifications: Certification[] = [
  {
    issuer: "Google",
    title: "Technical Support Fundamentals",
    year: "2026",
    url: "https://coursera.org/verify/YG0T0H0NZ019",
    credentialId: "YG0T0H0NZ019",
  },
  {
    issuer: "Johns Hopkins University",
    title: "HTML, CSS & JavaScript for Web Developers",
    year: "2026",
    url: "https://coursera.org/verify/5JKNPKEJN7OV",
    credentialId: "5JKNPKEJN7OV",
  },
];

export type Service = {
  title: string;
  detail: string;
  icon: string;
};

export const skills: Skill[] = [
  { name: "Python", detail: "Scripting", category: "Comfortable", icon: "python" },
  { name: "C#", detail: ".NET / WinForms", category: "Comfortable", icon: "csharp" },
  { name: "SQL", detail: "Queries", category: "Comfortable", icon: "sqlserver" },
  { name: "HTML / CSS", detail: "Fundamentals", category: "Comfortable", icon: "htmlcss" },
  { name: "Git", detail: "Version control", category: "Comfortable", icon: "git" },
  { name: "Linux", detail: "Fundamentals", category: "Comfortable", icon: "linux" },
  { name: "AWS", detail: "SAA theory", category: "Learning now", icon: "aws" },
  { name: "Networking", detail: "CCNA", category: "Learning now", icon: "network" },
];

export const projects: Project[] = [
  {
    number: "01",
    name: "PhishGuard",
    description:
      "I built a static file-intelligence toolkit. It shows SHA-256, MD5 and SHA-1 hashes, real file type, and PDF red flags. It never runs the file. Findings export as a PDF analyst report with a QR verification code.",
    tags: ["Python", "JavaScript", "Static Analysis", "PDF Reports"],
    note: "Featured project · In progress",
    featured: true,
  },
  {
    number: "02",
    name: "FastFoodPOS",
    description:
      "I built a Windows restaurant POS and management app. It handles order billing, menu and inventory tracking, and sales reporting on a SQL Server backend.",
    tags: ["C#", ".NET 8", "WinForms", "SQL Server"],
    visual: "pos",
  },
  {
    number: "03",
    name: "Student Management System",
    description:
      "I built a student records system with course enrolment, attendance, marks and results. XML-based storage, full CRUD workflows and tabular reporting.",
    tags: ["C#", ".NET WinForms", "XML"],
    visual: "student",
    href: "https://github.com/muhammadsaqlain-tech/student-management-system",
  },
  {
    number: "04",
    name: "Web Application Security Assessments",
    description:
      "I performed authorized, passive assessments of live web apps: stack enumeration, security header and HTTPS findings, with remediation reports.",
    tags: ["Reconnaissance", "Report Writing", "Remediation"],
    note: "Authorized, passive assessment work",
    visual: "audit",
  },
  {
    number: "05",
    name: "Personal Finance Management System",
    description:
      "I built an income and expense tracker with category-wise budgeting, monthly summaries, and spending reports.",
    tags: ["C#", ".NET WinForms", "SQL Server"],
    visual: "finance",
  },
];

export const journey = [
  {
    title: "Undergraduate student",
    organization: "University of Agriculture, Faisalabad",
    period: "2024 — Present",
    status: "Currently enrolled",
    detail: "Coursework and independent practice alongside personal projects.",
  },
  {
    title: "Personal projects",
    organization: "PhishGuard · FastFoodPOS · security assessments",
    period: "2025-2026",
    status: "Hands-on learning",
    detail: "Building, testing, documenting, and improving practical tools.",
  },
  {
    title: "Learning & development",
    organization: "AWS · Linux · networking · Python",
    period: "Ongoing",
    status: "In progress",
    detail: "Building a foundation for cloud engineering — theory, labs, and hands-on practice.",
  },
];
