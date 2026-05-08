import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	BookOpen,
	FileText,
	FolderOpen,
	Search,
} from "lucide-react";

import { categoryDocs, docs, featuredDocs, navSections } from "@/content/docs";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const totalPages = docs.length;
	const nestedPages = docs.filter((doc) => doc.segments.length > 1).length;

	return (
		<div className="mx-auto max-w-6xl space-y-10">
			<section className="grid gap-8 border-b pb-10 lg:grid-cols-[minmax(0,1fr)_320px]">
				<div className="max-w-3xl">
					<div className="mb-4 inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-muted-foreground text-xs">
						<BookOpen className="size-3.5" />
						Personal docs workspace
					</div>
					<h1 className="font-semibold text-4xl text-foreground tracking-normal sm:text-5xl">
						My Personal Docs
					</h1>
					<p className="mt-5 max-w-2xl text-base text-muted-foreground leading-7">
						A structured place for AI notes, portfolio case studies, project
						references, and useful links.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						{categoryDocs.map((doc) => (
							<a
								className="inline-flex h-9 items-center gap-2 rounded-md border px-3 font-medium text-sm transition-colors hover:bg-muted"
								href={doc.href}
								key={doc.slug}
							>
								{doc.title}
								<ArrowRight className="size-4" />
							</a>
						))}
					</div>
				</div>
				<div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
					<Metric label="Sections" value={navSections.length.toString()} />
					<Metric label="Pages" value={totalPages.toString()} />
					<Metric label="Nested docs" value={nestedPages.toString()} />
				</div>
			</section>

			<section>
				<div className="mb-5 flex items-center justify-between gap-4">
					<div>
						<h2 className="font-semibold text-xl tracking-normal">
							Browse Categories
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							AI notes, portfolio work, project references, and useful
							resources.
						</p>
					</div>
					<Search className="hidden size-5 text-muted-foreground sm:block" />
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{categoryDocs.map((doc) => (
						<a
							className="group rounded-lg border p-5 transition-colors hover:bg-muted/60"
							href={doc.href}
							key={doc.slug}
						>
							<div className="flex items-start gap-4">
								<span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
									<FolderOpen className="size-5" />
								</span>
								<div className="min-w-0">
									<h3 className="font-semibold text-foreground group-hover:underline">
										{doc.title}
									</h3>
									<p className="mt-2 line-clamp-2 text-muted-foreground text-sm leading-6">
										{doc.description}
									</p>
								</div>
							</div>
						</a>
					))}
				</div>
			</section>

			<section>
				<div className="mb-5">
					<h2 className="font-semibold text-xl tracking-normal">
						Recently Added
					</h2>
					<p className="mt-1 text-muted-foreground text-sm">
						Fresh entries from the current docs tree.
					</p>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{featuredDocs.map((doc) => (
						<a
							className="group rounded-lg border p-4 transition-colors hover:bg-muted/60"
							href={doc.href}
							key={doc.slug}
						>
							<FileText className="mb-4 size-5 text-primary" />
							<h3 className="font-semibold text-foreground text-sm group-hover:underline">
								{doc.title}
							</h3>
							<p className="mt-2 line-clamp-3 text-muted-foreground text-sm leading-6">
								{doc.description}
							</p>
						</a>
					))}
				</div>
			</section>
		</div>
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
