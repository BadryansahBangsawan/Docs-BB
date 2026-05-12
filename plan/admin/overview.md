# Admin Page — Overview

## Tujuan

Membangun admin dashboard (`/admin`) untuk mengelola seluruh konten website dokumentasi personal tanpa harus edit file markdown secara manual.

## Status Saat Ini

| Aspek | Kondisi |
|-------|---------|
| Konten artikel | File-based markdown di `apps/web/src/content/docs/` |
| Portfolio/Project | Hardcoded di `apps/web/src/content/profile.ts` |
| Profile & Skills | Hardcoded di `apps/web/src/content/profile.ts` |
| Database | Turso (libSQL) via Drizzle ORM — schema masih kosong |
| Auth | Belum ada |
| tRPC API | Sudah setup, belum ada procedure untuk konten |

## Target Akhir

Admin dashboard yang bisa:
1. CRUD artikel/dokumen (dengan markdown editor)
2. Manage kategori & section
3. Manage portfolio projects
4. Manage profile, skills, social links
5. Manage useful links
6. Upload & manage media/gambar
7. SEO settings per halaman
8. Simple analytics/visitor stats
9. Draft/publish workflow

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | TanStack Router (`/admin/*` routes), shadcn/ui, Tailwind 4 |
| Editor | Markdown editor (MDXEditor atau custom textarea + preview) |
| API | tRPC procedures di `packages/api` |
| Database | Turso (libSQL) via Drizzle ORM |
| Auth | Simple password-based (single user) — cookie session |
| Storage | Cloudflare R2 untuk media upload |
| Deploy | Cloudflare Workers (sama dengan web) |

## Arsitektur Perubahan

```
SEBELUM (File-based):
  markdown files → import.meta.glob → static render

SESUDAH (Database-driven):
  Admin UI → tRPC mutation → Turso DB
  Public site → tRPC query / loader → render dari DB
  (Fallback: tetap bisa baca file markdown sebagai seed data)
```
