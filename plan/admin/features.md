# Admin Page — Fitur Detail

## 1. Authentication (Login)

**Route:** `/admin/login`

- Form email + password
- Single admin user (kamu saja)
- Cookie-based session (httpOnly, secure)
- Auto-redirect ke `/admin` kalau sudah login
- Logout button di admin header

**Tidak perlu:**
- Register page (admin user di-seed manual)
- Forgot password (reset via CLI/DB)
- OAuth/social login

---

## 2. Dashboard (`/admin`)

Halaman utama setelah login. Menampilkan ringkasan:

- Total artikel (published / draft)
- Total portfolio projects
- Total useful links
- Recent page views (7 hari terakhir) — chart sederhana
- Quick actions: buat artikel baru, tambah project

---

## 3. Document/Article Management (`/admin/documents`)

### List View
- Tabel: title, category, status (draft/published), date, actions
- Filter by category, status
- Search by title
- Sort by date, title, order

### Create/Edit (`/admin/documents/new`, `/admin/documents/:id`)
- Form fields:
  - Title (text input)
  - Slug (auto-generate dari title, bisa edit manual)
  - Category (dropdown dari `categories` table)
  - Description (textarea)
  - Body (markdown editor dengan live preview)
  - Cover image (upload ke R2)
  - Author (text, default: profile name)
  - Sort order (number)
  - Status toggle (draft/published)
- SEO section (collapsible):
  - Meta title override
  - Meta description override
  - OG image (upload/select)
- Actions: Save as Draft, Publish, Delete

### Markdown Editor
- Textarea kiri + preview kanan (split view)
- Toolbar: bold, italic, heading, link, image, code block, list
- Image insert: upload ke R2, paste URL yang sudah di-upload
- Syntax highlighting di preview
- Keyboard shortcuts (Ctrl+B bold, dll)

---

## 4. Category Management (`/admin/categories`)

- List: title, slug, description, document count, sort order
- CRUD inline atau modal
- Drag-and-drop reorder
- Cannot delete category yang masih punya documents (warning)

---

## 5. Portfolio Management (`/admin/portfolio`)

### List View
- Card grid atau tabel: title, image thumbnail, stacks, featured badge, status
- Filter: featured, status

### Create/Edit (`/admin/portfolio/new`, `/admin/portfolio/:id`)
- Form fields:
  - Title
  - Slug
  - Description (textarea)
  - Content/detail (markdown editor)
  - Demo link
  - GitHub link
  - Tech stacks (tag input — multi-select)
  - Cover image (upload)
  - Featured toggle
  - Sort order

---

## 6. Profile Settings (`/admin/profile`)

Single form to edit profile data:

- Name, short name, username
- Title/role
- Location, work mode
- Site URL
- Description (textarea)
- About paragraphs (dynamic list — add/remove/reorder)
- Skills (tag input — add/remove/reorder)
- Avatar (upload)
- Resume/CV (upload PDF)

---

## 7. Social Links (`/admin/social-links`)

- List: label, URL, icon, sort order
- CRUD inline atau modal
- Drag-and-drop reorder
- Icon picker (dari Lucide icons)

---

## 8. Useful Links (`/admin/useful-links`)

- List: title, URL, category, sort order
- CRUD inline
- Group by category

---

## 9. Media Library (`/admin/media`)

- Grid view: thumbnail, filename, size, date
- Upload: drag-and-drop zone + file picker
- Upload target: Cloudflare R2
- Actions: copy URL, delete, edit alt text
- Filter by type (image, document)
- Search by filename

---

## 10. Analytics (`/admin/analytics`)

Dashboard sederhana:

- Page views chart (line chart — 7/30 hari)
- Top pages (tabel: path, views)
- Top referrers
- Views by country (kalau ada geo data)
- No external service needed — data dari `page_views` table

---

## 11. SEO Settings (`/admin/seo`)

Global SEO defaults:

- Default meta title template
- Default meta description
- Default OG image
- Sitemap generation toggle
- robots.txt content

Per-page SEO sudah ada di document editor (section SEO).
