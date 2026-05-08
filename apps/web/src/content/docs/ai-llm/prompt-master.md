---
title: Prompt Master
description: Collection of curated AI prompts for real-world development tasks.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 15
source: https://docs.bahrul.me/ai-llm/prompt-master
---

# Prompt Master

## Generate Page

### Legal Page
A comprehensive prompt for generating a single `/legal` page containing 5 legal sections as tabs with mobile-optimized sticky accordion TOC.

```markdown title="Legal Page with Tabs & Mobile TOC"
Create a single `/legal` page that contains 5 legal sections as tabs:

1. Privacy Policy
2. Terms and Conditions
3. Refund Policy
4. Cookie Policy
5. Disclaimer

Core requirements:
1. Implement all 5 legal documents in one page (`/legal`) using tabs (not separate pages).
2. Each tab must load/display its own legal content clearly.
3. Keep the layout clean, readable, and consistent with the current design system.
4. Use semantic, rich HTML structure for the content (not plain text blocks only), including:
   - headings (`h1`, `h2`, `h3`)
   - paragraphs
   - ordered/unordered lists
   - tables (if needed)
   - links
   - emphasis/strong text
5. Content must be relevant to the company's actual products/services and business context
   (not generic placeholder text).

Mobile-only Table of Contents (TOC) behavior:
1. Apply this TOC behavior on mobile only (do not change tablet/desktop behavior).
2. Add a sticky Table of Contents that remains accessible while the user scrolls.
3. Use an accordion-style TOC:
   - collapsed by default
   - expand/collapse on tap
   - clear interaction states (default, expanded, focus)
4. Keep the sticky TOC compact so it does not block important content.
5. Ensure users can comfortably read the legal content while the TOC remains available.
6. TOC should reflect the heading structure of the currently active legal tab/section.

Legal/content requirements:
1. Draft all legal content in accordance with relevant Indonesian laws and regulations.
2. Ensure the policies are appropriate for the company's products/services and operational model.
3. Use legally relevant, professional wording (not generic boilerplate only).
4. If there are legal assumptions or missing business details, state them clearly for later
   legal review.
5. Final content should be review-ready, but still treated as draft pending legal validation.

Accessibility and UX requirements:
1. Tab navigation must be keyboard accessible and clearly indicate the active tab.
2. TOC accordion must be keyboard accessible with visible focus states.
3. Maintain readable typography, spacing, and contrast on mobile and desktop.
4. Prevent overlap, clipping, or layout breakage.

Acceptance criteria:
1. `/legal` page contains all 5 legal documents in tab format on a single page.
2. Mobile sticky accordion TOC works consistently for all 5 legal sections.
3. No overlap or layout breakage with header/content/TOC.
4. Tablet and desktop behavior remains unchanged (no mobile TOC behavior applied there).
5. Legal content is structured with semantic HTML and is relevant to the company context.
6. Accessibility is preserved (keyboard focus, labels, readable tap targets, clear active
   states).
```

### FAQs Page
A comprehensive prompt for generating a fully responsive `/faqs` page with accordion behavior, consistent design system integration, and multi-breakpoint support.

```markdown title="FAQs Page with Accordion & Responsive Layout"
Create a `/faqs` page that is fully responsive, visually consistent with the current design system, and easy to use across all screen sizes.

Objective:
- Build a clean, compact, and user-friendly FAQ page that helps users quickly find answers.
- Ensure the page design and interactions are polished across all breakpoints (mobile-first, then tablet and desktop).

Core requirements:
1. Create a dedicated `/faqs` page.
2. Follow the current design pattern and shared UI system (navbar, footer, spacing, typography, colors, buttons, cards, states).
3. Keep the page simple, compact, and easy to scan.
4. Use reusable components for FAQ items/accordion sections and page sections.

FAQ content structure:
1. Page header section:
   - clear page title (e.g., "FAQs" / "Frequently Asked Questions")
   - short supporting description
2. FAQ list section:
   - grouped questions (optional categories if needed)
   - each question should expand/collapse to show the answer
3. Optional support CTA section:
   - "Still need help?" style message
   - contact action (e.g., Contact Us / WhatsApp / Email), if consistent with current design
4. Footer remains consistent with the current site layout

Accordion behavior requirements:
1. Use accordion-style FAQ items (question + expandable answer).
2. Default state: collapsed (unless the design intentionally opens the first item).
3. Expanded/collapsed states must be visually clear.
4. Add consistent interaction states:
   - default
   - hover
   - active
   - focus
   - expanded
5. Ensure spacing and alignment remain clean in both collapsed and expanded states.
6. Prevent layout shift issues that make the page feel unstable.

Design and UX requirements:
1. Strong visual hierarchy:
   - page title
   - category labels (if used)
   - question text
   - answer text
2. Keep question rows easy to scan and tap/click.
3. Use readable typography and balanced spacing.
4. Make answers easy to read (comfortable line length and spacing).
5. Keep the layout minimal and uncluttered.
6. Ensure consistency with other pages in the site.

Responsive requirements (must cover all 4 breakpoints):
1. Extra Small (xs): 0px - 575px
2. Small (sm): 576px - 767px
3. Medium (md): 768px - 991px
4. Large (lg): 992px and above

Responsive behavior expectations:
1. The page must look polished and usable on all 4 breakpoints, with mobile as a high priority.
2. FAQ items must remain readable and touch-friendly on mobile.
3. Spacing, typography, and component sizing must adapt consistently across breakpoints.
4. No overflow, clipping, overlap, broken alignment, or cramped content.
5. Accordion controls/icons must remain aligned and easy to interact with at every breakpoint.
6. Navbar/footer integration must remain visually consistent and responsive.

Accessibility requirements:
1. FAQ accordion must be keyboard accessible.
2. Focus states must be clearly visible.
3. Question triggers must have clear labels and state indication (expanded/collapsed).
4. Contrast and text readability must be maintained across all states and breakpoints.
5. Tap targets on mobile must be comfortable and not too small.

Quality requirements:
1. Reusable FAQ item component/pattern for future pages/sections.
2. Consistent token-based styling (colors, typography, spacing, borders, radius).
3. Clean, maintainable page structure aligned with the existing design system.
4. No visual regressions on other pages/layout components.

Deliverables:
1. `/faqs` page implementation (responsive across xs/sm/md/lg)
2. Reusable FAQ accordion component/pattern
3. Responsive QA checklist (all 4 breakpoints)
4. Brief summary of design/UX decisions (optional but preferred)

Acceptance criteria:
1. `/faqs` page is fully implemented and follows the current design pattern.
2. FAQ accordion works correctly and looks consistent.
3. The page is clean, compact, and easy to scan.
4. Responsive layout is correct and polished across xs, sm, md, and lg.
5. No overlap, overflow, clipping, or broken spacing on any breakpoint.
6. Accessibility basics (keyboard, focus, readability, contrast) are properly handled.
```

### About Page
A comprehensive prompt for generating an `/about` page that aligns with the homepage context and follows the current design system.

```markdown title="About Page from Homepage Context"
Create an `/about` page that follows the current design pattern and overall design system.

Objective:
- Build an About page that feels consistent with the existing website.
- Base the content on the homepage context so the messaging stays aligned with the brand, products, and company direction.

Requirements:
1. Follow the current design pattern (layout structure, spacing, typography, colors, components, and overall visual style).
2. Keep the page clean, compact, and easy to scan.
3. Use the homepage content context as the source for About page messaging:
   - company identity
   - industry/domain
   - products/services
   - value proposition
   - mission/vision (if implied from homepage content)
4. Ensure the About page content is consistent with the homepage tone and terminology.
5. Do not introduce unrelated messaging that conflicts with the homepage content.

Content expectations (based on homepage context):
1. Company overview / who we are
2. What we do (products/services)
3. Value or strengths (quality, reliability, availability, etc., if aligned with homepage)
4. Mission/commitment (optional, if supported by homepage messaging)
5. Simple CTA section (optional) consistent with the current design system

Design and UX requirements:
1. Maintain strong visual hierarchy (headings, supporting text, sections).
2. Use reusable components/patterns where possible (section header, cards, CTA, etc.).
3. Keep spacing compact but readable.
4. Ensure responsive behavior across all breakpoints (mobile, tablet, desktop).
5. Avoid clutter and unnecessary decorative elements.

Quality requirements:
1. Consistent with shared navbar/footer and default page layout.
2. Readable and professional content structure.
3. No layout breakage, overlap, or inconsistent spacing.
4. Accessibility basics: readable text, clear contrast, and proper heading structure.

Acceptance criteria:
1. `/about` page follows the current design pattern.
2. Content aligns with and is derived from the homepage context.
3. Page is clean, compact, and responsive.
4. Messaging is consistent with the brand and product context shown on the homepage.
```

### Contact Page
A comprehensive prompt for generating a simple, compact `/contact` page that follows the current design system.

```markdown title="Contact Page"
Create a `/contact` page that follows the current design pattern and design system.

Contact details to use:
- Address: [Your full business address]
- Phone: [Your phone number]
- Email: [Your email address]

Requirements:
1. Design the page to be simple, compact, and easy to scan.
2. Follow the existing visual style and component patterns (spacing, typography, colors, buttons, cards, etc.).
3. Present the contact information clearly with good visual hierarchy.
4. Include clear labels/icons for address, phone, and email (if icons are used, keep them consistent with the design system).
5. Make phone and email easy to interact with (tap/click-friendly).
6. Keep the layout responsive across all breakpoints (mobile, tablet, desktop).
7. Ensure strong readability, spacing, and contrast (no cluttered layout).

Suggested page structure (simple and compact):
1. Page header/title (e.g., "Contact Us")
2. Short supporting text
3. Contact information block (address, phone, email)
4. Optional contact CTA/button (e.g., call, email, or WhatsApp) if consistent with the current design
5. Optional map/location section (only if it fits the current design pattern)

Quality requirements:
1. No unnecessary decorative elements.
2. Clean alignment and compact spacing.
3. Consistent with existing navbar/footer and page layout system.
4. Accessibility basics: readable text sizes, clear focus states, and usable tap targets.

Acceptance criteria:
1. `/contact` page matches the current design pattern.
2. Contact details are clearly visible and correctly displayed.
3. Layout is simple, compact, and responsive.
4. No visual inconsistency or layout breakage across breakpoints.
```

## General Prompt

### Performance Audit
A comprehensive prompt for performing a full performance audit and optimization review across an entire website.

```markdown title="Website Performance Audit & Optimization"
Perform a full, deep website performance audit and optimization review.

Objective:
- Ensure the website is fast, stable, error-free, and aligned with performance best practices across key pages and user flows.

Scope:
1. Audit overall website performance (initial load, repeat load, responsiveness, rendering behavior, and visual stability).
2. Check for all types of errors and issues, including:
   - build/deployment errors (if applicable)
   - runtime errors
   - browser console errors/warnings
   - failed/slow network requests
   - broken UI interactions caused by performance issues
3. Identify unnecessary resource loading (scripts, styles, fonts, images, third-party assets, duplicate files, unused assets).
4. Review implementation against performance best practices for:
   - asset loading
   - image optimization
   - font loading
   - script execution cost
   - CSS efficiency
   - caching strategy (where applicable)
   - lazy loading / deferred loading
   - layout stability and reduced visual shift
   - interaction responsiveness
5. Verify performance quality across major pages and important user flows.
6. Ensure mobile performance is included in the audit (not desktop-only).

Requirements:
1. Find and fix all obvious errors that affect functionality, rendering, or performance.
2. Remove or reduce unnecessary work during page load.
3. Improve loading speed without breaking the UI/UX or core functionality.
4. Preserve design consistency and behavior while optimizing.
5. Check for regressions after each optimization/fix.

Output (required):
1. Audit summary (overall findings)
2. Error report (what errors were found and where)
3. Root cause summary (brief explanation for each major issue)
4. Performance bottlenecks (prioritized: high / medium / low impact)
5. Optimization actions taken (exact changes/improvements)
6. Before vs after results (measurable improvements where possible)
7. Final QA checklist (functionality, responsiveness, no errors, performance stability)

Acceptance criteria:
1. No critical errors remain (runtime, console, broken requests, major UI failures).
2. Unnecessary files/resources are reduced or removed.
3. Performance best practices are implemented consistently.
4. Website feels fast and stable on both desktop and mobile.
5. Core pages and user flows work correctly after optimization.
```

### Full Error Check & Fix
A comprehensive prompt for identifying, diagnosing, and fixing all errors across a project.

```markdown title="Full Error Check & Fix"
I found multiple errors in the project. Please do a full error check and fix them.

Requirements:
1. Identify all current errors (build errors, runtime errors, console errors, and obvious UI/functionality issues).
2. Explain the root cause of each error briefly.
3. Fix the errors completely (not just temporary workarounds).
4. Check for related regressions after each fix.
5. Make sure the final result works correctly across the affected pages/components.

Output:
1. List of errors found
2. Root cause summary
3. Fixes implemented
4. Final verification / QA checklist
```

### Multilingual Support
A comprehensive prompt for implementing full bilingual (ID + EN) support with language switching, detection, routing, and complete copywriting.

```markdown title="Multilingual Support (ID + EN)"
Implement full multilingual copywriting support for the website with two languages:
- Bahasa Indonesia (ID)
- English (EN)

Objective:
- Provide a complete bilingual experience across all pages, with consistent content, routing, and language switching behavior.

Core requirements:
1. Add a language switcher that allows users to switch between:
   - Indonesia (ID)
   - English (EN)
2. The language switcher must:
   - be clearly visible, easy to use, and consistent across all pages
   - display a country flag icon next to each language option (e.g., Indonesian flag for ID, UK/US flag for EN)
   - use recognizable, standard flag icons that are visually consistent with the design system
3. All user-facing copy must support both languages, including:
   - navigation labels
   - page headings and subheadings
   - body text
   - buttons and CTAs
   - form labels/placeholders/help text
   - validation/error/success messages
   - footer content
   - legal/support text
   - empty states and status messages
4. Do not leave mixed-language content on the same page unless intentionally specified.

Routing requirements:
1. Use English routes under `/en/*` (for example: `/en`, `/en/about`, `/en/contact`, etc.).
2. Keep the default/non-English routes for Bahasa Indonesia (for example: `/`, `/tentang`, `/kontak`, etc., based on the existing route structure).
3. Ensure the language switcher maps users to the equivalent page in the other language whenever possible.
4. If an exact translated route/page is not available, define a clear fallback behavior (e.g., fallback to the language homepage) and keep it consistent.

Language detection requirements:
1. Add language detection so the website can automatically determine the user's preferred language.
2. Use the detected language to guide the initial experience:
   - direct English users to `/en/*`
   - keep Indonesian users on the default routes
3. Respect user choice:
   - once the user manually switches language, preserve that preference for future navigation/visits
   - do not keep auto-switching after a manual selection
4. Use a sensible fallback if detection is unavailable or ambiguous (default to Bahasa Indonesia unless otherwise specified).

Content and copywriting quality:
1. Create/prepare complete copywriting for both Bahasa Indonesia and English.
2. Ensure translations are natural, professional, and context-aware (not awkward literal translations).
3. Keep terminology consistent across all pages and components.
4. Preserve brand tone and meaning across both languages.
5. Keep content length differences between languages in mind so layouts remain clean and readable.

UX and consistency requirements:
1. Keep the layout and design consistent across both language versions.
2. Ensure the language switcher has clear states (default, hover, active, focus) and always shows the flag alongside the language label.
3. Clearly indicate the currently active language (with its flag visible).
4. Maintain readability and proper spacing even when translated text is longer/shorter.
5. Ensure navigation, CTA labels, and page titles remain visually balanced in both languages.

SEO and discoverability (content-level requirement):
1. Ensure each language version is treated as a distinct localized page version.
2. Keep page titles, descriptions, and key page copy localized for both ID and EN.
3. Avoid duplicate-language content being shown on the wrong route.

Accessibility requirements:
1. Language switcher must be keyboard accessible and easy to understand.
2. Active language state must be clearly visible (not color-only).
3. Flag icons must have proper alt text or aria-labels for screen readers.
4. Text in both languages must remain readable and consistent across breakpoints.

Output / deliverables:
1. Multilingual implementation summary (ID + EN coverage).
2. List of pages/routes supported in both languages.
3. Language switcher behavior summary (including detection and preference persistence).
4. QA checklist for:
   - route correctness (`/en/*`)
   - language switching
   - language detection behavior
   - copy consistency
   - no mixed-language issues
```

### Compact Button Design
A prompt for refining button design to be more compact, small, and minimal across all variants.

```markdown title="Compact Button Design"
Refine the button design to be more compact, small, and minimal.

Requirements:
1. Reduce overall button size (height, padding, and visual weight) while keeping it readable and easy to use.
2. Keep the design minimal and clean (no unnecessary decoration).
3. Maintain clear label readability and balanced spacing between text and icons (if any).
4. Ensure consistent button styles across all variants (primary, secondary, outline, ghost, etc.).
5. Preserve interaction states (default, hover, active, focus, disabled) with clear visibility.
6. Keep buttons responsive and touch-friendly, especially on mobile.
7. Follow the current design system (tokens, spacing, radius, typography, color rules).

Acceptance criteria:
1. Buttons look smaller and more compact than the current design.
2. Buttons remain readable and usable across breakpoints.
3. Styling is consistent and minimal across all button variants.
```

### Carousel Fix
A prompt for fixing carousel card functionality, navigation controls, and responsive behavior across all breakpoints.

```markdown title="Carousel Fix & Responsive Behavior"
Fix the carousel card functionality and responsive behavior.

Issue:
- The current carousel is not functioning correctly.
- Navigation and mobile behavior need to be implemented/fixed properly.

Requirements:
1. Fix the carousel logic so card sliding/navigation works correctly.
2. Implement working previous and next arrow controls.
3. Ensure arrow controls update the carousel reliably (no broken navigation, skipped items, or stuck states).
4. Make sure the carousel layout is correctly implemented on mobile:
   - cards display properly
   - no cut-off cards (unless intentionally designed)
   - no overflow or broken spacing
   - touch-friendly interaction and controls
5. Keep the carousel responsive across all 4 breakpoints (xs, sm, md, lg).
6. Maintain consistent spacing, alignment, and card sizing within the current design system.
7. Ensure the carousel degrades gracefully if there are fewer items than the visible slot count.

Optional quality improvements (if applicable):
1. Add disabled states for prev/next buttons when at boundaries (if not infinite loop).
2. Add swipe/drag support on mobile.
3. Preserve accessibility basics (keyboard navigation, focus states, aria labels on controls).

Acceptance criteria:
1. Prev/next arrows work correctly.
2. Carousel cards slide/render correctly without layout issues.
3. Mobile carousel implementation is usable and visually clean.
4. No responsive breakage across xs/sm/md/lg.
```

### Responsive Layout Fix
A prompt for fixing responsive layout issues across all 4 breakpoints with mobile as the highest priority.

```markdown title="Responsive Layout Fix (Mobile Priority)"
Fix the responsive layout across all 4 breakpoints, with mobile as the highest priority.

Objective:
- Ensure the UI is fully responsive, visually polished, and usable on xs, sm, md, and lg breakpoints.
- Focus especially on mobile UX/UI quality and layout correctness.

Critical unit rules (non-negotiable):
1. All components, typography, spacing, and sizing MUST use relative units:
   - Use `rem` for font sizes, margins, padding, gaps, and border radius.
   - Use `vh` / `dvh` for viewport-relative heights (e.g., hero sections).
   - Use `rem` or `%` for component widths and heights.
2. Do NOT use `px` for font sizes, margins, padding, or component dimensions.
3. Apply this consistently across ALL components, sections, and breakpoints — no exceptions.
4. Ensure the base font size (`html` / `:root`) is properly set so `rem` values scale correctly.

Requirements:

1. Hero section (mobile priority)
- The hero section must fill the full viewport height on mobile (`100vh` or `100dvh`).
- Keep hero content readable and well-aligned within the viewport.
- Prevent overflow, clipping, or awkward spacing on small screens.

2. Mobile drawer / hamburger menu
- Add a clear close button inside the drawer menu.
- Improve the drawer menu layout and styling so it looks clean, modern, and easy to use.
- Ensure menu items have proper spacing and readable typography (using `rem`).
- Include visible interaction states (hover/active/focus where applicable).

3. Card radius consistency
- Standardize all cards to use a `10%` corner radius (consistent across the design).
- Apply this consistently to all card types across breakpoints.

4. Gallery and Bulletin carousel cards
- For Gallery cards and Bulletin cards, show exactly 1 full card per carousel slide on mobile.
- No cut-off cards should be visible.
- Ensure proper spacing, alignment, and smooth carousel navigation.

5. Global component and typography sizing
- All font sizes must use `rem` (headings, body, captions, labels, buttons, inputs, etc.).
- All margins, padding, and gaps must use `rem`.
- All component heights/widths must use `rem`, `%`, or viewport units — never fixed `px`.
- Buttons, inputs, cards, badges, navbars, footers, and all UI elements must follow these unit rules.

Responsive quality checks (all 4 breakpoints):
1. Extra Small (xs): 0px - 575px
2. Small (sm): 576px - 767px
3. Medium (md): 768px - 991px
4. Large (lg): 992px and above
- No layout breakage, overflow, clipping, or overlapping elements.
- Consistent spacing, alignment, and typography scaling.
- Components remain usable and visually consistent across xs, sm, md, and lg.

Acceptance criteria:
1. Mobile hero renders at full viewport height and looks balanced.
2. Drawer menu includes a close button and has improved visual/UX quality.
3. All cards use consistent 10% corner radius.
4. Gallery and Bulletin carousels show 1 full card per slide on mobile (no cut-off).
5. All font sizes, margins, padding, and component dimensions use `rem` / `vh` / `%` (no `px`).
6. No responsive regressions across all 4 breakpoints.
```

### Component Consistency Audit
A prompt for auditing all UI components and creating a standardization plan for consistency across the product.

```markdown title="Component Consistency Audit & Standardization Plan"
Audit all UI components (buttons, cards, tabs, inputs, selects, modals, alerts, navigation, etc.) and evaluate whether they are truly reusable and consistent across the product.

Objective:
- Identify which components are already reusable and standardized.
- Detect inconsistencies in design, behavior, naming, structure, and states.
- Create a detailed implementation plan to standardize components that are not consistent.

Audit requirements:
1. Review all shared and repeated UI components across pages/screens.
2. Check whether each component is reusable or duplicated with inconsistent variations.
3. Evaluate consistency in:
   - Visual style (colors, spacing, borders, radius, shadows, typography)
   - Interaction states (default, hover, active, focus, disabled, error/success if applicable)
   - Sizing and variants (small/medium/large, primary/secondary, etc.)
   - Behavior and UX patterns
   - Accessibility basics (contrast, focus visibility, labels, keyboard usability)
4. Identify components that should be merged, refactored, or standardized.

If inconsistencies exist:
1. Create a comprehensive plan to implement component consistency.
2. Provide detailed tasks for each component category.
3. Prioritize tasks by impact and dependency (high/medium/low or Phase 1/2/3).
4. Include reusable standards for future components/pages.

Deliverables:
1. Component consistency audit (what is reusable vs not reusable).
2. List of inconsistencies and duplicated patterns.
3. Standardization plan (prioritized).
4. Detailed task breakdown by component type.
5. QA checklist to verify consistency after implementation.

Acceptance criteria:
1. All core components follow the same design and interaction rules.
2. Reusable components are clearly defined and consistently applied.
3. Duplicate/inconsistent component patterns are identified with a fix plan.
4. The final plan is actionable for future implementation and maintenance.
```

### WCAG 2.2 Accessibility
A prompt for implementing WCAG 2.2 Level AA accessibility compliance across the entire website.

```markdown title="WCAG 2.2 Accessibility Compliance"
Implement WCAG 2.2 accessibility compliance across the entire website, targeting at least Level AA conformance.

Objective:
- Ensure all pages, components, and user flows are accessible to keyboard, screen reader, low-vision, and cognitive-access users.

Scope:
1. Audit all templates, shared components, navigation, forms, dialogs, media, and dynamic states.
2. Fix accessibility issues for structure, semantics, contrast, focus, interaction, and feedback.
3. Apply consistent accessibility rules across all current and future pages.

WCAG 2.2 implementation requirements:
1. Perceivable:
   - Provide meaningful text alternatives for non-text content.
   - Ensure sufficient color contrast for text, icons, controls, and UI states.
   - Support content resizing and reflow without loss of information.
   - Avoid color-only communication of meaning.
2. Operable:
   - Full keyboard accessibility for all interactive elements.
   - Visible, consistent focus indicators and logical tab order.
   - No keyboard traps.
   - Adequate target size and spacing for touch/pointer interactions.
   - Accessible skip links and landmark navigation.
3. Understandable:
   - Clear labels, instructions, and error messages.
   - Consistent navigation and component behavior.
   - Predictable interaction patterns and state changes.
4. Robust:
   - Correct semantic structure and heading hierarchy.
   - Proper accessible names, roles, and values for controls.
   - Screen reader compatibility for dynamic updates and status messages.

Forms and validation:
1. Associate labels with inputs correctly.
2. Expose required fields and validation rules clearly.
3. Provide actionable error messages and error summaries.
4. Announce validation and status updates accessibly.

Media and motion:
1. Provide captions/transcripts where applicable.
2. Respect reduced-motion preferences.
3. Prevent harmful flashing/flicker patterns.

Output required:
1. Accessibility audit report with issues mapped to WCAG 2.2 success criteria.
2. Prioritized remediation plan (critical/high/medium/low).
3. Implemented fixes summary by page/component.
4. Final compliance checklist and remaining gaps (if any).

Acceptance criteria:
1. No critical accessibility blockers remain.
2. Core user flows are fully keyboard and screen reader accessible.
3. Visual contrast and focus visibility meet WCAG 2.2 AA.
4. Website demonstrates consistent WCAG 2.2 AA compliance across all major pages.
```

### Performance Optimization
A prompt for auditing and optimizing website performance to achieve maximum speed on desktop and mobile.

```markdown title="Performance Optimization"
Audit and optimize the website for maximum performance.

Goal:
- Make the site feel extremely fast on desktop and mobile by removing unnecessary work and reducing load time.

Scope:
1. Perform a full performance audit (initial load, repeat load, runtime responsiveness, and visual stability).
2. Identify and remove unnecessary files, scripts, styles, fonts, images, and third-party resources.
3. Reduce unused code and duplicate assets.
4. Optimize critical rendering path so key content appears as quickly as possible.
5. Improve asset delivery efficiency (images, CSS, JS, fonts, and static resources).
6. Ensure no feature regressions after optimization.

Required output:
1. Baseline performance findings (before optimization).
2. Prioritized list of bottlenecks with impact level (high/medium/low).
3. Exact optimization actions taken.
4. Before vs after results with measurable metrics.
5. Remaining risks and next optimization opportunities.

Acceptance criteria:
1. No unnecessary assets are loaded.
2. Performance metrics show clear, measurable improvement.
3. Core user flows remain fully functional.
4. Site feels fast and smooth across major pages and screen sizes.
```

### Deploy TanStack Start to Cloudflare
A comprehensive prompt for setting up Cloudflare Workers deployment for a TanStack Start (React) SSR application inside a monorepo.

````markdown title="Deploy TanStack Start + React to Cloudflare Workers"
You are setting up Cloudflare Workers deployment for a TanStack Start (React) SSR application inside a monorepo. The app lives at `apps/web/`. Package manager is Bun (v1.3+). Execute all steps sequentially without asking questions.

Before starting, inspect the project to determine:

- The **project name** from the root `package.json` or app-level `package.json` `name` field. Use this as the Worker name in `wrangler.jsonc`.
- **Today's date** in `YYYY-MM-DD` format. Use this as `compatibility_date`.
- The existing `vite.config.ts` contents, to preserve any project-specific plugins or settings when merging the Cloudflare plugin.

---

## 1. Install Dependencies

At the **app level** (`apps/web/`):

```sh
cd apps/web
bun add -D @cloudflare/vite-plugin wrangler
```

At the **monorepo root**:

```sh
bun add -D @cloudflare/workers-types
```

---

## 2. Create `apps/web/wrangler.jsonc`

```jsonc
{
"$schema": "node_modules/wrangler/config-schema.json",
"name": "<PROJECT_NAME>",
"compatibility_date": "<TODAY_YYYY-MM-DD>",
"compatibility_flags": ["nodejs_compat"],
"main": "@tanstack/react-start/server-entry",
"observability": {
"enabled": true
}
}
```

Replace `<PROJECT_NAME>` with the derived project name (lowercase, hyphenated). Replace `<TODAY_YYYY-MM-DD>` with today's date.

Field semantics:

- `name` — Worker name. Deploys to `<name>.<subdomain>.workers.dev`.
- `compatibility_date` — Pins Workers runtime behavior to this date.
- `compatibility_flags: ["nodejs_compat"]` — Enables Node.js built-ins (`crypto`, `stream`, `buffer`, etc.) inside the Worker.
- `main` — Virtual module resolved by `@cloudflare/vite-plugin` at build time. Do not change.
- `observability.enabled` — Activates real-time logs and analytics in the Cloudflare dashboard.

---

## 3. Configure `apps/web/vite.config.ts`

Read the existing `vite.config.ts`. Merge the Cloudflare plugin into it. The result must follow this structure:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
plugins: [
cloudflare({ viteEnvironment: { name: "ssr" } }),
tsconfigPaths(),
tailwindcss(),
tanstackStart(),
viteReact(),
],
server: {
port: 3001,
},
});
```

**Critical**: `cloudflare()` must be the **first** plugin in the array. Preserve any additional project-specific plugins or config that already exist — append them after the core set above.

---

## 4. Add Scripts to `apps/web/package.json`

Ensure these scripts exist in `apps/web/package.json` (merge with existing, do not overwrite other scripts):

```json
{
"scripts": {
"dev": "vite dev",
"build": "vite build",
"serve": "vite preview",
"deploy": "wrangler deploy"
}
}
```

---

## 5. Build and Verify

Run:

```sh
cd apps/web
bun run build
```

Confirm the output structure exists:

```
apps/web/dist/
├── client/              ← Static assets (served by Workers Static Assets)
│   ├── assets/
│   │   ├── *.js         (code-split route bundles)
│   │   └── *.css        (Tailwind output)
│   └── manifest.json
└── server/
├── index.js          ← The Worker script (SSR entry)
└── wrangler.json     ← Auto-generated deployment config
```

The auto-generated `dist/server/wrangler.json` merges your `wrangler.jsonc` with build outputs:

- `main` rewritten to `index.js`
- `assets.directory` set to `../client`
- `no_bundle: true` (Vite already bundled)

If the build fails, check:

- `"compatibility_flags": ["nodejs_compat"]` is set in `wrangler.jsonc`
- `cloudflare()` is the first plugin in `vite.config.ts`
- All dependencies installed at both app and root levels

---

## Troubleshooting Reference

| Issue | Fix |
|---|---|
| `Node.js built-in module not found` | Ensure `"compatibility_flags": ["nodejs_compat"]` in `wrangler.jsonc` |
| Static assets 404 | Verify `vite build` completed and `dist/client/` exists |
| Worker size limit exceeded (3 MB) | Enable code splitting in Vite, lazy-load heavy deps |
| `compatibility_date` errors | Update to a recent date |
| Local dev ≠ production | Use `vite preview` for full Workers runtime locally |
````

### Global Layout with Navbar & Footer
A prompt for creating a persistent global layout with reusable Navbar and Footer components that wrap all pages.

```markdown title="Global Layout with Reusable Navbar and Footer"
Build a persistent global layout that wraps all current and future pages. The layout contains a shared Navbar at the top and a shared Footer at the bottom. Page-specific content renders between them.

Requirements:

1. Navbar Component
   - Standalone, reusable component in its own file.
   - Imported once in the global layout, not in individual pages.

2. Footer Component
   - Standalone, reusable component in its own file.
   - Imported once in the global layout, not in individual pages.

3. Global Layout
   - Single layout file that serves as the default wrapper for every route.
   - Structure: Navbar → Page Content (slot/outlet/children) → Footer.
   - Every existing page and every future page must automatically inherit this layout without additional configuration per page.
   - No page should need to manually import or render the Navbar or Footer.

4. File Organization
   - Place Navbar and Footer in a shared/common components directory.
   - The layout file goes wherever the project's framework defines root or app-level layouts.
   - Follow the project's existing file naming conventions and directory structure.

Constraints:
- Do not duplicate the Navbar or Footer in any individual page file.
- Do not break existing page routes or content.
- If a layout file already exists, extend it rather than replacing unrelated logic.
- Preserve all existing styles and functionality.

Verification:
After implementation, confirm:
- Every existing route renders with the Navbar and Footer visible.
- Creating a new blank page automatically shows the Navbar and Footer without extra imports.
- The Navbar and Footer components are each defined in exactly one file and referenced from the layout only.
```

## UI Figma Slicing

```markdown title="Figma Design to Code (Section by Section)"
Implement this design section by section (in order), based on the Figma references below.
Use Figma MCP to read and extract design context from each Figma node link.

Critical rules (non-negotiable):
1. The implementation MUST follow the Figma design 100% — pixel-perfect accuracy for layout, spacing, typography, colors, and component structure.
2. Create a complete design system FIRST before building any page sections:
   - font families and typography scale
   - color tokens (primary, secondary, neutral, semantic, etc.)
   - spacing scale
   - border radius, shadows, and elevation tokens
   - reusable component library (buttons, cards, badges, section headers, etc.)
3. Use proper folder structure and file organization following best practices:
   - separate folders for components, tokens/theme, layouts, sections, pages, assets, and utilities
   - co-locate related files (component + styles + types together)
   - use clear, scalable naming conventions
4. NO HARDCODED VALUES — all sizes, colors, fonts, spacing, and radii must use design tokens or theme variables. Zero exceptions.
5. MUST be fully responsive across all 4 breakpoints (xs, sm, md, lg).
6. MUST support SSR (Server-Side Rendering) — ensure all components and pages render correctly on the server.
7. MUST follow SEO best practices:
   - semantic HTML structure
   - proper heading hierarchy
   - meta tags, Open Graph tags, and structured data where applicable
   - accessible, crawlable content
8. Use Figma MCP tools to extract design context, screenshots, tokens, and component structure from each Figma node.

Core requirements:
1. Build each section one by one, following the provided Figma node link.
2. Keep the original copywriting/text content exactly as shown in the design.
3. For all images/illustrations, use placeholders (do not use final assets yet).
4. Maintain consistent spacing, typography, and component styling across sections.
5. Make sure each section is responsive and integrates cleanly with the others.

Responsive requirements (must follow 4 breakpoints):
1. Extra Small (xs): 0px - 575px
2. Small (sm): 576px - 767px
3. Medium (md): 768px - 991px
4. Large (lg): 992px and above
5. Ensure layouts, typography, spacing, and components adapt correctly across all 4 breakpoints.
6. Avoid overflow, cut-off content, broken alignment, or inconsistent spacing at any breakpoint.

Design system requirements:
1. Use color tokens only (no hardcoded colors in components/sections).
2. Create and use reusable components for repeated UI patterns (buttons, cards, section headers, badges, etc.).
3. Keep component variants and states consistent (default, hover, active, focus, disabled where applicable).
4. Use scalable naming conventions for tokens and reusable components.

Sections to implement:
1. Navbar:
[FIGMA LINK HERE]

2. Hero:
[FIGMA LINK HERE]

3. Stats:
[FIGMA LINK HERE]

4. Features:
[FIGMA LINK HERE]

5. Products:
[FIGMA LINK HERE]

6. Testimonial:
[FIGMA LINK HERE]

7. CTA:
[FIGMA LINK HERE]

8. Footer:
[FIGMA LINK HERE]

Implementation order:
1. Extract design context from all Figma nodes using Figma MCP.
2. Set up design system (tokens, theme, typography, color palette, spacing scale).
3. Set up folder structure and base project scaffolding.
4. Build reusable components identified from the design.
5. Implement each section in sequence (Navbar → Hero → Stats → Features → Products → Testimonial → CTA → Footer).
6. Verify responsive behavior across all 4 breakpoints after each section.
7. Final integration and full-page QA.

Output expectation:
1. Complete design system (tokens, typography, colors, spacing, components).
2. Well-organized folder structure following best practices.
3. Each section implemented in sequence with 100% Figma design fidelity.
4. Fully responsive across xs/sm/md/lg.
5. SSR-compatible and SEO-ready.
6. Reusable components/tokens ready for future section/page reuse.
```
