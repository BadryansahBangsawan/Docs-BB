export const profile = {
	name: "Badryansah Bangsawan",
	shortName: "Badry",
	username: "@badryansahBangsawan",
	title: "Software Engineer and coding content creator",
	location: "Makassar, Indonesia",
	workMode: "Onsite",
	siteUrl: "https://www.badryansahbangsawan.my.id/en",
	description:
		"A Software Engineer and coding content creator dedicated to building impactful digital solutions. I specialize in developing scalable web platforms using a modern tech stack, primarily Next.js and TypeScript.",
	about: [
		"My focus is on crafting software architecture that is well-structured, maintainable, and aligned with business goals. I combine technical expertise with proactive communication and leadership to ensure every project delivers logical clarity and a meaningful real-world impact.",
		"I'm Badryansah Bangsawan, a Makassar-based Software Engineer dedicated to building impactful digital solutions. I specialize in developing web platforms using a modern tech stack, including Next.js and TypeScript.",
		"My primary focus is crafting software architecture that doesn't just work but is well-structured, maintainable, and scalable to meet business needs. I believe that high-quality code must go hand-in-hand with system efficiency and logical clarity.",
		"I blend technical expertise with proactive communication, critical thinking, and effective time management. I thrive in collaborative environments and leverage leadership skills to ensure every project delivers optimal results and a real-world impact.",
	],
};

export const skills = [
	"HTML",
	"CSS",
	"Bootstrap",
	"TailwindCSS",
	"JavaScript",
	"TypeScript",
	"React.js",
	"Vite",
	"Astro.js",
	"Shadcn UI",
	"NextAuth.js",
	"TanStack",
	"Axios",
	"Zod",
	"Framer Motion",
	"Redux",
	"Prisma",
	"Next.js",
	"Node.js",
	"Express.js",
	"Go",
	"PHP",
	"Laravel",
	"Jetpack Compose",
	"PostgreSql",
	"MySql",
	"Firebase",
	"Supabase",
	"Docker",
	"Npm",
	"Yarn",
	"bun",
	"Github",
];

export const socialLinks = [
	{
		label: "Email",
		href: "mailto:badryansah99@gmail.com",
		description: "Reach out via email for inquiries or collaborations.",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/badryanbangsawan/",
		description: "Follow my creative journey.",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/badryansah-bangsawan-19653a31a/",
		description: "Connect with me professionally.",
	},
	{
		label: "TikTok",
		href: "https://www.tiktok.com/@bcdlopdaa",
		description: "Watch engaging and fun content.",
	},
	{
		label: "GitHub",
		href: "https://github.com/BadryansahBangsawan",
		description: "Explore my open-source work.",
	},
];

export type PortfolioProject = {
	id: number;
	title: string;
	slug: string;
	description: string;
	linkDemo: string | null;
	linkGithub: string | null;
	stacks: string[];
	content: string | null;
	isFeatured: boolean;
	image: string;
};

export const portfolioProjects: PortfolioProject[] = [
	{
		id: 7,
		title: "Nontonkuy",
		slug: "nontonkuy",
		description:
			"Nontonkuy dibangun dengan arsitektur monorepo berbasis Bun + Turborepo, frontend utama memakai Next.js App Router (TypeScript) di Vercel dengan UI Tailwind CSS + shadcn/ui, state data asynchronous dikelola oleh TanStack Query, autentikasi dipisah ke Cloudflare Worker menggunakan Better Auth + Drizzle dengan penyimpanan sesi/user di Cloudflare D1 (SQLite) dan aset banner di Cloudflare R2, sementara integrasi konten dilakukan lewat layer proxy API internal (/api/*) agar sumber data eksternal (Dramabox/Reelshort/Anime provider) bisa dikendalikan cache, error handling, dan fallback-nya dari sisi server web.",
		linkDemo: "https://nontonkuy.badry.asia/",
		linkGithub: "https://github.com/BadryansahBangsawan/nontonkuy",
		stacks: ["Full Stack Next js", "TypeScript"],
		content: null,
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/admin-projects/1772613857936-screenshot-2026-03-04-at-16.34.39-1.webp",
	},
	{
		id: 8,
		title: "Tamplateku",
		slug: "tamplateku",
		description: "Jasa pembuatan website profesional.",
		linkDemo: "https://tamplateku.store/id",
		linkGithub: null,
		stacks: ["Tanstack", "Express", "Tailwind", "Gsap"],
		content: "Jasa pembuatan website menggunakan TanStack.",
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/admin-projects/1776941458227-screenshot-2026-04-23-at-18.50.12.webp",
	},
	{
		id: 6,
		title: "PTKIN 2026",
		slug: "um-ptkin-2026",
		description: "Website informasi penerimaan/seleksi UM-PTKIN 2026.",
		linkDemo: "https://um.ptkin.ac.id/",
		linkGithub: null,
		stacks: ["Next.js", "TypeScript", "TailwindCSS"],
		content: "Category: Education",
		isFeatured: true,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/um-ptkin-2026.png",
	},
	{
		id: 3,
		title: "Grab & Ship",
		slug: "grab-and-ship",
		description:
			"Landing page/website e-commerce untuk layanan belanja dan pengiriman produk.",
		linkDemo: "https://badryansahbangsawan.my.id/#projects",
		linkGithub: null,
		stacks: ["Next.js", "TypeScript", "TailwindCSS"],
		content: "Category: E-commerce",
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/grab-and-ship.png",
	},
	{
		id: 4,
		title: "Saoraja Cafe & Resto",
		slug: "saoraja-cafe-resto",
		description: "Website profil bisnis kuliner untuk Saoraja Cafe & Resto.",
		linkDemo: "https://project3.badry.asia/",
		linkGithub: null,
		stacks: ["Next.js", "TypeScript", "TailwindCSS"],
		content: "Category: Hospitality",
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/saoraja-cafe-resto.png",
	},
	{
		id: 2,
		title: "Mts Darussalam",
		slug: "mts-darussalam",
		description:
			"Website profil sekolah untuk Mts Darussalam dengan fokus informasi dan publikasi pendidikan.",
		linkDemo: "https://www.mtsdarusalam.my.id/",
		linkGithub: null,
		stacks: ["Next.js", "TypeScript", "TailwindCSS"],
		content: "Category: Education",
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/mts-darussalam.png",
	},
	{
		id: 5,
		title: "LKPS",
		slug: "lkps",
		description: "Platform/website untuk kebutuhan edukasi dan pelatihan.",
		linkDemo: "https://lpks-fatih.vercel.app/",
		linkGithub: null,
		stacks: ["Next.js", "TypeScript", "TailwindCSS"],
		content: "Category: Education/Training",
		isFeatured: false,
		image:
			"https://bwwpjdcrelzvdzdcioop.supabase.co/storage/v1/object/public/projects/lkps.png",
	},
];
