---
title: Nontonkuy
description: Full-stack content platform built with Next.js, Bun, Turborepo, Cloudflare Worker auth, D1, R2, and proxy APIs.
category: Portfolio
author: Badry
date: 2026-05-08
order: 22
---

# Nontonkuy

Nontonkuy dibangun dengan arsitektur monorepo berbasis Bun + Turborepo.

## Stack

- Full Stack Next js
- TypeScript
- Bun
- Turborepo
- Next.js App Router
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Better Auth
- Drizzle
- Cloudflare Worker
- Cloudflare D1
- Cloudflare R2

## Architecture Notes

Frontend utama memakai Next.js App Router di Vercel. Autentikasi dipisah ke Cloudflare Worker menggunakan Better Auth + Drizzle dengan penyimpanan sesi/user di Cloudflare D1.

Integrasi konten dilakukan lewat layer proxy API internal `/api/*` agar sumber data eksternal seperti Dramabox, Reelshort, dan Anime provider bisa dikendalikan cache, error handling, dan fallback-nya dari sisi server web.

## Links

- [Live Demo](https://nontonkuy.badry.asia/)
- [Source Code](https://github.com/BadryansahBangsawan/nontonkuy)
