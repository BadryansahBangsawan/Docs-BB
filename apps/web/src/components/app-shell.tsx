import { Button } from "@docs-badry/ui/components/button";
import { cn } from "@docs-badry/ui/lib/utils";
import { useLocation } from "@tanstack/react-router";
import {
	Briefcase,
	ChevronDown,
	FileText,
	Folder,
	Home,
	Link as LinkIcon,
	Search,
	Sparkles,
	X,
} from "lucide-react";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { type NavSection, navSections, searchDocs } from "@/content/docs";
import { profile } from "@/content/profile";

import Header from "./header";

type AppShellProps = {
	children: ReactNode;
};

type ThemeMode = "dark" | "light";

const sectionIcons = {
	"ai-llm": Sparkles,
	portfolio: Briefcase,
	"useful-link": LinkIcon,
};

const themeStorageKey = "docs-badry-theme";

type NavItem = NavSection["items"][number];
type NavTreeNode = NavItem & {
	children: NavTreeNode[];
};

function getCurrentTheme(): ThemeMode {
	if (typeof document === "undefined") {
		return "light";
	}

	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
	window.localStorage.setItem(themeStorageKey, theme);
}

function buildNavTree(items: NavItem[]) {
	const nodeMap = new Map<string, NavTreeNode>();
	const roots: NavTreeNode[] = [];

	for (const item of items) {
		nodeMap.set(item.slug, { ...item, children: [] });
	}

	for (const item of items) {
		const node = nodeMap.get(item.slug);
		const parentSlug = item.segments.slice(0, -1).join("/");
		const parent = nodeMap.get(parentSlug);

		if (!node) {
			continue;
		}

		if (parent) {
			parent.children.push(node);
		} else {
			roots.push(node);
		}
	}

	return roots;
}

function getActiveParentGroups(pathname: string) {
	const activeSection = navSections.find(
		(section) =>
			pathname === section.href || pathname.startsWith(`${section.href}/`),
	);
	const activeItem = activeSection?.items.find(
		(item) => pathname === item.href,
	);

	if (!activeSection || !activeItem) {
		return [];
	}

	return activeItem.segments
		.slice(0, -1)
		.map((_, index, segments) => segments.slice(0, index + 1).join("/"))
		.filter((slug) => slug !== activeSection.slug);
}

export function AppShell({ children }: AppShellProps) {
	const [searchOpen, setSearchOpen] = useState(false);
	const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [theme, setTheme] = useState<ThemeMode>("light");

	useEffect(() => {
		setTheme(getCurrentTheme());
	}, []);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setSearchOpen(true);
			}
			if (event.key === "Escape") {
				setSearchOpen(false);
				setMobileSidebarOpen(false);
			}
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<div className="min-h-svh bg-background text-foreground">
			<Header
				isDesktopSidebarOpen={desktopSidebarOpen}
				onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
				onOpenSearch={() => setSearchOpen(true)}
				onToggleDesktopSidebar={() => setDesktopSidebarOpen((value) => !value)}
				onToggleTheme={() => {
					const nextTheme = theme === "dark" ? "light" : "dark";
					applyTheme(nextTheme);
					setTheme(nextTheme);
				}}
			/>
			<div className="mx-auto flex w-full max-w-[1480px]">
				<Sidebar
					isDesktopOpen={desktopSidebarOpen}
					isMobileOpen={mobileSidebarOpen}
					onClose={() => setMobileSidebarOpen(false)}
				/>
				<main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
			<SearchDialog isOpen={searchOpen} onOpenChange={setSearchOpen} />
		</div>
	);
}

function Sidebar({
	isDesktopOpen,
	isMobileOpen,
	onClose,
}: {
	isDesktopOpen: boolean;
	isMobileOpen: boolean;
	onClose: () => void;
}) {
	const pathname = useLocation({ select: (location) => location.pathname });
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(
		() =>
			Object.fromEntries(
				navSections.map((section) => [
					section.slug,
					pathname === section.href || pathname.startsWith(`${section.href}/`),
				]),
			),
	);
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(
			getActiveParentGroups(pathname).map((slug) => [slug, true]),
		),
	);

	useEffect(() => {
		const activeSection = navSections.find(
			(section) =>
				pathname === section.href || pathname.startsWith(`${section.href}/`),
		);

		if (!activeSection) {
			return;
		}

		setOpenSections((value) => ({ ...value, [activeSection.slug]: true }));

		const activeItem = activeSection.items.find(
			(item) => pathname === item.href,
		);
		if (!activeItem) {
			return;
		}

		const parentSlugs = activeItem.segments
			.slice(0, -1)
			.map((_, index, segments) => segments.slice(0, index + 1).join("/"))
			.filter((slug) => slug !== activeSection.slug);

		if (parentSlugs.length > 0) {
			setOpenGroups((value) => ({
				...value,
				...Object.fromEntries(parentSlugs.map((slug) => [slug, true])),
			}));
		}
	}, [pathname]);

	return (
		<>
			<button
				aria-label="Close navigation"
				className={cn(
					"fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
					isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={onClose}
				type="button"
			/>
			<aside
				className={cn(
					"fixed top-0 bottom-0 left-0 z-40 w-[280px] border-r bg-background transition-[transform,width] duration-200 lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100svh-3.5rem)] lg:overflow-hidden",
					isMobileOpen ? "translate-x-0" : "-translate-x-full",
					isDesktopOpen
						? "lg:w-[280px] lg:translate-x-0"
						: "lg:w-0 lg:-translate-x-full lg:border-r-0",
				)}
			>
				<div className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
					<a
						className="inline-flex items-center gap-2 font-semibold text-sm"
						href="/"
					>
						<img
							alt={`${profile.shortName} logo`}
							className="size-5 rounded-full bg-white object-cover"
							src="/logo.png"
						/>
						{profile.shortName} Docs
					</a>
					<Button
						aria-label="Close navigation"
						onClick={onClose}
						size="icon-sm"
						type="button"
						variant="ghost"
					>
						<X className="size-4" />
					</Button>
				</div>
				<nav className="h-full overflow-y-auto px-3 py-4">
					<a
						className={cn(
							"mb-4 flex h-9 items-center gap-2 rounded-md px-3 font-medium text-sm transition-colors",
							pathname === "/"
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
						href="/"
						onClick={onClose}
					>
						<Home className="size-4" />
						Home
					</a>
					<div className="space-y-5">
						{navSections.map((section) => {
							const SectionIcon =
								sectionIcons[section.slug as keyof typeof sectionIcons] ??
								Folder;
							const isSectionActive =
								pathname === section.href ||
								pathname.startsWith(`${section.href}/`);
							const isOpen = openSections[section.slug] ?? false;
							const tree = buildNavTree(section.items);

							return (
								<section key={section.slug} className="space-y-2">
									<div
										className={cn(
											"flex items-center rounded-md transition-colors",
											isSectionActive
												? "bg-muted text-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground",
										)}
									>
										<a
											className="flex min-h-9 min-w-0 flex-1 items-center gap-2 px-3 font-semibold text-sm"
											href={section.href}
											onClick={onClose}
										>
											<SectionIcon className="size-4 shrink-0" />
											<span className="min-w-0 truncate">{section.title}</span>
										</a>
										<button
											aria-expanded={isOpen}
											aria-label={`${isOpen ? "Collapse" : "Expand"} ${section.title}`}
											className="flex size-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-background/80"
											onClick={() =>
												setOpenSections((value) => ({
													...value,
													[section.slug]: !isOpen,
												}))
											}
											type="button"
										>
											<ChevronDown
												className={cn(
													"size-4 transition-transform",
													isOpen ? "rotate-0" : "-rotate-90",
												)}
											/>
										</button>
									</div>
									{isOpen ? (
										<div className="space-y-1">
											{tree.map((item) => (
												<SidebarTreeItem
													item={item}
													key={item.slug}
													onClose={onClose}
													openGroups={openGroups}
													pathname={pathname}
													setOpenGroups={setOpenGroups}
												/>
											))}
										</div>
									) : null}
								</section>
							);
						})}
					</div>
				</nav>
			</aside>
		</>
	);
}

function SidebarTreeItem({
	item,
	onClose,
	openGroups,
	pathname,
	setOpenGroups,
}: {
	item: NavTreeNode;
	onClose: () => void;
	openGroups: Record<string, boolean>;
	pathname: string;
	setOpenGroups: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
	const isActive = pathname === item.href;
	const hasChildren = item.children.length > 0;
	const isOpen = openGroups[item.slug] ?? false;
	const paddingLeft = 12 + item.depth * 14;

	return (
		<div>
			<div
				className={cn(
					"flex items-center rounded-md transition-colors",
					isActive
						? "bg-muted text-foreground"
						: "text-muted-foreground hover:bg-muted hover:text-foreground",
				)}
			>
				<a
					className="flex min-h-8 min-w-0 flex-1 items-center gap-2 py-1.5 pr-2 text-sm"
					href={item.href}
					onClick={onClose}
					style={{ paddingLeft }}
				>
					<FileText className="size-3.5 shrink-0" />
					<span className="min-w-0 truncate">{item.title}</span>
				</a>
				{hasChildren ? (
					<button
						aria-expanded={isOpen}
						aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.title}`}
						className="flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-background/80"
						onClick={() =>
							setOpenGroups((value) => ({
								...value,
								[item.slug]: !isOpen,
							}))
						}
						type="button"
					>
						<ChevronDown
							className={cn(
								"size-3.5 transition-transform",
								isOpen ? "rotate-0" : "-rotate-90",
							)}
						/>
					</button>
				) : null}
			</div>
			{hasChildren && isOpen ? (
				<div className="mt-1 space-y-1">
					{item.children.map((child) => (
						<SidebarTreeItem
							item={child}
							key={child.slug}
							onClose={onClose}
							openGroups={openGroups}
							pathname={pathname}
							setOpenGroups={setOpenGroups}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

function SearchDialog({
	isOpen,
	onOpenChange,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const results = useMemo(() => searchDocs(query), [query]);

	useEffect(() => {
		if (isOpen) {
			window.setTimeout(() => inputRef.current?.focus(), 0);
		} else {
			setQuery("");
		}
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-50 bg-background/70 px-4 pt-20 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
		>
			<button
				aria-label="Close search"
				className="absolute inset-0 size-full"
				onClick={() => onOpenChange(false)}
				type="button"
			/>
			<div className="relative mx-auto max-w-2xl overflow-hidden rounded-lg border bg-popover shadow-2xl">
				<div className="flex items-center gap-3 border-b px-4">
					<Search className="size-4 text-muted-foreground" />
					<input
						className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search docs"
						ref={inputRef}
						value={query}
					/>
					<Button
						aria-label="Close search"
						onClick={() => onOpenChange(false)}
						size="icon-sm"
						type="button"
						variant="ghost"
					>
						<X className="size-4" />
					</Button>
				</div>
				<div className="max-h-[420px] overflow-y-auto p-2">
					{results.length > 0 ? (
						<div className="space-y-1">
							{results.map((result) => (
								<a
									className="block rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
									href={result.href}
									key={`${result.href}-${result.title}`}
									onClick={() => onOpenChange(false)}
								>
									<div className="flex items-center justify-between gap-3">
										<span className="font-medium text-foreground text-sm">
											{result.title}
										</span>
										<span className="shrink-0 text-muted-foreground text-xs">
											{result.category}
										</span>
									</div>
									<p className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-5">
										{result.description}
									</p>
								</a>
							))}
						</div>
					) : (
						<div className="px-3 py-8 text-center text-muted-foreground text-sm">
							No results
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
