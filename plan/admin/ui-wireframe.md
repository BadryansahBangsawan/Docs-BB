# Admin Page — UI Wireframe & Design Notes

## Design Direction

Mengikuti Mercury design system (dark theme) tapi lebih fungsional/dense untuk admin:

- Background: `--color-midnight-slate` (#1e1e2a)
- Cards/panels: `--color-graphite` (#272735) dengan border `--color-lead` (#70707d)
- Accent: `--color-mercury-blue` (#5266eb) untuk primary actions
- Text: `--color-starlight` (#ededf3) primary, `--color-silver` (#c3c3cc) secondary
- Font: `--font-arcadia` untuk semua UI admin
- Komponen: shadcn/ui (sudah ada di project)

---

## Login Page

```
┌─────────────────────────────────────┐
│                                     │
│         [Logo]                      │
│         Admin Login                 │
│                                     │
│    ┌─────────────────────────┐      │
│    │ Email                   │      │
│    └─────────────────────────┘      │
│    ┌─────────────────────────┐      │
│    │ Password                │      │
│    └─────────────────────────┘      │
│                                     │
│    [ Sign In ─────────────── ]      │
│                                     │
│         ← Back to site              │
└─────────────────────────────────────┘
```

Centered card, minimal, Mercury dark bg.

---

## Dashboard

```
┌──────────────────────────────────────────────────┐
│  Stats Cards (4 columns)                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ 24   │ │ 18   │ │ 7    │ │ 1.2k │            │
│  │ Docs │ │ Pub  │ │ Proj │ │ Views│            │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                  │
│  ┌─────────────────────┐ ┌────────────────────┐  │
│  │ Recent Documents    │ │ Quick Actions      │  │
│  │ ─────────────────── │ │                    │  │
│  │ Article A  draft    │ │ + New Document     │  │
│  │ Article B  pub      │ │ + New Project      │  │
│  │ Article C  pub      │ │ → View Site        │  │
│  └─────────────────────┘ └────────────────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ Page Views (7 days) — Line Chart         │    │
│  │ ▁▃▅▇▅▃▁▃▅▇█▇▅                           │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

---

## Document List

```
┌──────────────────────────────────────────────────┐
│  Documents                        [+ New Document]│
│                                                   │
│  [Search...        ] [Category ▼] [Status ▼]     │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ Title          │ Category │ Status │ Date   │  │
│  ├─────────────────────────────────────────────┤  │
│  │ Prompt Master  │ AI & LLM │ ● Pub  │ May 10│  │
│  │ MCP Server     │ AI & LLM │ ○ Draft│ May 8 │  │
│  │ Claude Plugin  │ AI & LLM │ ● Pub  │ May 5 │  │
│  │ About Me       │ Portfolio│ ● Pub  │ May 1 │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  Showing 1-10 of 24                [< 1 2 3 >]   │
└──────────────────────────────────────────────────┘
```

---

## Document Editor

```
┌──────────────────────────────────────────────────┐
│  ← Back to Documents    [Save Draft] [Publish]   │
│                                                   │
│  Title: [Prompt Engineering Master Guide        ] │
│  Slug:  [ai-llm/prompt-master                   ] │
│  Category: [AI & LLM ▼]    Order: [1  ]         │
│  Description: [Learn advanced prompt...         ] │
│                                                   │
│  ┌─────────────────────┬─────────────────────┐   │
│  │ Markdown Editor     │ Live Preview        │   │
│  │                     │                     │   │
│  │ B I H1 H2 Link Img │ # Prompt Master     │   │
│  │ Code List Quote     │                     │   │
│  │ ─────────────────── │ Learn how to write  │   │
│  │ # Prompt Master     │ effective prompts   │   │
│  │                     │ for AI models...    │   │
│  │ Learn how to write  │                     │   │
│  │ effective prompts   │ ## Getting Started  │   │
│  │ for AI models...    │                     │   │
│  │                     │ First, understand   │   │
│  │ ## Getting Started  │ the basics...       │   │
│  └─────────────────────┴─────────────────────┘   │
│                                                   │
│  ▸ SEO Settings                                  │
│    Meta Title: [                                ]│
│    Meta Desc:  [                                ]│
│    OG Image:   [Choose Image]                    │
│                                                   │
│  ▸ Cover Image                                   │
│    [Drop image here or click to upload]          │
└──────────────────────────────────────────────────┘
```

---

## Media Library

```
┌──────────────────────────────────────────────────┐
│  Media Library                    [Upload Files]  │
│                                                   │
│  [Search...        ] [Type ▼]                    │
│                                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ 🖼   │ │ 🖼   │ │ 🖼   │ │ 🖼   │            │
│  │ img1 │ │ img2 │ │ img3 │ │ img4 │            │
│  │ 240kb│ │ 180kb│ │ 320kb│ │ 95kb │            │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
│  ┌──────┐ ┌──────┐                               │
│  │ 🖼   │ │ 🖼   │                               │
│  │ img5 │ │ img6 │                               │
│  │ 150kb│ │ 210kb│                               │
│  └──────┘ └──────┘                               │
│                                                   │
│  ┌──── Upload Zone ─────────────────────────┐    │
│  │                                          │    │
│  │    Drag & drop files here                │    │
│  │    or click to browse                    │    │
│  │                                          │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

---

## Profile Settings

```
┌──────────────────────────────────────────────────┐
│  Profile Settings                     [Save]     │
│                                                   │
│  ┌──── Avatar ────┐  Name: [Badryansah Bangsawan]│
│  │                │  Short: [Badry              ]│
│  │   [Upload]     │  Username: [@badryansah...  ]│
│  └────────────────┘  Title: [Software Engineer  ]│
│                                                   │
│  Location: [Makassar, Indonesia ]                │
│  Work Mode: [Onsite ▼]                          │
│  Site URL: [https://www.badryansahbangsawan...  ]│
│                                                   │
│  Description:                                    │
│  [A Software Engineer and coding content...     ]│
│                                                   │
│  About Paragraphs:                               │
│  [Paragraph 1...                          ] [×]  │
│  [Paragraph 2...                          ] [×]  │
│  [Paragraph 3...                          ] [×]  │
│  [+ Add paragraph]                               │
│                                                   │
│  Skills:                                         │
│  [HTML] [CSS] [TypeScript] [React] [Next.js] ... │
│  [+ Add skill]                                   │
│                                                   │
│  Resume: [Upload PDF]  current: cv.pdf           │
└──────────────────────────────────────────────────┘
```

---

## Component Library (shadcn/ui yang dipakai)

| Component | Penggunaan |
|-----------|-----------|
| `Button` | Semua tombol (primary, secondary, ghost, destructive) |
| `Input`, `Textarea` | Form fields |
| `Select` | Dropdown (category, status, dll) |
| `Table` | Document list, analytics tables |
| `Card` | Stats cards, dashboard panels |
| `Dialog` | Confirm delete, quick edit |
| `Sheet` | Mobile sidebar |
| `Tabs` | Editor tabs (edit/preview), settings sections |
| `Badge` | Status (draft/published), tags |
| `DropdownMenu` | Row actions (edit, delete, publish) |
| `Skeleton` | Loading states |
| `Separator` | Section dividers |
| `Switch` | Toggle (featured, published) |
| `Toast` (Sonner) | Success/error notifications |
