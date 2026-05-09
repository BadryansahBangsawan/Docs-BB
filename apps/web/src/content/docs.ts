export type DocMeta = {
	title: string;
	description: string;
	category: string;
	author?: string;
	date?: string;
	image?: string;
	order: number;
};

export type DocHeading = {
	id: string;
	depth: number;
	text: string;
};

export type Doc = DocMeta & {
	slug: string;
	href: string;
	body: string;
	headings: DocHeading[];
	segments: string[];
};

export type NavSection = {
	title: string;
	href: string;
	slug: string;
	description: string;
	items: Array<Doc & { depth: number }>;
};

const rawDocs = import.meta.glob("./docs/**/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
}) as Record<string, string>;

const sectionOrder = ["ai-llm", "portfolio", "useful-link"] as const;

function toSlug(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function parseScalar(value: string) {
	const trimmed = value.trim();
	if (/^\d+$/.test(trimmed)) {
		return Number(trimmed);
	}

	return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(source: string) {
	const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
	const data: Record<string, string | number> = {};

	if (!match) {
		return { data, body: source.trim() };
	}

	for (const line of match[1].split("\n")) {
		const separator = line.indexOf(":");
		if (separator === -1) {
			continue;
		}

		const key = line.slice(0, separator).trim();
		const value = line.slice(separator + 1);
		data[key] = parseScalar(value);
	}

	return {
		data,
		body: source.slice(match[0].length).trim(),
	};
}

function extractHeadings(markdown: string): DocHeading[] {
	const headings: DocHeading[] = [];
	let codeFenceMarker: string | null = null;

	for (const line of markdown.split("\n")) {
		const trimmed = line.trim();
		const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);

		if (codeFenceMarker) {
			if (trimmed.startsWith(codeFenceMarker)) {
				codeFenceMarker = null;
			}
			continue;
		}

		if (fenceMatch) {
			codeFenceMarker = fenceMatch[1];
			continue;
		}

		const match = line.match(/^(#{1,4})\s+(.+)$/);
		if (match) {
			const text = match[2].replace(/[`*_]/g, "").trim();
			headings.push({
				id: toSlug(text),
				depth: match[1].length,
				text,
			});
		}
	}

	return headings;
}

function getSlugFromPath(path: string) {
	return path.replace("./docs/", "").replace(/\.md$/, "");
}

function toDoc(path: string, source: string): Doc {
	const slug = getSlugFromPath(path);
	const { data, body } = parseFrontmatter(source);
	const title = typeof data.title === "string" ? data.title : slug;
	const description =
		typeof data.description === "string" ? data.description : "";
	const category = typeof data.category === "string" ? data.category : "Docs";
	const order = typeof data.order === "number" ? data.order : 999;

	return {
		title,
		description,
		category,
		author: typeof data.author === "string" ? data.author : undefined,
		date: typeof data.date === "string" ? data.date : undefined,
		image: typeof data.image === "string" ? data.image : undefined,
		order,
		slug,
		href: `/${slug}`,
		body,
		headings: extractHeadings(body),
		segments: slug.split("/"),
	};
}

function compareDocs(a: Doc, b: Doc) {
	return a.order - b.order || a.slug.localeCompare(b.slug);
}

export const docs = Object.entries(rawDocs)
	.map(([path, source]) => toDoc(path, source))
	.sort(compareDocs);

export const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc]));

export const navSections: NavSection[] = sectionOrder
	.map((slug) => {
		const rootDoc = docsBySlug.get(slug);
		const items = docs
			.filter((doc) => doc.slug.startsWith(`${slug}/`))
			.map((doc) => ({ ...doc, depth: Math.max(0, doc.segments.length - 2) }))
			.sort(compareDocs);

		return {
			title: rootDoc?.title ?? slug,
			href: `/${slug}`,
			slug,
			description: rootDoc?.description ?? "",
			items,
		};
	})
	.filter((section) => docsBySlug.has(section.slug));

export const featuredDocs = docs
	.filter((doc) => doc.segments.length > 1)
	.slice(0, 6);

export const categoryDocs = navSections
	.map((section) => docsBySlug.get(section.slug))
	.filter((doc): doc is Doc => Boolean(doc));

export function getDoc(slug: string) {
	return docsBySlug.get(slug.replace(/^\/+|\/+$/g, ""));
}

export function getChildDocs(slug: string) {
	const depth = slug.split("/").length;
	return docs
		.filter(
			(doc) =>
				doc.slug.startsWith(`${slug}/`) && doc.segments.length === depth + 1,
		)
		.sort(compareDocs);
}

export function getSiblingDocs(doc: Doc) {
	const parent = doc.segments.slice(0, -1).join("/");
	const siblings = docs
		.filter((item) => item.segments.slice(0, -1).join("/") === parent)
		.sort(compareDocs);
	const index = siblings.findIndex((item) => item.slug === doc.slug);

	return {
		previous: index > 0 ? siblings[index - 1] : undefined,
		next:
			index >= 0 && index < siblings.length - 1
				? siblings[index + 1]
				: undefined,
	};
}

export type SearchResult = {
	title: string;
	description: string;
	href: string;
	category: string;
};

export function searchDocs(query: string): SearchResult[] {
	const term = query.toLowerCase().trim();
	const index = docs.flatMap((doc) => [
		{
			title: doc.title,
			description: doc.description,
			href: doc.href,
			category: doc.category,
			haystack:
				`${doc.title} ${doc.description} ${doc.category} ${doc.slug}`.toLowerCase(),
		},
		...doc.headings.map((heading) => ({
			title: heading.text,
			description: doc.title,
			href: `${doc.href}#${heading.id}`,
			category: doc.category,
			haystack: `${heading.text} ${doc.title} ${doc.category}`.toLowerCase(),
		})),
	]);

	if (!term) {
		return index.slice(0, 8);
	}

	return index.filter((item) => item.haystack.includes(term)).slice(0, 10);
}
