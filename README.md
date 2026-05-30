<div align="center">
<a href="https://mayank-developer.vercel.app">
  <img src="src/app/icon.svg" width="80" height="80" alt="Mayank Singh Logo" style="border-radius: 20%;" />
</a>

# Portfolio

**A premium, minimal developer portfolio built with Next.js 16, Framer Motion & Tailwind CSS v4.**

[![Live](https://img.shields.io/badge/🌐_Live-mayank--developer.vercel.app-000?style=for-the-badge)](https://mayank-developer.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## ✨ Features

- **Cinematic Hero Section** — Full-viewport portrait with smooth grayscale-to-color hover transition
- **Framer Motion Interactivity** — Scroll-triggered reveals, hover lifts, tap feedback across all sections
- **Skills Dashboard** — Categorized tech stack with animated tab switching and proficiency bars
- **Featured Projects** — Pinned project cards with live screenshot fallbacks and detail modals
- **Dev Activity** — Live GitHub contribution calendar + LeetCode stats integration
- **Certifications** — Grid layout with issuer logos and credential verification links
- **Blog Integration** — Fetches latest posts from Hashnode via GraphQL API
- **Contact Page** — Working contact form with email delivery, Google Maps embed, and social links
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **SEO Optimized** — Proper meta tags, semantic HTML, and Open Graph support

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Animations** | Framer Motion 12, GSAP 3 |
| **UI Components** | Radix UI, shadcn/ui, Lucide Icons |
| **Blog CMS** | Hashnode (GraphQL API) |
| **Deployment** | Vercel |
| **Fonts** | Geist Sans & Geist Mono (next/font) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage (Hero + Skills + Projects + Activity + Contact)
│   ├── projects/             # All projects page
│   ├── certifications/       # Certificates grid
│   ├── blog/                 # Blog listing + individual posts
│   ├── contact/              # Contact form + map
│   ├── api/                  # API routes (contact form handler)
│   ├── globals.css           # Design system tokens & utilities
│   └── layout.tsx            # Root layout with fonts & metadata
├── components/
│   ├── sections/             # Homepage sections (skills, projects, footer)
│   ├── shared/               # Reusable components (modals, loaders)
│   ├── layout/               # Navigation components
│   └── ui/                   # shadcn/ui primitives
├── data/
│   ├── projects.ts           # Project metadata
│   ├── skills.ts             # Skills & proficiency data
│   └── certificates.ts       # Certification data
└── lib/                      # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/mayankcodes-dev/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file (see `.env.local.example`):

```env
# Contact form email delivery (optional)
RESEND_API_KEY=your_resend_api_key
```

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

The site auto-deploys to [Vercel](https://vercel.com) on every push to `main`.

---

## 🎨 Design System

The project uses a custom **Engineer Minimal** design system defined in `globals.css`:

- **Palette** — Pure white, deep black, tiny red/yellow/green accents
- **Typography** — Geist Sans (body) + Geist Mono (code/labels)
- **Cards** — `.card-eng` with 300ms cubic-bezier hover transitions
- **Buttons** — `.btn`, `.btn-primary`, `.btn-outline` with active press states
- **Badges** — `.badge-green`, `.badge-yellow`, `.badge-red` status indicators

---

## 📬 Contact

- **Email** — admin@mayankcodes.dev
- **LinkedIn** — [mayankcodes-dev](https://linkedin.com/in/mayankcodes-dev)
- **GitHub** — [mayankcodes-dev](https://github.com/mayankcodes-dev)
- **LeetCode** — [mayankcodes-dev](https://leetcode.com/u/mayankcodes-dev)

---

<div align="center">

**Built with ❤️ by Mayank Singh**

</div>
