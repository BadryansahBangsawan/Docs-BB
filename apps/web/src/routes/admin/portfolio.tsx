import { Button } from "@docs-badry/ui/components/button";
import { Skeleton } from "@docs-badry/ui/components/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@docs-badry/ui/components/dropdown-menu";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	MoreHorizontal,
	Pencil,
	Plus,
	Star,
	StarOff,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/portfolio")({
	component: PortfolioPage,
});

function PortfolioPage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const { data: projects, isLoading } = useQuery(
		trpc.portfolio.list.queryOptions(),
	);

	const invalidate = () =>
		queryClient.invalidateQueries({
			queryKey: trpc.portfolio.list.queryKey(),
		});

	const deleteMutation = useMutation(
		trpc.portfolio.delete.mutationOptions({
			onSuccess: () => {
				toast.success("Project deleted");
				invalidate();
			},
		}),
	);

	const toggleFeaturedMutation = useMutation(
		trpc.portfolio.toggleFeatured.mutationOptions({
			onSuccess: () => {
				toast.success("Featured status updated");
				invalidate();
			},
		}),
	);

	return (
		<div className="mx-auto max-w-5xl space-y-4">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Portfolio</h2>
				<Link to="/admin/portfolio/new">
					<Button size="sm">
						<Plus className="size-3.5" />
						New Project
					</Button>
				</Link>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{isLoading
					? Array.from({ length: 6 }).map((_, i) => (
							<Skeleton className="h-48 w-full" key={i} />
						))
					: projects?.map((project) => (
							<div
								className="overflow-hidden rounded-md border bg-card"
								key={project.id}
							>
								{project.image ? (
									<img
										alt={project.title}
										className="aspect-video w-full border-b bg-muted object-cover"
										src={project.image}
									/>
								) : (
									<div className="flex aspect-video items-center justify-center border-b bg-muted">
										<span className="text-muted-foreground text-xs">
											No image
										</span>
									</div>
								)}
								<div className="p-3">
									<div className="flex items-start justify-between gap-2">
										<div className="min-w-0">
											<h3 className="truncate font-medium text-sm">
												{project.title}
											</h3>
											{project.description ? (
												<p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">
													{project.description}
												</p>
											) : null}
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger className="inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted">
												<MoreHorizontal className="size-4" />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														window.location.assign(
															`/admin/portfolio/${project.id}`,
														)
													}
												>
													<Pencil className="size-3.5" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														toggleFeaturedMutation.mutate({
															id: project.id,
														})
													}
												>
													{project.isFeatured ? (
														<>
															<StarOff className="size-3.5" />
															Unfeature
														</>
													) : (
														<>
															<Star className="size-3.5" />
															Feature
														</>
													)}
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() =>
														deleteMutation.mutate({
															id: project.id,
														})
													}
													variant="destructive"
												>
													<Trash2 className="size-3.5" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
									<div className="mt-2 flex flex-wrap gap-1">
										{project.stacks?.slice(0, 4).map((stack: string) => (
											<span
												className="rounded border px-1.5 py-0.5 text-[10px]"
												key={stack}
											>
												{stack}
											</span>
										))}
										{(project.stacks?.length ?? 0) > 4 ? (
											<span className="text-muted-foreground text-[10px]">
												+{(project.stacks?.length ?? 0) - 4}
											</span>
										) : null}
									</div>
									<div className="mt-2 flex items-center gap-2">
										{project.isFeatured ? (
											<span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 text-[10px] dark:text-amber-400">
												Featured
											</span>
										) : null}
										<span
											className={
												project.status === "published"
													? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600 text-[10px] dark:text-emerald-400"
													: "rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-[10px]"
											}
										>
											{project.status}
										</span>
									</div>
								</div>
							</div>
						))}
			</div>

			{!isLoading && !projects?.length ? (
				<p className="py-12 text-center text-muted-foreground text-sm">
					No projects yet.
				</p>
			) : null}
		</div>
	);
}
