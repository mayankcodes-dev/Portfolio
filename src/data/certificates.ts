export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    date: "2024",
    category: "Frontend",
    credentialUrl: "https://coursera.org",
    imageUrl: "",
  },
  {
    id: "node-backend",
    title: "Node.js Backend Development",
    issuer: "Coursera",
    date: "2024",
    category: "Backend",
    credentialUrl: "https://coursera.org",
    imageUrl: "",
  },
  {
    id: "nextjs-vercel",
    title: "Next.js & React Fundamentals",
    issuer: "Vercel / Udemy",
    date: "2023",
    category: "Frontend",
    credentialUrl: "https://udemy.com",
    imageUrl: "",
  },
  {
    id: "mongodb-atlas",
    title: "MongoDB for JavaScript Developers",
    issuer: "MongoDB University",
    date: "2023",
    category: "Backend",
    credentialUrl: "https://mongodb.com",
    imageUrl: "",
  },
  {
    id: "typescript-advanced",
    title: "Advanced TypeScript Programming",
    issuer: "Udemy",
    date: "2024",
    category: "Language",
    credentialUrl: "https://udemy.com",
    imageUrl: "",
  },
  {
    id: "web-security",
    title: "Web Application Security",
    issuer: "Coursera",
    date: "2023",
    category: "Security",
    credentialUrl: "https://coursera.org",
    imageUrl: "",
  },
];

export const certCategories = [
  "All",
  "Frontend",
  "Backend",
  "Language",
  "Security",
];
