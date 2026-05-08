# Personal Docs - Development Plan

This document serves as the step-by-step roadmap for building your personal documentation website. 
You can track progress by checking off the boxes (`[x]`) as each task is completed.

## Phase 1: Project Initialization & Architecture Setup
- [x] **1.1 Review Existing Workspace:** Ensure the monorepo structure (`apps/web`, `packages/ui`) is correctly configured and dependencies are installed.
- [x] **1.2 Configure Tailwind & Styling:** Verify that the UI package's global styles and Tailwind configuration are correctly linked to the web app.
- [x] **1.3 Setup Routing Infrastructure:** Ensure `@tanstack/react-router` (or the chosen router) is fully configured to handle nested document routes.

## Phase 2: Core UI Components & App Shell
- [x] **2.1 Header Component:** Build a sticky top navigation bar including the Site Title, Search Trigger (⌘K button), and Theme Toggle (Dark/Light mode).
- [x] **2.2 Sidebar Navigation:** Create a collapsible sidebar to display the nested category hierarchy (AI & LLM, Portfolio, Project, Useful Links).
- [x] **2.3 App Layout Wrapper:** Combine Header, Sidebar, and a main content area into a persistent layout wrapper (`__root.tsx`).
- [x] **2.4 Typography Component:** Implement a generic `Prose` or `MarkdownWrapper` component to style document content (headings, paragraphs, lists, code blocks).

## Phase 3: Content Management & Markdown Rendering
- [x] **3.1 Markdown Setup:** Decide on and integrate a Markdown parser (e.g., `vite-plugin-mdx`, `marked`, or `@mdx-js/react`) to allow writing docs as `.md` or `.mdx` files.
- [x] **3.2 Create Content Directory:** Set up a dedicated folder (e.g., `apps/web/content` or `apps/web/src/docs`) to store all markdown files.
- [x] **3.3 Dynamic Route Generation:** Configure the router to dynamically load and display markdown content based on the URL path.
- [x] **3.4 Frontmatter Parsing:** Implement metadata extraction from markdown files (title, description, date, author) to populate page headers and SEO tags.

## Phase 4: Implementing the Site Structure (Routing)
*Based on `plan/website-structure.md`*
- [x] **4.1 Landing Page (Home):** Create the hero section ("My Personal Docs") with a category picker UI.
- [x] **4.2 AI & LLM Section:** Scaffold routes and placeholder content for AI concepts (e.g., `concept-a`, `concept-b`).
- [x] **4.3 Portfolio Section:** Scaffold routes for case studies (e.g., `client-a/project-1`).
- [x] **4.4 Project Section:** Scaffold routes for sub-categories (Company, News, SaaS, Organization).
- [x] **4.5 Useful Links Section:** Scaffold the resources pages (e.g., `resource-1`).

## Phase 5: Search & Interactivity
- [x] **5.1 Command Menu (⌘K):** Install and configure `cmdk` (or similar shadcn/ui component) for the global search modal.
- [x] **5.2 Search Indexing:** Create a mechanism to index markdown headings and titles so they are searchable within the Command Menu.
- [x] **5.3 Keyboard Shortcuts:** Bind `Ctrl+K` / `Cmd+K` to open the search modal.

## Phase 6: AI Chatbot Integration (Optional but recommended)
- [ ] **6.1 Chatbot UI:** Create a floating action button (FAB) or sidebar panel for the "Ask AI" feature.
- [ ] **6.2 AI API Route:** Set up a backend route (using `packages/api` or directly in the app if it's a full-stack framework) to communicate with an LLM (e.g., OpenAI or Gemini).
- [ ] **6.3 Context Injection:** Feed the content of the currently viewed documentation page to the AI to provide contextual answers.

## Phase 7: Polish, SEO, & Deployment
- [x] **7.1 Responsive Design Check:** Ensure the sidebar converts to a hamburger menu on mobile, and tables/code blocks scroll horizontally.
- [ ] **7.2 SEO & Meta Tags:** Add standard meta tags, Open Graph images, and a dynamically generated `sitemap.xml`.
- [x] **7.3 404 Page:** Create a custom "Page Not Found" screen.
- [x] **7.4 Production Build:** Run the build process (`npm run build` or `bun run build`) to ensure there are no compilation errors.
- [ ] **7.5 Deployment:** Deploy the application (e.g., to Vercel, Netlify, or Cloudflare Pages).
