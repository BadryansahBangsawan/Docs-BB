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

export const Route = createFileRoute("/admin/social-links")({
	component: SocialLinksPage,
});

function SocialLinksPage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [showCreate, setShowCreate] = useState(false);

	const { data: links, isLoading } = useQuery(
		trpc.socialLinks.list.queryOptions(),
	);

	const invalidate = () =>
		queryClient.invalidateQueries({
			queryKey: trpc.socialLinks.list.queryKey(),
		});

	const createMutation = useMutation(
		trpc.socialLinks.create.mutationOptions({
			onSuccess: () => {
				toast.success("Social link created");
				setShowCreate(false);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const updateMutation = useMutation(
		trpc.socialLinks.update.mutationOptions({
			onSuccess: () => {
				toast.success("Social link updated");
				setEditingId(null);
				invalidate();
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const deleteMutation = useMutation(
		trpc.socialLinks.delete.mutationOptions({
			onSuccess: () => {
				toast.success("Social link deleted");
				invalidate();
			},
		}),
	);

	return (
		<div className="mx-auto max-w-3xl space-y-4">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Social Links</h2>
				<Button onClick={() => setShowCreate(true)} size="sm">
					<Plus className="size-3.5" />
					Add Link
				</Button>
			</div>

			{showCreate ? (
				<SocialLinkForm
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
							<SocialLinkForm
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
									<div className="flex items-center gap-2">
										{link.icon ? (
											<span className="text-sm">{link.icon}</span>
										) : null}
										<span className="font-medium text-sm">{link.label}</span>
									</div>
									<div className="mt-0.5 text-muted-foreground text-xs">
										{link.href}
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
											if (confirm("Delete this social link?")) {
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
						No social links yet.
					</p>
				)}
			</div>
		</div>
	);
}

function SocialLinkForm({
	initialValues,
	isPending,
	onCancel,
	onSubmit,
}: {
	initialValues?: {
		label: string;
		href: string;
		description: string | null;
		icon: string | null;
		sortOrder: number;
	};
	isPending: boolean;
	onCancel: () => void;
	onSubmit: (data: {
		label: string;
		href: string;
		description?: string;
		icon?: string;
		sortOrder?: number;
	}) => void;
}) {
	const [label, setLabel] = useState(initialValues?.label ?? "");
	const [href, setHref] = useState(initialValues?.href ?? "");
	const [icon, setIcon] = useState(initialValues?.icon ?? "");
	const [sortOrder, setSortOrder] = useState(initialValues?.sortOrder ?? 0);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			label,
			href,
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
				<div className="space-y-1">
					<Label>Label</Label>
					<Input
						onChange={(e) => setLabel(e.target.value)}
						placeholder="GitHub"
						required
						value={label}
					/>
				</div>
				<div className="space-y-1 sm:col-span-2">
					<Label>URL</Label>
					<Input
						onChange={(e) => setHref(e.target.value)}
						placeholder="https://github.com/..."
						required
						value={href}
					/>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<Label>Icon</Label>
						<Input
							onChange={(e) => setIcon(e.target.value)}
							placeholder="emoji"
							value={icon}
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
