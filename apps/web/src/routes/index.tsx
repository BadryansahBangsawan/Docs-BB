import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, MapPin, Search } from "lucide-react";

import { categoryDocs, docs, navSections } from "@/content/docs";
import {
	portfolioProjects,
	profile,
	skills,
	socialLinks,
} from "@/content/profile";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const totalPages = docs.length;
	const featuredProjects = [...portfolioProjects].sort((a, b) => {
		if (a.isFeatured !== b.isFeatured) {
			return a.isFeatured ? -1 : 1;
		}
		return b.id - a.id;
	});

	return (
		<div className="mx-auto max-w-6xl space-y-10">
			<section className="grid gap-8 border-b pb-10 lg:grid-cols-[minmax(0,1fr)_320px]">
				<div className="max-w-3xl">
					<div className="mb-5 flex items-center gap-4">
						<img
							alt={profile.name}
							className="size-16 rounded-full border bg-white object-cover"
							src="/logo.png"
						/>
						<div className="min-w-0">
							<div className="font-medium text-muted-foreground text-sm">
								{profile.username}
							</div>
							<div className="mt-1 inline-flex items-center gap-1.5 text-muted-foreground text-xs">
								<MapPin className="size-3.5" />
								{profile.location} / {profile.workMode}
							</div>
						</div>
					</div>
					<h1 className="font-semibold text-4xl text-foreground tracking-normal sm:text-5xl">
						Hi, I'm {profile.name}
					</h1>
					<p className="mt-5 max-w-2xl text-base text-muted-foreground leading-7">
						{profile.description}
					</p>
					<p className="mt-4 max-w-2xl text-base text-muted-foreground leading-7">
						{profile.about[0]}
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<a
							className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
							href="/portfolio/projects"
						>
							View projects
							<ArrowRight className="size-4" />
						</a>
						<a
							className="inline-flex h-9 items-center gap-2 rounded-md border px-3 font-medium text-sm transition-colors hover:bg-muted"
							href={profile.siteUrl}
							rel="noreferrer"
							target="_blank"
						>
							Source website
							<ExternalLink className="size-4" />
						</a>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
					<Metric
						label="Portfolio projects"
						value={portfolioProjects.length.toString()}
					/>
					<Metric label="Docs sections" value={navSections.length.toString()} />
					<Metric label="Indexed pages" value={totalPages.toString()} />
				</div>
			</section>

			<section>
				<div className="mb-5 flex items-center justify-between gap-4">
					<div>
						<h2 className="font-semibold text-xl tracking-normal">
							Professional Skills
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							Skills mirrored from the portfolio source site.
						</p>
					</div>
					<Search className="hidden size-5 text-muted-foreground sm:block" />
				</div>
				<div className="flex flex-wrap gap-2">
					{skills.map((skill) => (
						<span
							className="rounded-md border bg-muted/40 px-2.5 py-1.5 font-medium text-xs"
							key={skill}
						>
							{skill}
						</span>
					))}
				</div>
			</section>

			<section>
				<div className="mb-5 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h2 className="font-semibold text-xl tracking-normal">
							Portfolio Projects
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							A showcase of both private and open-source projects built or
							contributed to.
						</p>
					</div>
					<a
						className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
						href="/portfolio/projects"
					>
						All project notes
						<ArrowRight className="size-4" />
					</a>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{featuredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</section>

			<section className="grid gap-6 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_320px]">
				<div>
					<h2 className="font-semibold text-xl tracking-normal">
						Docs Library
					</h2>
					<p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-6">
						The docs are organized into AI notes, portfolio work, and useful
						links so the portfolio data can grow into a working knowledge base.
					</p>
					<div className="mt-5 grid gap-3 sm:grid-cols-2">
						{categoryDocs.map((doc) => (
							<a
								className="group rounded-lg border p-4 transition-colors hover:bg-muted/60"
								href={doc.href}
								key={doc.slug}
							>
								<h3 className="font-semibold text-foreground text-sm group-hover:underline">
									{doc.title}
								</h3>
								<p className="mt-2 line-clamp-2 text-muted-foreground text-sm leading-6">
									{doc.description}
								</p>
							</a>
						))}
					</div>
				</div>
				<div className="rounded-lg border p-4">
					<h2 className="font-semibold text-sm">Contact</h2>
					<div className="mt-3 space-y-2">
						{socialLinks.map((link) => (
							<a
								className="flex items-center justify-between gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted"
								href={link.href}
								key={link.href}
								rel="noreferrer"
								target={link.href.startsWith("http") ? "_blank" : undefined}
							>
								<span>{link.label}</span>
								<ExternalLink className="size-3.5 text-muted-foreground" />
							</a>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

function ProjectCard({
	project,
}: {
	project: (typeof portfolioProjects)[number];
}) {
	const href =
		project.linkDemo ??
		project.linkGithub ??
		`/portfolio/projects/${project.slug}`;

	return (
		<article className="overflow-hidden rounded-lg border bg-card">
			<a href={href} rel="noreferrer" target="_blank">
				<img
					alt={project.title}
					className="aspect-video w-full border-b bg-muted object-cover"
					src={project.image}
				/>
			</a>
			<div className="space-y-3 p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h3 className="font-semibold text-foreground">{project.title}</h3>
						{project.content ? (
							<p className="mt-1 text-muted-foreground text-xs">
								{project.content}
							</p>
						) : null}
					</div>
					{project.isFeatured ? (
						<span className="rounded-md bg-accent px-2 py-1 font-medium text-accent-foreground text-xs">
							Featured
						</span>
					) : null}
				</div>
				<p className="line-clamp-4 text-muted-foreground text-sm leading-6">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-2">
					{project.stacks.map((stack) => (
						<span className="rounded border px-2 py-1 text-xs" key={stack}>
							{stack}
						</span>
					))}
				</div>
				<div className="flex flex-wrap gap-2 pt-1">
					{project.linkDemo ? (
						<a
							className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 font-medium text-xs transition-colors hover:bg-muted"
							href={project.linkDemo}
							rel="noreferrer"
							target="_blank"
						>
							<ExternalLink className="size-3.5" />
							Live Demo
						</a>
					) : null}
					{project.linkGithub ? (
						<a
							className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 font-medium text-xs transition-colors hover:bg-muted"
							href={project.linkGithub}
							rel="noreferrer"
							target="_blank"
						>
							<ExternalLink className="size-3.5" />
							Source Code
						</a>
					) : null}
					<a
						className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 font-medium text-xs transition-colors hover:bg-muted"
						href={`/portfolio/projects/${project.slug}`}
					>
						Docs
						<ArrowRight className="size-3.5" />
					</a>
				</div>
			</div>
		</article>
	);
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border p-4">
			<div className="font-semibold text-2xl tracking-normal">{value}</div>
			<div className="mt-1 text-muted-foreground text-xs">{label}</div>
		</div>
	);
}
