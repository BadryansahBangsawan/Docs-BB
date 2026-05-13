import { Button } from "@docs-badry/ui/components/button";
import { cn } from "@docs-badry/ui/lib/utils";
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useLocation,
	useRouter,
} from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	BarChart3,
	Briefcase,
	FileText,
	FolderOpen,
	Home,
	LayoutDashboard,
	Link as LinkIcon,
	LogOut,
	Menu,
	Moon,
	Share2,
	Sun,
	User,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
	beforeLoad: async ({ context, location }) => {
		if (location.pathname === "/admin/login") {
			return;
		}

		const admin = await context.queryClient.fetchQuery(
			context.trpc.admin.me.queryOptions(),
		);

		if (!admin) {
			throw redirect({ to: "/admin/login" });
		}

		return { admin };
	},
});

const adminNav = [
	{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ label: "Documents", href: "/admin/documents", icon: FileText },
	{ label: "Categories", href: "/admin/categories", icon: FolderOpen },
	{ label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
	{ label: "Profile", href: "/admin/profile", icon: User },
	{ label: "Social Links", href: "/admin/social-links", icon: Share2 },
	{ label: "Useful Links", href: "/admin/useful-links", icon: LinkIcon },
] as const;

const secondaryNav = [
	{ label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
] as const;

function AdminLayout() {
	const pathname = useLocation({ select: (l) => l.pathname });

	if (pathname === "/admin/login") {
		return <Outlet />;
	}

	return <AdminShell />;
}

function AdminShell() {
	const trpc = useTRPC();
	const router = useRouter();
	const pathname = useLocation({ select: (l) => l.pathname });
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const { data: admin } = useQuery(trpc.admin.me.queryOptions());

	const logoutMutation = useMutation(
		trpc.admin.logout.mutationOptions({
			onSuccess: () => {
				router.navigate({ to: "/admin/login" });
			},
		}),
	);

	useEffect(() => {
		if (typeof document !== "undefined") {
			setTheme(
				document.documentElement.classList.contains("dark") ? "dark" : "light",
			);
		}
	}, []);

	function toggleTheme() {
		const next = theme === "dark" ? "light" : "dark";
		document.documentElement.classList.toggle("dark", next === "dark");
		document.documentElement.style.colorScheme = next;
		window.localStorage.setItem("docs-badry-theme", next);
		setTheme(next);
	}

	return (
		<div className="flex min-h-svh bg-background text-foreground">
			{/* Mobile overlay */}
			<button
				aria-label="Close navigation"
				className={cn(
					"fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
					sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={() => setSidebarOpen(false)}
				type="button"
			/>

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r bg-background transition-transform duration-200 lg:sticky lg:top-0 lg:h-svh lg:translate-x-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Sidebar header */}
				<div className="flex h-14 items-center justify-between border-b px-4">
					<Link
						className="flex items-center gap-2 font-semibold text-sm"
						to="/admin"
					>
						<img
							alt="Admin"
							className="size-6 rounded-full border bg-white object-cover"
							src="/logo.png"
						/>
						Admin Panel
					</Link>
					<Button
						aria-label="Close sidebar"
						className="lg:hidden"
						onClick={() => setSidebarOpen(false)}
						size="icon-sm"
						variant="ghost"
					>
						<X className="size-4" />
					</Button>
				</div>

				{/* Nav items */}
				<nav className="flex-1 overflow-y-auto px-3 py-4">
					<div className="space-y-1">
						{adminNav.map((item) => {
							const Icon = item.icon;
							const isActive =
								item.href === "/admin"
									? pathname === "/admin"
									: pathname.startsWith(item.href);
							return (
								<Link
									className={cn(
										"flex h-9 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}
									key={item.href}
									onClick={() => setSidebarOpen(false)}
									to={item.href}
								>
									<Icon className="size-4" />
									{item.label}
								</Link>
							);
						})}
					</div>

					<div className="my-4 h-px bg-border" />

					<div className="space-y-1">
						{secondaryNav.map((item) => {
							const Icon = item.icon;
							const isActive = pathname.startsWith(item.href);
							return (
								<Link
									className={cn(
										"flex h-9 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}
									key={item.href}
									onClick={() => setSidebarOpen(false)}
									to={item.href}
								>
									<Icon className="size-4" />
									{item.label}
								</Link>
							);
						})}
					</div>
				</nav>

				{/* Sidebar footer */}
				<div className="border-t px-3 py-3">
					<a
						className="flex h-9 items-center gap-2.5 rounded-md px-3 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
						href="/"
					>
						<Home className="size-4" />
						View Site
					</a>
					<button
						className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
						onClick={() => logoutMutation.mutate()}
						type="button"
					>
						<LogOut className="size-4" />
						Logout
					</button>
				</div>
			</aside>

			{/* Main area */}
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Top bar */}
				<header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
					<Button
						aria-label="Open navigation"
						className="lg:hidden"
						onClick={() => setSidebarOpen(true)}
						size="icon-sm"
						variant="ghost"
					>
						<Menu className="size-4" />
					</Button>
					<div className="min-w-0 flex-1" />
					<Button
						aria-label="Toggle theme"
						onClick={toggleTheme}
						size="icon-sm"
						variant="ghost"
					>
						<Sun className="hidden size-4 dark:block" />
						<Moon className="size-4 dark:hidden" />
					</Button>
					{admin ? (
						<span className="text-muted-foreground text-xs">{admin.name}</span>
					) : null}
				</header>

				{/* Page content */}
				<main className="flex-1 px-4 py-6 sm:px-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
