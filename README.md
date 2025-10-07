# Shreyan Dev - Personal Portfolio

[![Portfolio Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/your-repo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

This repository contains the source code for my personal portfolio website. It serves as a living document of my journey as a software developer, showcasing my skills, projects, and professional growth. It is designed, developed, and maintained with a commitment to modern web standards and best practices.

## ✨ Live Demo

**[Explore the live portfolio here](https://your-live-portfolio-url.com)**

---

## 🚀 Features

This portfolio is more than just a static page; it's a feature-rich application designed to provide an engaging user experience.

*   **Interactive UI:**
    *   **Magnetic Buttons:** Interactive buttons that attract the cursor.
    *   **Cursor Trail Effect:** A subtle particle trail that follows the cursor for a delightful visual touch.
    *   **Animated Background:** A dynamic, animated particle background using `tsparticles`.
*   **Dynamic Content:**
    *   **Project Showcase:** Projects are dynamically loaded from a `JSON` file, making it easy to update.
    *   **Growth Timeline:** An interactive timeline visualizing my career and educational milestones.
*   **Seamless Navigation:**
    *   **Intelligent Navbar:** A smart navigation bar that appears or hides based on scroll direction.
    *   **Reading Progress Bar:** Indicates scroll progress through the page.
    *   **Back To Top Button:** Smoothly scrolls the user back to the top.
*   **User-Friendly Components:**
    *   **Resume Modal:** View my resume directly on the site without leaving the page.
    *   **Asynchronous Contact Form:** A fully functional contact form with client-side validation and asynchronous submission.
*   **Performance & Accessibility:**
    *   Built with a mobile-first approach for full responsiveness.
    *   Optimized for fast load times and a smooth user experience.
    *   Adheres to accessibility best practices.

---

## 🛠️ Tech Stack

The project leverages a modern, robust tech stack to ensure a high-quality development experience and a performant end-product.

*   **Core Framework:** React 18, TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS with PostCSS
*   **UI Components:** shadcn/ui - A collection of beautifully designed, accessible components.
*   **Animations:** Framer Motion
*   **State Management:** React Hooks & Context API
*   **Linting & Formatting:** ESLint
*   **Forms:** React Hook Form with Zod for schema validation
*   **Routing:** React Router DOM

---

## 🤖 AI-Assisted Development
This project was developed with significant assistance from AI-powered tools to accelerate development, enhance code quality, and explore creative solutions. The primary tools used in this workflow include:
*   **Lovable**
*   **Cursor (AI-first Code Editor)**
*   **Gemini CLI**
*   **Qwen CLI**

The use of these tools reflects a modern development approach, leveraging artificial intelligence for tasks ranging from code generation and refactoring to documentation and debugging.

---

## 🏁 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   `npm`, `yarn`, or `bun` package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **Install dependencies:**
    *Using npm:*
    ```sh
    npm install
    ```
    *Or using bun:*
    ```sh
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Update the `.env` file with your specific API keys and configuration for the contact form (e.g., EmailJS, Formspree).

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 📜 Available Scripts

This project includes several scripts to help with development:

| Script      | Description                                       |
|-------------|---------------------------------------------------|
| `dev`       | Starts the development server with hot-reloading. |
| `build`     | Bundles the app for production.                   |
| `build:dev` | Bundles the app in development mode.              |
| `lint`      | Lints the codebase using ESLint.                  |
| `preview`   | Serves the production build locally for preview.  |

---

## 📂 Project Structure

The codebase is organized to be modular and maintainable.

```
/
├── public/               # Static assets (images, fonts, Resume_2.0.pdf)
├── src/
│   ├── components/       # Reusable React components
│   │   ├── ui/           # Unmodified shadcn/ui components
│   │   └── *.tsx         # Custom, high-level components (Hero, About, etc.)
│   ├── data/             # Static data (e.g., projects.json)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions (e.g., cn for classnames)
│   ├── pages/            # Top-level page components
│   ├── App.tsx           # Main application component with routing
│   └── main.tsx          # Entry point of the application
├── .env.example          # Environment variable template
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

---

## 🤝 Contributing

While this is a personal portfolio, I welcome suggestions and feedback. If you spot a bug or have an idea for an improvement, feel free to open an issue.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Shreyan** - [Your Email] - [Your LinkedIn Profile]