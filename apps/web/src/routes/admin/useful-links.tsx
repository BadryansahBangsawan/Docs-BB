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

export const Route = createFileRoute("/admin/useful-links")({
	component: UsefulLinksPage,
});

function UsefulLinksPage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [showCreate, setShowCreate] = useState(false);

	const { data: links, isLoading } = useQuery(
		trpc.usefulLinks.list.queryOptions(),
	);

	const invalidate = () =>
		queryClient.invalidateQueries({
			queryKey: trpc.usefulLinks.list.queryKey(),
		});

	const createMutation = useMutation(
		trpc.usefulLinks.create.mutationOptions({
			onSuccess: () => {
				toast.success("Link created");
				setShowCreate(false);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const updateMutation = useMutation(
		trpc.usefulLinks.update.mutationOptions({
			onSuccess: () => {
				toast.success("Link updated");
				setEditingId(null);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const deleteMutation = useMutation(
		trpc.usefulLinks.delete.mutationOptions({
			onSuccess: () => {
				toast.success("Link deleted");
				invalidate();
			},
		}),
	);

	return (
		<div className="mx-auto max-w-3xl space-y-4">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Useful Links</h2>
				<Button onClick={() => setShowCreate(true)} size="sm">
					<Plus className="size-3.5" />
					Add Link
				</Button>
			</div>

			{showCreate ? (
				<UsefulLinkForm
					isPending={createMutation.isPending}
					onCancel={() => setShowCreate(false)}
					onSubmit={(data) => createMutation.mutate(data)}
				/>
			) : null}

			<div className="space-y-2">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, i) => (
						<Skeleton className="h-14 w-full" key={i} />
					))
				) : links?.length ? (
					links.map((link) =>
						editingId === link.id ? (
							<UsefulLinkForm
								initialValues={link}
								isPending={updateMutation.isPending}
								key={link.id}
								onCancel={() => setEditingId(null)}
								onSubmit={(data) =>
									updateMutation.mutate({ id: link.id, ...data })
								}
							/>
						) : (
							<div
								className="flex items-center justify-between gap-4 rounded-md border px-4 py-3"
								key={link.id}
							>
								<div>
									<span className="font-medium text-sm">{link.title}</span>
									<div className="mt-0.5 text-muted-foreground text-xs">
										{link.url}
										{link.category ? (
											<span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px]">
												{link.category}
											</span>
										) : null}
									</div>
								</div>
								<div className="flex gap-1">
									<Button
										onClick={() => setEditingId(link.id)}
										size="icon-xs"
										variant="ghost"
									>
										<Pencil className="size-3" />
									</Button>
									<Button
										onClick={() => {
											if (confirm("Delete this link?")) {
												deleteMutation.mutate({ id: link.id });
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
						No useful links yet.
					</p>
				)}
			</div>
		</div>
	);
}

function UsefulLinkForm({
	initialValues,
	isPending,
	onCancel,
	onSubmit,
}: {
	initialValues?: {
		title: string;
		url: string;
		description: string | null;
		category: string | null;
		sortOrder: number;
	};
	isPending: boolean;
	onCancel: () => void;
	onSubmit: (data: {
		title: string;
		url: string;
		description?: string;
		category?: string;
		sortOrder?: number;
	}) => void;
}) {
	const [title, setTitle] = useState(initialValues?.title ?? "");
	const [url, setUrl] = useState(initialValues?.url ?? "");
	const [category, setCategory] = useState(initialValues?.category ?? "");
	const [sortOrder, setSortOrder] = useState(initialValues?.sortOrder ?? 0);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			title,
			url,
			category: category || undefined,
			sortOrder,
		});
	}

	return (
		<form
			className="space-y-3 rounded-md border bg-muted/30 p-4"
			onSubmit={handleSubmit}
		>
			<div className="grid gap-3 sm:grid-cols-4">
				<div className="space-y-1">
					<Label>Title</Label>
					<Input
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Link title"
						required
						value={title}
					/>
				</div>
				<div className="space-y-1 sm:col-span-2">
					<Label>URL</Label>
					<Input
						onChange={(e) => setUrl(e.target.value)}
						placeholder="https://..."
						required
						value={url}
					/>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<Label>Category</Label>
						<Input
							onChange={(e) => setCategory(e.target.value)}
							placeholder="General"
							value={category}
						/>
					</div>
					<div className="space-y-1">
						<Label>Order</Label>
						<Input
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
