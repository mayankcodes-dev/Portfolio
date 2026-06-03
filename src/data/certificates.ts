export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  category: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  isPinned?: boolean;
}

const LOGOS = {
  linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  google: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  deeplearning: "/images/deeplearning-ai-logo.webp",
  udemy: "https://cdn.worldvectorlogo.com/logos/udemy-wordmark-1.svg",
};

export const certificates: Certificate[] = [
  {
    id: "nodejs-essential",
    title: "Node.js Essential Training",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "Backend",
    skills: ["Node.js"],
    credentialUrl: "https://www.linkedin.com/learning/certificates/e20c600fea001c246e1eccf1907e6b8950bc44573b2814525c7f3286fb9f14eb",
    isPinned: true,
  },
  {
    id: "github-copilot",
    title: "AI Pair Programming with GitHub Copilot",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "AI",
    skills: ["GitHub Copilot"],
    credentialUrl: "https://www.linkedin.com/learning/certificates/38f92b971d566853d616b8f5ed4b700dee19b8e2ab33ec9b75845710d316094a",
    isPinned: true,
  },
  {
    id: "mongodb-schema",
    title: "MongoDB Schema Design Patterns & Anti-patterns",
    issuer: "MongoDB",
    issuerLogo: LOGOS.mongodb,
    date: "Apr 2026",
    category: "Database",
    credentialId: "2330876b-7781-4234-a8ea-7190a71e13af",
    skills: ["Data Modeling", "MongoDB"],
    credentialUrl: "https://www.credly.com/badges/2330876b-7781-4234-a8ea-7190a71e13af/linked_in_profile",
    isPinned: true,
  },
  {
    id: "learning-docker",
    title: "Learning Docker",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "DevOps",
    credentialId: "5967bf9f12ce6087eb1b68bbe673c9275ed5948deb823f0f48d597ffcb9f3c03",
    skills: ["Docker"],
    credentialUrl: "https://www.linkedin.com/learning/certificates/5967bf9f12ce6087eb1b68bbe673c9275ed5948deb823f0f48d597ffcb9f3c03",
    isPinned: false,
  },
  {
    id: "prompts-google",
    title: "Start Writing Prompts like a Pro",
    issuer: "Google",
    issuerLogo: LOGOS.google,
    date: "Jan 2026",
    category: "AI",
    credentialId: "TW19XRAXTHCN",
    skills: ["Multimodal Prompting", "AI"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/TW19XRAXTHCN",
    isPinned: true,
  },
  {
    id: "ai-for-everyone",
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    issuerLogo: LOGOS.deeplearning,
    date: "Dec 2025",
    category: "AI",
    credentialId: "CG3UPVSTEL2M",
    skills: ["Artificial Intelligence"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/CG3UPVSTEL2M",
    isPinned: true,
  },
  {
    id: "fullstack-udemy",
    title: "Full Stack Web Developer",
    issuer: "Udemy",
    issuerLogo: LOGOS.udemy,
    date: "Oct 2025",
    category: "Full Stack",
    skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Bootstrap", "DOM"],
    credentialUrl: "https://www.udemy.com/certificate/UC-4ee4d68b-259b-41ac-a645-6cccf799a8a4/",
    isPinned: true,
  },
];

export const certCategories = [
  "All",
  "Full Stack",
  "Backend",
  "Database",
  "DevOps",
  "AI",
];
