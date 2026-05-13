import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
import { Label } from "@docs-badry/ui/components/label";
import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/categories")({
	component: CategoriesPage,
});

function CategoriesPage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [showCreate, setShowCreate] = useState(false);

	const { data: categories, isLoading } = useQuery(
		trpc.categories.list.queryOptions(),
	);

	const invalidate = () =>
		queryClient.invalidateQueries({
			queryKey: trpc.categories.list.queryKey(),
		});

	const createMutation = useMutation(
		trpc.categories.create.mutationOptions({
			onSuccess: () => {
				toast.success("Category created");
				setShowCreate(false);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const updateMutation = useMutation(
		trpc.categories.update.mutationOptions({
			onSuccess: () => {
				toast.success("Category updated");
				setEditingId(null);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const deleteMutation = useMutation(
		trpc.categories.delete.mutationOptions({
			onSuccess: () => {
				toast.success("Category deleted");
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	return (
		<div className="mx-auto max-w-3xl space-y-4">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Categories</h2>
				<Button onClick={() => setShowCreate(true)} size="sm">
					<Plus className="size-3.5" />
					New Category
				</Button>
			</div>

			{/* Create form */}
			{showCreate ? (
				<CategoryInlineForm
					isPending={createMutation.isPending}
					onCancel={() => setShowCreate(false)}
					onSubmit={(data) => createMutation.mutate(data)}
				/>
			) : null}

			{/* List */}
			<div className="space-y-2">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, i) => (
						<Skeleton className="h-16 w-full" key={i} />
					))
				) : categories?.length ? (
					categories.map((cat) =>
						editingId === cat.id ? (
							<CategoryInlineForm
								initialValues={cat}
								isPending={updateMutation.isPending}
								key={cat.id}
								onCancel={() => setEditingId(null)}
								onSubmit={(data) =>
									updateMutation.mutate({ id: cat.id, ...data })
								}
							/>
						) : (
							<div
								className="flex items-center justify-between gap-4 rounded-md border px-4 py-3"
								key={cat.id}
							>
								<div>
									<div className="flex items-center gap-2">
										{cat.icon ? (
											<span className="text-sm">{cat.icon}</span>
										) : null}
										<span className="font-medium text-sm">{cat.title}</span>
									</div>
									<div className="mt-0.5 text-muted-foreground text-xs">
										/{cat.slug} &middot; {cat.documentCount} docs
									</div>
								</div>
								<div className="flex gap-1">
									<Button
										onClick={() => setEditingId(cat.id)}
										size="icon-xs"
										variant="ghost"
									>
										<Pencil className="size-3" />
									</Button>
									<Button
										disabled={cat.documentCount > 0}
										onClick={() => {
											if (
												confirm(
													"Are you sure you want to delete this category?",
												)
											) {
												deleteMutation.mutate({ id: cat.id });
											}
										}}
										size="icon-xs"
										variant="ghost"
									>
										<Trash2 className="size-3" />
									</Button>
								</div>
							</div>
						),
					)
				) : (
					<p className="py-8 text-center text-muted-foreground text-sm">
						No categories yet.
					</p>
				)}
			</div>
		</div>
	);
}

function CategoryInlineForm({
	initialValues,
	isPending,
	onCancel,
	onSubmit,
}: {
	initialValues?: {
		title: string;
		slug: string;
		description: string | null;
		icon: string | null;
		sortOrder: number;
	};
	isPending: boolean;
	onCancel: () => void;
	onSubmit: (data: {
		title: string;
		slug: string;
		description?: string;
		icon?: string;
		sortOrder?: number;
	}) => void;
}) {
	const [title, setTitle] = useState(initialValues?.title ?? "");
	const [slug, setSlug] = useState(initialValues?.slug ?? "");
	const [icon, setIcon] = useState(initialValues?.icon ?? "");
	const [sortOrder, setSortOrder] = useState(initialValues?.sortOrder ?? 0);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			title,
			slug:
				slug ||
				title
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, "")
					.replace(/\s+/g, "-"),
			icon: icon || undefined,
			sortOrder,
		});
	}

	return (
		<form
			className="space-y-3 rounded-md border bg-muted/30 p-4"
			onSubmit={handleSubmit}
		>
			<div className="grid gap-3 sm:grid-cols-4">
				<div className="space-y-1 sm:col-span-2">
					<Label htmlFor="cat-title">Title</Label>
					<Input
						id="cat-title"
						onChange={(e) => {
							setTitle(e.target.value);
							if (!initialValues) {
								setSlug(
									e.target.value
										.toLowerCase()
										.replace(/[^a-z0-9\s-]/g, "")
										.replace(/\s+/g, "-"),
								);
							}
						}}
						placeholder="Category name"
						required
						value={title}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="cat-slug">Slug</Label>
					<Input
						id="cat-slug"
						onChange={(e) => setSlug(e.target.value)}
						placeholder="slug"
						required
						value={slug}
					/>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<Label htmlFor="cat-icon">Icon</Label>
						<Input
							id="cat-icon"
							onChange={(e) => setIcon(e.target.value)}
							placeholder="emoji"
							value={icon}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="cat-order">Order</Label>
						<Input
							id="cat-order"
							onChange={(e) => setSortOrder(Number(e.target.value))}
							type="number"
							value={sortOrder}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<Button
					disabled={isPending}
					onClick={onCancel}
					size="xs"
					type="button"
					variant="ghost"
				>
					Cancel
				</Button>
				<Button disabled={isPending} size="xs" type="submit">
					{isPending ? <Loader2 className="size-3 animate-spin" /> : null}
					{initialValues ? "Update" : "Create"}
				</Button>
			</div>
		</form>
	);
}
