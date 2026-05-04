export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  isPinned: boolean;
  type: "personal" | "freelance";
  period?: string;
}

export const projects: Project[] = [
  /* ── FREELANCE ── */
  {
    id: "paypilot",
    title: "PayPilot — Invoice Copilot",
    description:
      "Autonomous invoice management platform with AI-powered payment tracking and Razorpay integration.",
    longDescription:
      "PayPilot automates invoicing for freelancers. Razorpay webhooks, JWT auth, MongoDB ledger, Next.js 15 dashboard.",
    image: "/images/paypilot.webp",
    technologies: ["Next.js 15", "TypeScript", "MongoDB", "Razorpay", "Node.js", "Express", "JWT"],
    link: "https://v0-invoice-copilot-zeta.vercel.app",
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: true,
    type: "freelance",
    period: "2025",
  },
  {
    id: "agenthub",
    title: "AgentHub AI — Voice Infrastructure",
    description:
      "High-conversion landing page for an autonomous voice AI agent platform targeting enterprise clients.",
    longDescription:
      "Landing page for autonomous voice AI with Next.js 15, FastAPI lead backend, dark glassmorphism design.",
    image: "/images/agenthub.webp",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "Vercel"],
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: true,
    type: "freelance",
    period: "2025",
  },
  {
    id: "beauty-landing",
    title: "Beauty Parlour Landing Page",
    description:
      "Modern, responsive landing page for a salon — hero section, service listings, testimonials, and Google Maps integration.",
    longDescription:
      "Built a polished online presence for salon services using React and Tailwind. Includes a visually rich hero section, service listings, client testimonials, interactive location/contact section with Google Maps. Focused on clean UI, responsive design, and performance optimization using lazy loading.",
    image: "/images/beauty.webp",
    technologies: ["React", "Tailwind CSS", "Vite", "Google Maps API"],
    link: "https://github.com/coderMayank69",
    github: "https://github.com/coderMayank69",
    featured: false,
    isPinned: false,
    type: "freelance",
    period: "Sep 2025",
  },

  /* ── PERSONAL ── */
  {
    id: "quickstay",
    title: "QuickStay",
    description:
      "Full-stack hotel booking platform connecting travelers and hotel owners with room search, Stripe payments, and owner dashboards.",
    longDescription:
      "Built QuickStay with React + Vite frontend and Node.js/Express/MongoDB backend. Features Clerk authentication with role-based access (user & owner), room search and filtering, date-based availability, booking management, Stripe payments, Cloudinary image uploads, automated email confirmations, and owner dashboards with booking and revenue insights.",
    image: "/images/quickstay.webp",
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "Clerk", "Stripe", "Cloudinary"],
    link: "https://quick-stay-pink.vercel.app",
    github: "https://github.com/coderMayank69/QuickStay",
    featured: true,
    isPinned: true,
    type: "personal",
    period: "Dec 2025 – Jan 2026",
  },
  {
    id: "yelp",
    title: "YelpCamp",
    description:
      "Production-style full-stack campground review app with authentication, image uploads, interactive maps, and secure middleware.",
    longDescription:
      "YelpCamp features complete CRUD with MVC architecture, Passport.js authentication, role-based authorization, Joi validation, Cloudinary media handling, MapTiler geolocation/maps, session management with connect-mongo, and HTTP security headers. Built to practice secure, scalable web products end to end.",
    image: "/images/yelp.webp",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Passport.js", "Cloudinary", "MapTiler"],
    link: "https://yelpcamp-1-wcof.onrender.com/",
    github: "https://github.com/coderMayank69/YELPCAMP",
    featured: true,
    isPinned: true,
    type: "personal",
    period: "Oct 2025",
  },
  {
    id: "url-shortner",
    title: "URL Shortner",
    description: "Scalable URL Management & Analytics Platform",
    longDescription: "A full-stack URL shortener built with Node.js and MongoDB. It allows users to create short links, track analytics, and manage their URLs efficiently.",
    image: "/images/url-shortner.webp",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Docker", "CSS"],
    link: "https://url-shortner-9amn.vercel.app/",
    github: "https://github.com/coderMayank69/URL-shortner",
    featured: false,
    isPinned: false,
    type: "personal",
    period: "2025",
  },
  {
    id: "note-keeper",
    title: "Note Keeper",
    description:
      "Full-stack note management app with Firebase Auth, REST APIs, Docker containerization, and a clean responsive UI.",
    longDescription:
      "React + Vite frontend with Node.js/Express + MongoDB backend. Firebase Authentication token verification for protected routes. Complete CRUD for notes, REST APIs, and end-to-end client-server integration. Containerized with Docker and configured for production deployment.",
    image: "/images/note-keeper.webp",
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "Firebase Auth", "Docker"],
    link: "https://note-keeper-one-theta.vercel.app",
    github: "https://github.com/coderMayank69/Note-Keeper",
    featured: false,
    isPinned: false,
    type: "personal",
    period: "Aug – Sep 2025",
  },
  {
    id: "todo",
    title: "To-Do List",
    description:
      "React + Vite task manager with Material UI, localStorage persistence, and reusable component architecture.",
    longDescription:
      "Developed with React and Vite with Material UI components. Users can add, complete, and delete tasks with all data persisted in localStorage. Focused on reusable component architecture, state management with React hooks, and accessible controls.",
    image: "/images/todo.webp",
    technologies: ["React", "Vite", "Material UI", "JavaScript", "localStorage"],
    link: "https://to-do-list-lake-eight-99.vercel.app",
    github: "https://github.com/coderMayank69/To-Do-List",
    featured: false,
    isPinned: false,
    type: "personal",
    period: "Aug 2025",
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Classic Tic-Tac-Toe game built with HTML, CSS, and vanilla JavaScript.",
    longDescription: "A fully responsive Tic-Tac-Toe game that allows two players to play against each other. It features win detection, draw detection, and a reset button.",
    image: "/images/tic-tac-toe.webp",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://tic-tac-toe-livid-tau-26.vercel.app",
    github: "https://github.com/coderMayank69/TIC-TAC-TOE",
    featured: false,
    isPinned: false,
    type: "personal",
    period: "2024",
  },
  {
    id: "cms-clone",
    title: "CMS Website Clone",
    description:
      "Responsive front-end clone of City Montessori School website — navigation, carousel, achievement highlights, and structured footer.",
    longDescription:
      "Built with HTML, CSS, Bootstrap, and Bootstrap Icons. Multi-level navigation menu, image carousel, achievement highlights, child development section, philosophy section, and a structured footer closely matching the original CMS layout.",
    image: "/images/cms.webp",
    technologies: ["HTML5", "CSS3", "Bootstrap", "Bootstrap Icons"],
    link: "https://cmseducation-clone-org.vercel.app",
    github: "https://github.com/coderMayank69/cmseducationClone.org",
    featured: false,
    isPinned: false,
    type: "personal",
    period: "Jul 2025",
  },
];
