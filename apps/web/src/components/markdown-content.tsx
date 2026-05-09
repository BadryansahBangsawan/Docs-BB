import type { ReactNode } from "react";

type MarkdownContentProps = {
	content: string;
};

type TableCell = {
	id: string;
	text: string;
};

type TableRow = {
	cells: TableCell[];
	id: string;
};

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function renderInline(text: string): ReactNode[] {
	const parts: ReactNode[] = [];
	const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
	let cursor = 0;
	let match = pattern.exec(text);

	while (match) {
		if (match.index > cursor) {
			parts.push(text.slice(cursor, match.index));
		}

		const token = match[0];
		if (token.startsWith("`")) {
			parts.push(
				<code
					key={`${token}-${match.index}`}
					className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
				>
					{token.slice(1, -1)}
				</code>,
			);
		} else if (token.startsWith("**")) {
			parts.push(
				<strong
					key={`${token}-${match.index}`}
					className="font-semibold text-foreground"
				>
					{token.slice(2, -2)}
				</strong>,
			);
		} else {
			const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
			if (linkMatch) {
				const href = linkMatch[2];
				const isExternal = /^https?:\/\//.test(href);
				const isDownload = !isExternal && /\.pdf(?:[?#].*)?$/i.test(href);
				parts.push(
					<a
						key={`${token}-${match.index}`}
						className="font-medium text-primary underline underline-offset-4"
						download={isDownload ? href.split("/").pop() : undefined}
						href={href}
						rel={isExternal ? "noreferrer" : undefined}
						target={isExternal ? "_blank" : undefined}
					>
						{linkMatch[1]}
					</a>,
				);
			}
		}

		cursor = match.index + token.length;
		match = pattern.exec(text);
	}

	if (cursor < text.length) {
		parts.push(text.slice(cursor));
	}

	return parts;
}

function isTableRow(line: string) {
	return line.includes("|");
}

function isTableSeparator(line: string) {
	return /^:?-+:?$/.test(line.replace(/^\||\|$/g, "").trim())
		? true
		: line
				.replace(/^\||\|$/g, "")
				.split("|")
				.every((cell) => /^:?-+:?$/.test(cell.trim()));
}

function parseTableRow(
	line: string,
	rowId: string,
	nextCellId: () => string,
): TableRow {
	return line
		.replace(/^\||\|$/g, "")
		.split("|")
		.map((cell) => ({
			id: nextCellId(),
			text: cell.trim(),
		}))
		.reduce<TableRow>(
			(row, cell) => {
				row.cells.push(cell);
				return row;
			},
			{ cells: [], id: rowId },
		);
}

function parseImage(line: string) {
	const match = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);

	if (!match) {
		return null;
	}

	return {
		alt: match[1],
		src: match[2],
		caption: match[3],
	};
}

export function MarkdownContent({ content }: MarkdownContentProps) {
	const elements: ReactNode[] = [];
	const paragraph: string[] = [];
	const listItems: Array<{ id: string; text: string }> = [];
	const tableRows: TableRow[] = [];
	let listItemId = 0;
	let orderedList = false;
	let tableCellId = 0;
	let tableRowId = 0;
	let codeFence: { marker: string; lines: string[] } | null = null;

	function flushParagraph() {
		if (paragraph.length === 0) {
			return;
		}

		elements.push(
			<p
				key={`p-${elements.length}`}
				className="text-[15px] text-muted-foreground leading-7"
			>
				{renderInline(paragraph.join(" "))}
			</p>,
		);
		paragraph.length = 0;
	}

	function flushList() {
		if (listItems.length === 0) {
			return;
		}

		const ListTag = orderedList ? "ol" : "ul";
		elements.push(
			<ListTag
				key={`list-${elements.length}`}
				className={
					orderedList
						? "list-decimal space-y-2 pl-5 text-[15px] text-muted-foreground leading-7"
						: "list-disc space-y-2 pl-5 text-[15px] text-muted-foreground leading-7"
				}
			>
				{listItems.map((item) => (
					<li key={item.id}>{renderInline(item.text)}</li>
				))}
			</ListTag>,
		);
		listItems.length = 0;
	}

	function flushTable() {
		if (tableRows.length === 0) {
			return;
		}

		const [headingRow, ...rows] = tableRows;
		const headings = headingRow.cells;
		elements.push(
			<div
				key={`table-${elements.length}`}
				className="overflow-x-auto rounded-md border"
			>
				<table className="w-full min-w-[640px] border-collapse text-sm">
					<thead className="bg-muted/70 text-foreground">
						<tr>
							{headings.map((heading) => (
								<th
									className="border-b px-3 py-2 text-left font-semibold"
									key={heading.id}
								>
									{renderInline(heading.text)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr className="odd:bg-background even:bg-muted/30" key={row.id}>
								{row.cells.map((cell) => (
									<td
										className="border-b px-3 py-2 text-muted-foreground last:border-r-0"
										key={cell.id}
									>
										{renderInline(cell.text)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>,
		);
		tableRows.length = 0;
	}

	for (const line of content.split("\n")) {
		const trimmedLine = line.trim();
		const fenceMatch = trimmedLine.match(/^(`{3,}|~{3,})/);

		if (codeFence) {
			if (trimmedLine.startsWith(codeFence.marker)) {
				elements.push(
					<pre
						key={`code-${elements.length}`}
						className="overflow-x-auto rounded-md border bg-muted/60 p-4 text-sm leading-6"
					>
						<code>{codeFence.lines.join("\n")}</code>
					</pre>,
				);
				codeFence = null;
				continue;
			}

			codeFence.lines.push(line);
			continue;
		}

		if (fenceMatch) {
			flushParagraph();
			flushList();
			flushTable();
			codeFence = { marker: fenceMatch[1], lines: [] };
			continue;
		}

		const trimmed = trimmedLine;
		if (!trimmed) {
			flushParagraph();
			flushList();
			flushTable();
			continue;
		}

		if (isTableRow(trimmed)) {
			flushParagraph();
			flushList();
			if (!isTableSeparator(trimmed)) {
				tableRows.push(
					parseTableRow(trimmed, `table-row-${tableRowId}`, () => {
						const id = `table-cell-${tableCellId}`;
						tableCellId += 1;
						return id;
					}),
				);
				tableRowId += 1;
			}
			continue;
		}

		flushTable();

		const image = parseImage(trimmed);
		if (image) {
			flushParagraph();
			flushList();
			elements.push(
				<figure
					key={`image-${elements.length}`}
					className="overflow-hidden rounded-lg border bg-muted/30"
				>
					<img
						alt={image.alt}
						className="aspect-video w-full object-cover"
						loading="lazy"
						src={image.src}
					/>
					{image.caption ? (
						<figcaption className="border-t px-4 py-2 text-muted-foreground text-xs">
							{image.caption}
						</figcaption>
					) : null}
				</figure>,
			);
			continue;
		}

		const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
		if (heading) {
			flushParagraph();
			flushList();
			const depth = heading[1].length;
			const text = heading[2];
			const id = slugify(text.replace(/[`*_]/g, ""));
			const Tag = `h${Math.min(depth, 4)}` as "h1" | "h2" | "h3" | "h4";
			const className =
				depth === 1
					? "scroll-mt-24 text-3xl font-semibold tracking-normal text-foreground"
					: depth === 2
						? "scroll-mt-24 pt-4 text-2xl font-semibold tracking-normal text-foreground"
						: "scroll-mt-24 pt-2 text-lg font-semibold tracking-normal text-foreground";

			elements.push(
				<Tag id={id} key={`${id}-${elements.length}`} className={className}>
					{renderInline(text)}
				</Tag>,
			);
			continue;
		}

		const unordered = trimmed.match(/^[-*]\s+(.+)$/);
		const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
		if (unordered || ordered) {
			flushParagraph();
			const isOrdered = Boolean(ordered);
			if (listItems.length > 0 && orderedList !== isOrdered) {
				flushList();
			}
			orderedList = isOrdered;
			listItems.push({
				id: `list-item-${listItemId}`,
				text: (ordered ?? unordered)?.[1] ?? "",
			});
			listItemId += 1;
			continue;
		}

		if (trimmed.startsWith("> ")) {
			flushParagraph();
			flushList();
			elements.push(
				<blockquote
					key={`quote-${elements.length}`}
					className="border-primary/60 border-l-2 pl-4 text-[15px] text-muted-foreground leading-7"
				>
					{renderInline(trimmed.slice(2))}
				</blockquote>,
			);
			continue;
		}

		paragraph.push(trimmed);
	}

	flushParagraph();
	flushList();
	flushTable();

	if (codeFence) {
		elements.push(
			<pre
				key={`code-${elements.length}`}
				className="overflow-x-auto rounded-md border bg-muted/60 p-4 text-sm leading-6"
			>
				<code>{codeFence.lines.join("\n")}</code>
			</pre>,
		);
	}

	return <div className="space-y-5">{elements}</div>;
}
