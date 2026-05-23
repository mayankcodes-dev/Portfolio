export interface Skill {
  name: string;
  level: number; // 1–4 max. 5th bar is intentionally always empty.
  logo: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML5", level: 4, logo: `${DI}/html5/html5-original.svg`, color: "#E34F26" },
      { name: "CSS3", level: 4, logo: `${DI}/css3/css3-original.svg`, color: "#1572B6" },
      { name: "JavaScript", level: 4, logo: `${DI}/javascript/javascript-original.svg`, color: "#F7DF1E" },
      { name: "TypeScript", level: 3, logo: `${DI}/typescript/typescript-original.svg`, color: "#3178C6" },
      { name: "React", level: 4, logo: `${DI}/react/react-original.svg`, color: "#61DAFB" },
      { name: "Next.js", level: 3, logo: `${DI}/nextjs/nextjs-original.svg`, color: "#000000" },
      { name: "Tailwind CSS", level: 4, logo: `${DI}/tailwindcss/tailwindcss-original.svg`, color: "#06B6D4" },
      { name: "Vite", level: 3, logo: "https://vitejs.dev/logo.svg", color: "#646CFF" },
      { name: "Bootstrap", level: 3, logo: `${DI}/bootstrap/bootstrap-original.svg`, color: "#7952B3" },
      { name: "MUI", level: 3, logo: `${DI}/materialui/materialui-original.svg`, color: "#007FFF" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 3, logo: `${DI}/nodejs/nodejs-original.svg`, color: "#339933" },
      { name: "Express.js", level: 3, logo: `${DI}/express/express-original.svg`, color: "#000000" },
      { name: "REST APIs", level: 4, logo: `${DI}/nodejs/nodejs-original.svg`, color: "#339933" },
      { name: "GraphQL", level: 2, logo: `${DI}/graphql/graphql-plain.svg`, color: "#E10098" },
      { name: "FastAPI", level: 1, logo: `${DI}/fastapi/fastapi-original.svg`, color: "#009688" },
      { name: "Socket.IO", level: 1, logo: "https://cdn.worldvectorlogo.com/logos/socket-io.svg", color: "#000000" },
      { name: "JWT", level: 3, logo: "https://jwt.io/img/pic_logo.svg", color: "#D63AFF" },
      { name: "Prisma", level: 1, logo: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg", color: "#5A67D8" },
      { name: "Nodemailer", level: 3, logo: "https://cdn.simpleicons.org/nodemailer", color: "#22B8CF" },
      { name: "ASP.NET", level: 1, logo: `${DI}/dotnetcore/dotnetcore-original.svg`, color: "#512BD4" },
    ],
  },
  {
    category: "Languages",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 4, logo: `${DI}/javascript/javascript-original.svg`, color: "#F7DF1E" },
      { name: "TypeScript", level: 4, logo: `${DI}/typescript/typescript-original.svg`, color: "#3178C6" },
      { name: "Python", level: 3, logo: `${DI}/python/python-original.svg`, color: "#3776AB" },
      { name: "Java", level: 4, logo: `${DI}/java/java-original.svg`, color: "#ED8B00" },
      { name: "C", level: 3, logo: `${DI}/c/c-original.svg`, color: "#A8B9CC" },
      { name: "SQL", level: 3, logo: "https://cdn.simpleicons.org/sqlite", color: "#003B57" },
    ],
  },
  {
    category: "Databases",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: 3, logo: `${DI}/mongodb/mongodb-original.svg`, color: "#47A248" },
      { name: "PostgreSQL", level: 2, logo: `${DI}/postgresql/postgresql-original.svg`, color: "#4169E1" },
      { name: "MySQL", level: 2, logo: `${DI}/mysql/mysql-original.svg`, color: "#4479A1" },
      { name: "Redis", level: 1, logo: `${DI}/redis/redis-original.svg`, color: "#DC382D" },
      { name: "Cloudinary", level: 3, logo: "https://cdn.simpleicons.org/cloudinary", color: "#3448C5" },
      { name: "AWS S3", level: 1, logo: "https://cdn.simpleicons.org/amazons3", color: "#FF9900" },
      { name: "ChromaDB", level: 1, logo: "https://avatars.githubusercontent.com/u/107650275?s=200&v=4", color: "#E86428" },
      { name: "Pinecone", level: 1, logo: "https://avatars.githubusercontent.com/u/54333248?s=200&v=4", color: "#00B4A0" },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "Git", level: 4, logo: `${DI}/git/git-original.svg`, color: "#F05032" },
      { name: "GitHub", level: 4, logo: `${DI}/github/github-original.svg`, color: "#000000" },
      { name: "Linux", level: 2, logo: `${DI}/linux/linux-original.svg`, color: "#FCC624" },
      { name: "Docker", level: 2, logo: `${DI}/docker/docker-original.svg`, color: "#2496ED" },
      { name: "Kubernetes", level: 1, logo: `${DI}/kubernetes/kubernetes-plain.svg`, color: "#326CE5" },
      { name: "NGINX", level: 1, logo: `${DI}/nginx/nginx-original.svg`, color: "#009639" },
      { name: "Jenkins", level: 1, logo: `${DI}/jenkins/jenkins-original.svg`, color: "#D33833" },
      { name: "GitHub Actions", level: 2, logo: "https://cdn.simpleicons.org/githubactions", color: "#2088FF" },
      { name: "AWS", level: 1, logo: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, color: "#FF9900" },
      { name: "Vercel", level: 4, logo: `${DI}/vercel/vercel-original.svg`, color: "#000000" },
      { name: "Firebase", level: 2, logo: `${DI}/firebase/firebase-plain.svg`, color: "#FFCA28" },
    ],
  },
  {
    category: "AI & Tools",
    icon: "🤖",
    skills: [
      { name: "LangChain", level: 1, logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4", color: "#1C3C3C" },
      { name: "OpenAI API", level: 2, logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg", color: "#000000" },
      { name: "HuggingFace", level: 1, logo: "https://huggingface.co/front/assets/huggingface_logo.svg", color: "#FFD21E" },
      { name: "VS Code", level: 4, logo: `${DI}/vscode/vscode-original.svg`, color: "#007ACC" },
      { name: "Postman", level: 4, logo: `${DI}/postman/postman-original.svg`, color: "#FF6C37" },
      { name: "Figma", level: 2, logo: `${DI}/figma/figma-original.svg`, color: "#F24E1E" },
      { name: "Jest", level: 2, logo: `${DI}/jest/jest-plain.svg`, color: "#C21325" },
      { name: "WordPress", level: 3, logo: `${DI}/wordpress/wordpress-original.svg`, color: "#21759B" },
      { name: "Notion", level: 3, logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg", color: "#000000" },
      { name: "Photoshop", level: 3, logo: `${DI}/photoshop/photoshop-plain.svg`, color: "#31A8FF" },
    ],
  },
];

/**
 * Level labels — 5th slot intentionally left blank (bar 5 never fills).
 * orange = 1 | yellow = 2 | green = 3 or 4
 */
export const LEVEL_LABELS = ["", "Beginner", "Elementary", "Intermediate", "Advanced", ""];
