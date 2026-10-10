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
  category: "Languages" | "Tools & Platforms" | "Currently Learning";
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
  role: "Linux & Python Learner · Aspiring IT Support / Cloud Security Trainee",
  email: "muhammadsaqlain4787@gmail.com",
  location: "Faisalabad, Pakistan",
  github: "",
  linkedin: "https://linkedin.com/in/muhammadsaqlain-tech",
  availability: "Available for remote internships",
  resume: "/saqlain-resume.pdf", // real resume, served from public/ — update the file there to change it
};

export type Certification = {
  issuer: string;
  title: string;
  year: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    issuer: "Google",
    title: "Technical Support Fundamentals",
    year: "2026",
    url: "https://coursera.org/verify/YG0T0H0NZ019",
  },
  {
    issuer: "Johns Hopkins University",
    title: "HTML, CSS & JavaScript for Web Developers",
    year: "2026",
    url: "https://coursera.org/verify/5JKNPKEJ7MOV",
  },
];

export const skills: Skill[] = [
  { name: "Python", detail: "Scripting", category: "Languages", icon: "python" },
  { name: "C#", detail: ".NET / WinForms", category: "Languages", icon: "csharp" },
  { name: "C++", detail: "Fundamentals", category: "Languages", icon: "cplusplus" },
  { name: "SQL", detail: "Queries / SQL Server", category: "Languages", icon: "sqlserver" },
  { name: "Bash", detail: "Basics", category: "Languages", icon: "bash" },
  { name: "HTML / CSS", detail: "Fundamentals", category: "Languages", icon: "htmlcss" },
  { name: "Linux", detail: "Fundamentals", category: "Tools & Platforms", icon: "linux" },
  { name: "Git", detail: "Version control", category: "Tools & Platforms", icon: "git" },
  { name: ".NET 8", detail: "Windows Forms", category: "Tools & Platforms", icon: "dotnet" },
  { name: "SQL Server", detail: "Databases", category: "Tools & Platforms", icon: "sqlserver" },
  { name: "VS Code", detail: "Editor", category: "Tools & Platforms", icon: "vscode" },
  { name: "AWS", detail: "SAA theory · in progress", category: "Currently Learning", icon: "aws" },
  { name: "Networking", detail: "Basics · in progress", category: "Currently Learning", icon: "network" },
];

export const projects: Project[] = [
  {
    number: "01",
    name: "PhishGuard",
    description:
      "A static file-intelligence toolkit that computes SHA-256, MD5 and SHA-1 hashes, identifies true file types by magic-byte signature rather than extension, and surfaces threat indicators inside PDF documents. Reports only what it can verify — findings export as a PDF analyst report with a QR verification code.",
    tags: ["Python", "JavaScript", "Static Analysis", "PDF Reports"],
    note: "Featured project · In progress",
    featured: true,
  },
  {
    number: "02",
    name: "FastFoodPOS",
    description:
      "Windows restaurant POS and management app — order billing, menu and inventory tracking, and sales reporting on a SQL Server backend.",
    tags: ["C#", ".NET 8", "WinForms", "SQL Server"],
    visual: "pos",
  },
  {
    number: "03",
    name: "Student Management System",
    description:
      "Database-backed system for student records, course enrolment and results — full CRUD workflows and tabular reporting.",
    tags: ["C#", ".NET WinForms", "SQL Server"],
    visual: "student",
  },
  {
    number: "04",
    name: "Web Application Security Assessments",
    description:
      "Authorized, passive assessments of live web apps — stack enumeration, security header and HTTPS findings, plus remediation reports.",
    tags: ["Reconnaissance", "Report Writing", "Remediation"],
    note: "Authorized, passive assessment work",
    visual: "audit",
  },
  {
    number: "05",
    name: "Personal Finance Management System",
    description:
      "Income and expense tracker with category-wise budgeting, monthly summaries, and spending reports.",
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
    organization: "Linux · Python · AWS theory · networking",
    period: "Ongoing",
    status: "In progress",
    detail: "Developing a foundation for IT support and cloud security roles.",
  },
];
