import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	ChevronRight,
	FileText,
	User,
} from "lucide-react";

import { getChildDocs, getDoc, getSiblingDocs } from "@/content/docs";

import { MarkdownContent } from "./markdown-content";
import { NotFoundPage } from "./not-found-page";

type DocPageProps = {
	slug: string;
};

function formatDate(value?: string) {
	if (!value) {
		return undefined;
	}

	return new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function Breadcrumbs({ slug }: { slug: string }) {
	const segments = slug.split("/");
	const paths = segments.map((segment, index) => ({
		label: segment.replace(/-/g, " "),
		href: `/${segments.slice(0, index + 1).join("/")}`,
	}));

	return (
		<nav className="mb-6 flex flex-wrap items-center gap-1 text-muted-foreground text-xs">
			<a
				className="capitalize transition-colors hover:text-foreground"
				href="/"
			>
				home
			</a>
			{paths.map((item) => (
				<span className="inline-flex items-center gap-1" key={item.href}>
					<ChevronRight className="size-3" />
					<a
						className="capitalize transition-colors hover:text-foreground"
						href={item.href}
					>
						{item.label}
					</a>
				</span>
			))}
		</nav>
	);
}

export function DocPage({ slug }: DocPageProps) {
	const doc = getDoc(slug);

	if (!doc) {
		return <NotFoundPage />;
	}

	const childDocs = getChildDocs(doc.slug);
	const { previous, next } = getSiblingDocs(doc);
	const date = formatDate(doc.date);

	return (
		<div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
			<article className="min-w-0">
				<Breadcrumbs slug={doc.slug} />
				<header className="border-b pb-8">
					<div className="mb-4 flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
						<span className="rounded-md border px-2 py-1">{doc.category}</span>
						{date ? (
							<span className="inline-flex items-center gap-1">
								<Calendar className="size-3.5" />
								{date}
							</span>
						) : null}
						{doc.author ? (
							<span className="inline-flex items-center gap-1">
								<User className="size-3.5" />
								{doc.author}
							</span>
						) : null}
					</div>
					<h1 className="max-w-3xl font-semibold text-4xl text-foreground tracking-normal">
						{doc.title}
					</h1>
					<p className="mt-4 max-w-2xl text-base text-muted-foreground leading-7">
						{doc.description}
					</p>
				</header>
				<div className="py-8">
					<MarkdownContent content={doc.body} />
				</div>
				{childDocs.length > 0 ? (
					<section className="border-t py-8">
						<h2 className="font-semibold text-muted-foreground text-sm uppercase">
							Pages
						</h2>
						<div className="mt-4 grid gap-3 sm:grid-cols-2">
							{childDocs.map((child) => (
								<a
									className="group rounded-lg border p-4 transition-colors hover:bg-muted/60"
									href={child.href}
									key={child.slug}
								>
									<div className="flex items-start gap-3">
										<FileText className="mt-0.5 size-4 shrink-0 text-primary" />
										<div className="min-w-0">
											<h3 className="font-semibold text-foreground text-sm group-hover:underline">
												{child.title}
											</h3>
											<p className="mt-1 line-clamp-2 text-muted-foreground text-sm leading-6">
												{child.description}
											</p>
										</div>
									</div>
								</a>
							))}
						</div>
					</section>
				) : null}
				<nav className="grid gap-3 border-t pt-6 sm:grid-cols-2">
					{previous ? (
						<a
							className="rounded-lg border p-4 transition-colors hover:bg-muted/60"
							href={previous.href}
						>
							<span className="mb-2 inline-flex items-center gap-2 text-muted-foreground text-xs">
								<ArrowLeft className="size-3.5" />
								Previous
							</span>
							<div className="font-medium text-sm">{previous.title}</div>
						</a>
					) : (
						<span />
					)}
					{next ? (
						<a
							className="rounded-lg border p-4 text-right transition-colors hover:bg-muted/60"
							href={next.href}
						>
							<span className="mb-2 inline-flex items-center gap-2 text-muted-foreground text-xs">
								Next
								<ArrowRight className="size-3.5" />
							</span>
							<div className="font-medium text-sm">{next.title}</div>
						</a>
					) : null}
				</nav>
			</article>
			<aside className="hidden xl:block">
				<div className="sticky top-20 space-y-3 border-l pl-4">
					<h2 className="font-semibold text-muted-foreground text-xs uppercase">
						On this page
					</h2>
					<div className="space-y-1">
						{doc.headings.length > 0 ? (
							doc.headings.map((heading) => (
								<a
									className="block truncate py-1 text-muted-foreground text-xs transition-colors hover:text-foreground"
									href={`#${heading.id}`}
									key={`${heading.id}-${heading.text}`}
									style={{
										paddingLeft: `${Math.max(0, heading.depth - 2) * 10}px`,
									}}
								>
									{heading.text}
								</a>
							))
						) : (
							<p className="text-muted-foreground text-xs leading-5">
								No headings
							</p>
						)}
					</div>
				</div>
			</aside>
		</div>
	);
}

export function SectionDocPage({
	section,
	splat,
}: {
	section: string;
	splat?: string;
}) {
	return <DocPage slug={splat ? `${section}/${splat}` : section} />;
}
