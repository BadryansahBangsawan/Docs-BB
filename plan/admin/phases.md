# Admin Page — Implementation Phases

## Phase 1: Foundation (Database + Auth)

**Prioritas: TINGGI — harus selesai duluan**

- [ ] 1.1 Buat Drizzle schema untuk semua tabel di `packages/db/src/schema/`
- [ ] 1.2 Generate & push migration ke Turso
- [ ] 1.3 Buat seed script: migrasi data dari file markdown & profile.ts ke database
- [ ] 1.4 Setup auth: `admin_users` + `sessions` table, hash password (bcrypt/argon2)
- [ ] 1.5 Buat `adminProcedure` di tRPC (cek session cookie)
- [ ] 1.6 Buat `admin.login`, `admin.logout`, `admin.me` procedures
- [ ] 1.7 Buat `/admin/login` route page
- [ ] 1.8 Buat `/admin` layout dengan auth guard + sidebar skeleton

**Output:** Bisa login ke `/admin` dan lihat dashboard kosong.

---

## Phase 2: Document & Category Management

**Prioritas: TINGGI — core feature**

- [ ] 2.1 Buat `documents.*` tRPC procedures (CRUD + publish/unpublish)
- [ ] 2.2 Buat `categories.*` tRPC procedures (CRUD + reorder)
- [ ] 2.3 Buat `/admin/documents` list page (tabel + filter + search)
- [ ] 2.4 Buat `/admin/documents/new` dan `/admin/documents/$id` (form + markdown editor)
- [ ] 2.5 Buat `/admin/categories` page (inline CRUD + drag reorder)
- [ ] 2.6 Update public frontend: ganti `import.meta.glob` markdown → query dari DB
- [ ] 2.7 Buat `/admin` dashboard page (stats cards)

**Output:** Bisa buat, edit, publish artikel dari admin. Public site baca dari DB.

---

## Phase 3: Portfolio & Profile

**Prioritas: SEDANG**

- [ ] 3.1 Buat `portfolio.*` tRPC procedures
- [ ] 3.2 Buat `/admin/portfolio` list + create/edit pages
- [ ] 3.3 Buat `profile.*` tRPC procedures
- [ ] 3.4 Buat `/admin/profile` settings page
- [ ] 3.5 Buat `socialLinks.*` tRPC procedures
- [ ] 3.6 Buat `/admin/social-links` page
- [ ] 3.7 Update public frontend: portfolio & profile baca dari DB

**Output:** Portfolio dan profile bisa dikelola dari admin.

---

## Phase 4: Media & Links

**Prioritas: SEDANG**

- [ ] 4.1 Setup Cloudflare R2 bucket untuk media
- [ ] 4.2 Buat `media.*` tRPC procedures (upload, list, delete)
- [ ] 4.3 Buat `/admin/media` page (grid view + upload zone)
- [ ] 4.4 Integrasikan media picker ke markdown editor & form image fields
- [ ] 4.5 Buat `usefulLinks.*` tRPC procedures
- [ ] 4.6 Buat `/admin/useful-links` page

**Output:** Bisa upload gambar dari admin, pilih gambar dari library.

---

## Phase 5: Analytics & SEO

**Prioritas: RENDAH — nice to have**

- [ ] 5.1 Buat `analytics.track` public procedure (dipanggil di setiap page load)
- [ ] 5.2 Buat tracking component di public frontend
- [ ] 5.3 Buat `analytics.summary`, `topPages`, `topReferrers` procedures
- [ ] 5.4 Buat `/admin/analytics` page (chart + tables)
- [ ] 5.5 Buat `seo.*` procedures
- [ ] 5.6 Buat `/admin/seo` settings page
- [ ] 5.7 Generate sitemap.xml dari published documents

**Output:** Analytics dashboard + SEO management.

---

## Phase 6: Polish & Deploy

- [ ] 6.1 Responsive design: admin sidebar collapse di mobile
- [ ] 6.2 Loading states (skeleton) di semua admin pages
- [ ] 6.3 Error handling & toast notifications (Sonner)
- [ ] 6.4 Dark mode support di admin
- [ ] 6.5 Keyboard shortcuts (Cmd+S save, Cmd+K search)
- [ ] 6.6 Test semua flows end-to-end
- [ ] 6.7 Deploy ke Cloudflare Workers

**Output:** Admin production-ready.

---

## Estimasi Urutan Kerja

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
  ↑          ↑          ↑
  WAJIB      WAJIB      BISA PARALEL DENGAN PHASE 4
```

Phase 1 & 2 adalah minimum viable product (MVP).
Phase 3-6 bisa dikerjakan bertahap setelah MVP jalan.
