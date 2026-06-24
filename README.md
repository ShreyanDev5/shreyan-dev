# Shreyan Sardar | Portfolio Website

A personal developer portfolio website showcasing backend expertise (Java, Spring Boot, MySQL) and modern frontend development.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Featured Project Technologies**: Java, Spring Boot, Hibernate, MySQL, Docker, Supabase, PostgreSQL

## ✨ Core Features

- **Terminal Mockup**: Interactive CLI simulator to query bio, projects, or contact details.
- **Project Showcase**: Cards with filtering, links, and demo credentials for sandboxed testing.
- **Journey Timeline**: Chronological outline of professional milestones and skills.
- **Contact Form**: Integrated with Formspree with copy-to-clipboard shortcut.

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShreyanDev5/shreyan-dev.git
   cd shreyan-dev
   ```

2. **Configure environment variables**:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your keys and configuration:
   ```env
   FORMSPREE_FORM_ID=your_form_id
   VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
   VITE_GITHUB_URL=https://github.com/your-username
   ```

3. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm run preview
   ```
