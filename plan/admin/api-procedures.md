# Admin Page — tRPC API Procedures

## Auth Procedures

```
admin.login        — mutation(email, password) → session cookie
admin.logout       — mutation() → clear session
admin.me           — query() → current admin user or null
```

## Document Procedures

```
documents.list     — query(filters?) → Document[]
documents.getById  — query(id) → Document
documents.getBySlug — query(slug) → Document (public, untuk frontend)
documents.create   — mutation(input) → Document
documents.update   — mutation(id, input) → Document
documents.delete   — mutation(id) → void
documents.publish  — mutation(id) → Document
documents.unpublish — mutation(id) → Document
documents.reorder  — mutation(items: {id, sortOrder}[]) → void
```

## Category Procedures

```
categories.list    — query() → Category[]
categories.create  — mutation(input) → Category
categories.update  — mutation(id, input) → Category
categories.delete  — mutation(id) → void (error jika masih ada docs)
categories.reorder — mutation(items: {id, sortOrder}[]) → void
```

## Portfolio Procedures

```
portfolio.list     — query(filters?) → Project[]
portfolio.getById  — query(id) → Project
portfolio.create   — mutation(input) → Project
portfolio.update   — mutation(id, input) → Project
portfolio.delete   — mutation(id) → void
portfolio.toggleFeatured — mutation(id) → Project
```

## Profile Procedures

```
profile.get        — query() → Profile (public)
profile.update     — mutation(input) → Profile
```

## Social Links Procedures

```
socialLinks.list   — query() → SocialLink[]
socialLinks.create — mutation(input) → SocialLink
socialLinks.update — mutation(id, input) → SocialLink
socialLinks.delete — mutation(id) → void
socialLinks.reorder — mutation(items: {id, sortOrder}[]) → void
```

## Useful Links Procedures

```
usefulLinks.list   — query() → UsefulLink[]
usefulLinks.create — mutation(input) → UsefulLink
usefulLinks.update — mutation(id, input) → UsefulLink
usefulLinks.delete — mutation(id) → void
```

## Media Procedures

```
media.list         — query(filters?) → Media[]
media.upload       — mutation(file) → Media (upload ke R2, simpan metadata)
media.update       — mutation(id, altText) → Media
media.delete       — mutation(id) → void (hapus dari R2 + DB)
media.getUploadUrl — query() → presigned URL untuk direct upload
```

## Analytics Procedures

```
analytics.track    — mutation(path, referrer?, userAgent?) → void (public, dipanggil dari frontend)
analytics.summary  — query(days?) → { totalViews, uniquePaths, chart: {date, views}[] }
analytics.topPages — query(days?, limit?) → { path, views }[]
analytics.topReferrers — query(days?, limit?) → { referrer, views }[]
```

## SEO Procedures

```
seo.get            — query() → SeoSettings
seo.update         — mutation(input) → SeoSettings
```

## Procedure Types

| Scope | Procedure Base | Usage |
|-------|---------------|-------|
| Public | `publicProcedure` | `documents.getBySlug`, `profile.get`, `analytics.track`, public list queries |
| Admin | `adminProcedure` | Semua mutation + admin-only queries (memerlukan session) |

`adminProcedure` = `protectedProcedure` yang cek session cookie ada & valid.
