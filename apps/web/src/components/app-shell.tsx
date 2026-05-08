import { Button } from "@docs-badry/ui/components/button";
import { cn } from "@docs-badry/ui/lib/utils";
import { useLocation } from "@tanstack/react-router";
import {
	BookOpen,
	Briefcase,
	FileText,
	Folder,
	Home,
	Layers,
	Link as LinkIcon,
	Search,
	Sparkles,
	X,
} from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { navSections, searchDocs } from "@/content/docs";

import Header from "./header";

type AppShellProps = {
	children: ReactNode;
};

type ThemeMode = "dark" | "light";

const sectionIcons = {
	"ai-llm": Sparkles,
	portfolio: Briefcase,
	project: Layers,
	"useful-link": LinkIcon,
};

export function AppShell({ children }: AppShellProps) {
	const [searchOpen, setSearchOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [theme, setTheme] = useState<ThemeMode>("dark");

	useEffect(() => {
		const savedTheme = window.localStorage.getItem(
			"docs-badry-theme",
		) as ThemeMode | null;
		setTheme(savedTheme === "light" ? "light" : "dark");
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("docs-badry-theme", theme);
	}, [theme]);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setSearchOpen(true);
			}
			if (event.key === "Escape") {
				setSearchOpen(false);
				setSidebarOpen(false);
			}
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<div className="min-h-svh bg-background text-foreground">
			<Header
				onOpenSearch={() => setSearchOpen(true)}
				onToggleSidebar={() => setSidebarOpen((value) => !value)}
				onToggleTheme={() =>
					setTheme((value) => (value === "dark" ? "light" : "dark"))
				}
				theme={theme}
			/>
			<div className="mx-auto flex w-full max-w-[1480px]">
				<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
				<main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
			<SearchDialog isOpen={searchOpen} onOpenChange={setSearchOpen} />
		</div>
	);
}

function Sidebar({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const pathname = useLocation({ select: (location) => location.pathname });

	return (
		<>
			<button
				aria-label="Close navigation"
				className={cn(
					"fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
					isOpen ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={onClose}
				type="button"
			/>
			<aside
				className={cn(
					"fixed top-0 bottom-0 left-0 z-40 w-[280px] border-r bg-background transition-transform lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100svh-3.5rem)] lg:translate-x-0",
					isOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex h-14 items-center justify-between border-b px-4 lg:hidden">
					<a
						className="inline-flex items-center gap-2 font-semibold text-sm"
						href="/"
					>
						<BookOpen className="size-4" />
						Badry Docs
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

							return (
								<section key={section.slug} className="space-y-2">
									<a
										className={cn(
											"flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-sm transition-colors",
											isSectionActive
												? "text-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground",
										)}
										href={section.href}
										onClick={onClose}
									>
										<SectionIcon className="size-4" />
										{section.title}
									</a>
									<div className="space-y-1">
										{section.items.map((item) => {
											const isActive = pathname === item.href;
											return (
												<a
													className={cn(
														"flex min-h-8 items-center gap-2 rounded-md py-1.5 pr-2 text-sm transition-colors",
														isActive
															? "bg-muted text-foreground"
															: "text-muted-foreground hover:bg-muted hover:text-foreground",
													)}
													href={item.href}
													key={item.slug}
													onClick={onClose}
													style={{ paddingLeft: `${12 + item.depth * 14}px` }}
												>
													<FileText className="size-3.5 shrink-0" />
													<span className="min-w-0 truncate">{item.title}</span>
												</a>
											);
										})}
									</div>
								</section>
							);
						})}
					</div>
				</nav>
			</aside>
		</>
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
