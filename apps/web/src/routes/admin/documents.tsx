import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
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
	Eye,
	EyeOff,
	MoreHorizontal,
	Pencil,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/documents")({
	component: DocumentsPage,
});

function DocumentsPage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<
		"draft" | "published" | undefined
	>();
	const [page, setPage] = useState(0);
	const limit = 20;

	const { data, isLoading } = useQuery(
		trpc.documents.list.queryOptions({
			search: search || undefined,
			status: statusFilter,
			limit,
			offset: page * limit,
		}),
	);

	const deleteMutation = useMutation(
		trpc.documents.delete.mutationOptions({
			onSuccess: () => {
				toast.success("Document deleted");
				queryClient.invalidateQueries({ queryKey: trpc.documents.list.queryKey() });
			},
		}),
	);

	const publishMutation = useMutation(
		trpc.documents.publish.mutationOptions({
			onSuccess: () => {
				toast.success("Document published");
				queryClient.invalidateQueries({ queryKey: trpc.documents.list.queryKey() });
			},
		}),
	);

	const unpublishMutation = useMutation(
		trpc.documents.unpublish.mutationOptions({
			onSuccess: () => {
				toast.success("Document unpublished");
				queryClient.invalidateQueries({ queryKey: trpc.documents.list.queryKey() });
			},
		}),
	);

	const totalPages = data ? Math.ceil(data.total / limit) : 0;

	return (
		<div className="mx-auto max-w-5xl space-y-4">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Documents</h2>
				<Link to="/admin/documents/new">
					<Button size="sm">
						<Plus className="size-3.5" />
						New Document
					</Button>
				</Link>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap items-center gap-2">
				<div className="relative flex-1">
					<Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="pl-8"
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(0);
						}}
						placeholder="Search documents..."
						value={search}
					/>
				</div>
				<div className="flex gap-1">
					<Button
						onClick={() => {
							setStatusFilter(undefined);
							setPage(0);
						}}
						size="sm"
						variant={statusFilter === undefined ? "default" : "outline"}
					>
						All
					</Button>
					<Button
						onClick={() => {
							setStatusFilter("published");
							setPage(0);
						}}
						size="sm"
						variant={statusFilter === "published" ? "default" : "outline"}
					>
						Published
					</Button>
					<Button
						onClick={() => {
							setStatusFilter("draft");
							setPage(0);
						}}
						size="sm"
						variant={statusFilter === "draft" ? "default" : "outline"}
					>
						Draft
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-md border">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b bg-muted/50">
							<th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">
								Title
							</th>
							<th className="hidden px-4 py-2.5 text-left font-medium text-muted-foreground text-xs sm:table-cell">
								Category
							</th>
							<th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">
								Status
							</th>
							<th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							Array.from({ length: 5 }).map((_, i) => (
								<tr className="border-b" key={i}>
									<td className="px-4 py-3">
										<Skeleton className="h-4 w-48" />
									</td>
									<td className="hidden px-4 py-3 sm:table-cell">
										<Skeleton className="h-4 w-20" />
									</td>
									<td className="px-4 py-3">
										<Skeleton className="h-4 w-16" />
									</td>
									<td className="px-4 py-3">
										<Skeleton className="ml-auto h-4 w-8" />
									</td>
								</tr>
							))
						) : data?.items.length ? (
							data.items.map((doc) => (
								<tr className="border-b last:border-b-0" key={doc.id}>
									<td className="px-4 py-3">
										<Link
											className="font-medium hover:underline"
											to="/admin/documents/$id"
											params={{ id: doc.id }}
										>
											{doc.title}
										</Link>
										<div className="text-muted-foreground text-xs">
											/{doc.slug}
										</div>
									</td>
									<td className="hidden px-4 py-3 text-muted-foreground text-xs sm:table-cell">
										{doc.categoryTitle ?? "-"}
									</td>
									<td className="px-4 py-3">
										<span
											className={
												doc.status === "published"
													? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600 text-xs dark:text-emerald-400"
													: "rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 text-xs dark:text-amber-400"
											}
										>
											{doc.status}
										</span>
									</td>
									<td className="px-4 py-3 text-right">
										<DropdownMenu>
											<DropdownMenuTrigger
												className="inline-flex size-7 items-center justify-center rounded-md transition-colors hover:bg-muted"
											>
												<MoreHorizontal className="size-4" />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														window.location.assign(
															`/admin/documents/${doc.id}`,
														)
													}
												>
													<Pencil className="size-3.5" />
													Edit
												</DropdownMenuItem>
												{doc.status === "draft" ? (
													<DropdownMenuItem
														onClick={() =>
															publishMutation.mutate({ id: doc.id })
														}
													>
														<Eye className="size-3.5" />
														Publish
													</DropdownMenuItem>
												) : (
													<DropdownMenuItem
														onClick={() =>
															unpublishMutation.mutate({ id: doc.id })
														}
													>
														<EyeOff className="size-3.5" />
														Unpublish
													</DropdownMenuItem>
												)}
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() =>
														deleteMutation.mutate({ id: doc.id })
													}
													variant="destructive"
												>
													<Trash2 className="size-3.5" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									className="px-4 py-8 text-center text-muted-foreground"
									colSpan={4}
								>
									No documents found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 ? (
				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						Showing {page * limit + 1}-
						{Math.min((page + 1) * limit, data?.total ?? 0)} of{" "}
						{data?.total ?? 0}
					</span>
					<div className="flex gap-1">
						<Button
							disabled={page === 0}
							onClick={() => setPage((p) => p - 1)}
							size="xs"
							variant="outline"
						>
							Previous
						</Button>
						<Button
							disabled={page >= totalPages - 1}
							onClick={() => setPage((p) => p + 1)}
							size="xs"
							variant="outline"
						>
							Next
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}
