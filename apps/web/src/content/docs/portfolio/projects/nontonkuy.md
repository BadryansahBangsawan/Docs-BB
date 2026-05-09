---
title: Nontonkuy
description: Full-stack content platform built with Next.js, Bun, Turborepo, Cloudflare Worker auth, D1, R2, and proxy APIs.
category: Portfolio
author: Badry
date: 2026-05-08
image: https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/admin-projects/1772613857936-screenshot-2026-03-04-at-16.34.39-1.webp
order: 22
---

# Nontonkuy

![Nontonkuy screenshot](https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/admin-projects/1772613857936-screenshot-2026-03-04-at-16.34.39-1.webp "Nontonkuy")

Nontonkuy adalah full-stack content platform yang dibangun dengan arsitektur monorepo berbasis Bun dan Turborepo. Project ini tidak hanya berisi tampilan katalog konten, tetapi juga memisahkan tanggung jawab frontend, autentikasi, database, storage, dan proxy API agar integrasi konten lebih mudah dikendalikan.

Frontend utama berjalan dengan Next.js App Router dan TypeScript. Data asynchronous dikelola memakai TanStack Query, sedangkan UI dibangun dengan Tailwind CSS dan shadcn/ui untuk menjaga pola komponen tetap konsisten.

Autentikasi dipisah ke Cloudflare Worker menggunakan Better Auth dan Drizzle. Penyimpanan sesi dan user memakai Cloudflare D1, sementara aset banner memakai Cloudflare R2. Integrasi konten dilakukan lewat layer proxy API internal `/api/*` supaya sumber eksternal seperti Dramabox, Reelshort, dan Anime provider bisa diberi cache, error handling, dan fallback dari sisi server.

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

## Detail

- Monorepo membantu memisahkan web app, worker auth, dan package pendukung tanpa memecah workflow developer.
- Proxy API internal mengurangi ketergantungan langsung frontend ke provider eksternal.
- D1 dan R2 dipakai untuk menjaga deployment tetap dekat dengan runtime Cloudflare.
- Struktur ini cocok untuk platform konten yang perlu login, penyimpanan aset, dan integrasi provider yang dapat berubah.

## Links

- [Live Demo](https://nontonkuy.badry.asia/)
- [Source Code](https://github.com/BadryansahBangsawan/nontonkuy)
