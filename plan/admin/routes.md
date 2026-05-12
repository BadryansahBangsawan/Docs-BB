# Admin Page — Route Structure

## Route Tree

```
apps/web/src/routes/
├── admin.tsx                    # Admin layout (auth guard + sidebar)
├── admin/
│   ├── index.tsx                # Dashboard
│   ├── login.tsx                # Login page (no auth required)
│   ├── documents.tsx            # Document list
│   ├── documents/
│   │   ├── new.tsx              # Create document
│   │   └── $id.tsx              # Edit document
│   ├── categories.tsx           # Category management
│   ├── portfolio.tsx            # Portfolio list
│   ├── portfolio/
│   │   ├── new.tsx              # Create project
│   │   └── $id.tsx              # Edit project
│   ├── profile.tsx              # Profile settings
│   ├── social-links.tsx         # Social links management
│   ├── useful-links.tsx         # Useful links management
│   ├── media.tsx                # Media library
│   ├── analytics.tsx            # Analytics dashboard
│   └── seo.tsx                  # Global SEO settings
```

## Admin Layout (`admin.tsx`)

```
┌─────────────────────────────────────────────┐
│  Admin Header (logo, user menu, logout)     │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Sidebar  │     Main Content Area            │
│          │                                  │
│ Dashboard│     <Outlet />                   │
│ Documents│                                  │
│ Categories│                                 │
│ Portfolio│                                  │
│ Profile  │                                  │
│ Social   │                                  │
│ Links    │                                  │
│ Media    │                                  │
│ Analytics│                                  │
│ SEO      │                                  │
│          │                                  │
│ ──────── │                                  │
│ View Site│                                  │
│ Logout   │                                  │
├──────────┴──────────────────────────────────┤
```

## Auth Guard

`admin.tsx` layout harus:
1. Cek session cookie
2. Kalau tidak ada session → redirect ke `/admin/login`
3. Kalau ada session → render layout + sidebar + outlet
4. `/admin/login` adalah satu-satunya route tanpa auth guard

## Sidebar Navigation Items

```typescript
const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Documents", href: "/admin/documents", icon: "FileText" },
  { label: "Categories", href: "/admin/categories", icon: "FolderOpen" },
  { label: "Portfolio", href: "/admin/portfolio", icon: "Briefcase" },
  { label: "Profile", href: "/admin/profile", icon: "User" },
  { label: "Social Links", href: "/admin/social-links", icon: "Share2" },
  { label: "Useful Links", href: "/admin/useful-links", icon: "Link" },
  { label: "Media", href: "/admin/media", icon: "Image" },
  // separator
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { label: "SEO", href: "/admin/seo", icon: "Search" },
];
```
