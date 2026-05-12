# Admin Page — Database Schema

## Tabel yang Dibutuhkan

### 1. `admin_users` — Single admin auth

```sql
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 2. `sessions` — Cookie session management

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES admin_users(id),
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 3. `categories` — Section/kategori dokumen

```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT,            -- lucide icon name
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

Seed data: `ai-llm`, `portfolio`, `useful-link`

### 4. `documents` — Artikel/dokumen utama

```sql
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,        -- full path: "ai-llm/prompt-master"
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  body TEXT NOT NULL DEFAULT '',     -- markdown content
  category_id TEXT NOT NULL REFERENCES categories(id),
  author TEXT,
  image TEXT,                        -- cover image URL
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',  -- draft | published
  published_at INTEGER,
  meta_title TEXT,                   -- SEO override
  meta_description TEXT,             -- SEO override
  og_image TEXT,                     -- Open Graph image
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 5. `portfolio_projects` — Project portfolio

```sql
CREATE TABLE portfolio_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  content TEXT,                      -- markdown detail
  link_demo TEXT,
  link_github TEXT,
  stacks TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  image TEXT NOT NULL DEFAULT '',
  is_featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 6. `profile` — Profile settings (single row)

```sql
CREATE TABLE profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  short_name TEXT,
  username TEXT,
  title TEXT,
  location TEXT,
  work_mode TEXT,
  site_url TEXT,
  description TEXT,
  about TEXT NOT NULL DEFAULT '[]',   -- JSON array of paragraphs
  skills TEXT NOT NULL DEFAULT '[]',  -- JSON array of strings
  avatar_url TEXT,
  resume_url TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 7. `social_links` — Social media links

```sql
CREATE TABLE social_links (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT,                          -- lucide icon name
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 8. `useful_links` — Resource/link collection

```sql
CREATE TABLE useful_links (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 9. `media` — Uploaded files tracking

```sql
CREATE TABLE media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,                  -- R2 public URL
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,              -- bytes
  alt_text TEXT DEFAULT '',
  uploaded_by TEXT REFERENCES admin_users(id),
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
```

### 10. `page_views` — Simple analytics

```sql
CREATE TABLE page_views (
  id TEXT PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  viewed_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Index for fast aggregation
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
```

## Migration Strategy

1. Buat schema Drizzle di `packages/db/src/schema/`
2. Generate migration: `bun run db:generate`
3. Push ke Turso: `bun run db:push`
4. Seed data dari file markdown & profile.ts yang sudah ada
