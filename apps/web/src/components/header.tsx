import { Button } from "@docs-badry/ui/components/button";
import { BookOpen, Menu, Moon, Search, Sun } from "lucide-react";

type HeaderProps = {
	onOpenSearch: () => void;
	onToggleSidebar: () => void;
	onToggleTheme: () => void;
	theme: "dark" | "light";
};

export default function Header({
	onOpenSearch,
	onToggleSidebar,
	onToggleTheme,
	theme,
}: HeaderProps) {
	return (
		<header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
			<div className="mx-auto flex h-14 w-full max-w-[1480px] items-center gap-3 px-4 sm:px-6 lg:px-8">
				<Button
					aria-label="Open navigation"
					className="lg:hidden"
					onClick={onToggleSidebar}
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					<Menu className="size-4" />
				</Button>
				<a className="flex min-w-0 items-center gap-2 font-semibold" href="/">
					<span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<BookOpen className="size-4" />
					</span>
					<span className="truncate text-sm">Badry Docs</span>
				</a>
				<div className="min-w-0 flex-1" />
				<button
					className="hidden h-8 min-w-[220px] items-center justify-between rounded-md border bg-muted/50 px-3 text-left text-muted-foreground text-xs transition-colors hover:bg-muted sm:flex"
					onClick={onOpenSearch}
					type="button"
				>
					<span className="inline-flex items-center gap-2">
						<Search className="size-3.5" />
						Search docs
					</span>
					<kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px]">
						⌘K
					</kbd>
				</button>
				<Button
					aria-label="Search docs"
					className="sm:hidden"
					onClick={onOpenSearch}
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					<Search className="size-4" />
				</Button>
				<Button
					aria-label="Toggle theme"
					onClick={onToggleTheme}
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					{theme === "dark" ? (
						<Sun className="size-4" />
					) : (
						<Moon className="size-4" />
					)}
				</Button>
			</div>
		</header>
	);
}
