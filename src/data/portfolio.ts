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
  visual?: "pos" | "audit" | "sites";
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
      "A static phishing-file analyzer for inspecting suspicious files without executing them. Includes file hashes, magic-byte sniffing, PDF indicators, and hash lookups through MalwareBazaar.",
    tags: ["Python", "Static Analysis", "MalwareBazaar API", "PDF Reports"],
    note: "Featured project",
    featured: true,
  },
  {
    number: "02",
    name: "FastFoodPOS",
    description:
      "A native Windows restaurant point-of-sale and management application for order taking, billing, and menu management.",
    tags: ["C#", ".NET 8", "WinForms", "SQL Server"],
    visual: "pos",
  },
  {
    number: "03",
    name: "Passive Security Audits",
    description:
      "Read-only, unauthenticated assessments of  website, documenting technology fingerprints, severity-rated observations, and remediation notes.",
    tags: ["Reconnaissance", "Report Writing", "Remediation"],
    note: "Authorized, passive assessment work",
    visual: "audit",
  },
  {
    number: "04",
    name: "Editorial Portfolio Sites",
    description:
      "Responsive portfolio website experiments focused on thoughtful layout, accessible interactions, and honest presentation of real work.",
    tags: ["HTML", "CSS", "Responsive UI"],
    visual: "sites",
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
