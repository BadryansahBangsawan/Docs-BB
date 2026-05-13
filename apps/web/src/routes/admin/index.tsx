import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@docs-badry/ui/components/card";
import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
	BarChart3,
	Briefcase,
	Eye,
	FileText,
	FolderOpen,
	Plus,
} from "lucide-react";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

function AdminDashboard() {
	const trpc = useTRPC();

	const { data: documents, isLoading: docsLoading } = useQuery(
		trpc.documents.list.queryOptions({ limit: 5, offset: 0 }),
	);
	const { data: projects, isLoading: projLoading } = useQuery(
		trpc.portfolio.list.queryOptions(),
	);
	const { data: analytics, isLoading: analyticsLoading } = useQuery(
		trpc.analytics.summary.queryOptions({ days: 7 }),
	);

	const totalDocs = documents?.total ?? 0;
	const publishedDocs =
		documents?.items.filter((d) => d.status === "published").length ?? 0;
	const totalProjects = projects?.length ?? 0;
	const totalViews = analytics?.totalViews ?? 0;

	return (
		<div className="mx-auto max-w-5xl space-y-6">
			{/* Stats */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					icon={FileText}
					isLoading={docsLoading}
					label="Documents"
					value={totalDocs}
				/>
				<StatCard
					icon={Eye}
					isLoading={docsLoading}
					label="Published"
					value={publishedDocs}
				/>
				<StatCard
					icon={Briefcase}
					isLoading={projLoading}
					label="Projects"
					value={totalProjects}
				/>
				<StatCard
					icon={BarChart3}
					isLoading={analyticsLoading}
					label="Views (7d)"
					value={totalViews}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1fr_280px]">
				{/* Recent documents */}
				<Card>
					<CardHeader className="border-b">
						<CardTitle>Recent Documents</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						{docsLoading ? (
							<div className="space-y-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton className="h-8 w-full" key={i} />
								))}
							</div>
						) : documents?.items.length ? (
							<div className="space-y-1">
								{documents.items.map((doc) => (
									<Link
										className="flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-muted"
										key={doc.id}
										to="/admin/documents/$id"
										params={{ id: doc.id }}
									>
										<div className="min-w-0">
											<div className="truncate text-sm">{doc.title}</div>
											<div className="text-muted-foreground text-xs">
												{doc.categoryTitle ?? "Uncategorized"}
											</div>
										</div>
										<span
											className={
												doc.status === "published"
													? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600 text-xs dark:text-emerald-400"
													: "rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 text-xs dark:text-amber-400"
											}
										>
											{doc.status}
										</span>
									</Link>
								))}
							</div>
						) : (
							<p className="py-8 text-center text-muted-foreground text-sm">
								No documents yet.
							</p>
						)}
					</CardContent>
				</Card>

				{/* Quick actions */}
				<Card>
					<CardHeader className="border-b">
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="space-y-1">
							<Link
								className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
								to="/admin/documents/new"
							>
								<Plus className="size-4 text-muted-foreground" />
								New Document
							</Link>
							<Link
								className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
								to="/admin/portfolio/new"
							>
								<Plus className="size-4 text-muted-foreground" />
								New Project
							</Link>
							<Link
								className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
								to="/admin/categories"
							>
								<FolderOpen className="size-4 text-muted-foreground" />
								Manage Categories
							</Link>
							<a
								className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
								href="/"
								target="_blank"
							>
								<Eye className="size-4 text-muted-foreground" />
								View Site
							</a>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Page views chart placeholder */}
			{analytics?.chart && analytics.chart.length > 0 ? (
				<Card>
					<CardHeader className="border-b">
						<CardTitle>Page Views (7 days)</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex h-32 items-end gap-1">
							{analytics.chart.map((day) => {
								const max = Math.max(
									...analytics.chart.map((d) => d.views),
									1,
								);
								const height = (day.views / max) * 100;
								return (
									<div
										className="group relative flex flex-1 flex-col items-center"
										key={day.date}
									>
										<div
											className="w-full rounded-sm bg-primary/20 transition-colors group-hover:bg-primary/40"
											style={{ height: `${Math.max(height, 4)}%` }}
										/>
										<span className="mt-1 text-[10px] text-muted-foreground">
											{day.date.slice(5)}
										</span>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
}

function StatCard({
	icon: Icon,
	label,
	value,
	isLoading,
}: {
	icon: React.ComponentType<{ className?: string }>;
	isLoading: boolean;
	label: string;
	value: number;
}) {
	return (
		<Card>
			<CardContent className="pt-0">
				<div className="flex items-center gap-3">
					<div className="flex size-9 items-center justify-center rounded-md bg-muted">
						<Icon className="size-4 text-muted-foreground" />
					</div>
					<div>
						{isLoading ? (
							<Skeleton className="mb-1 h-6 w-12" />
						) : (
							<div className="font-semibold text-2xl">{value}</div>
						)}
						<div className="text-muted-foreground text-xs">{label}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
