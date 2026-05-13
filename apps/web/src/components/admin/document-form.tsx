import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
import { Label } from "@docs-badry/ui/components/label";
import { Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

type DocumentData = {
	id: string;
	slug: string;
	title: string;
	description: string | null;
	body: string | null;
	categoryId: string | null;
	author: string | null;
	image: string | null;
	sortOrder: number;
	status: string;
	metaTitle: string | null;
	metaDescription: string | null;
	ogImage: string | null;
};

export function DocumentForm({ document }: { document?: DocumentData }) {
	const trpc = useTRPC();
	const router = useRouter();
	const queryClient = useQueryClient();
	const isEditing = !!document;

	const [title, setTitle] = useState(document?.title ?? "");
	const [slug, setSlug] = useState(document?.slug ?? "");
	const [description, setDescription] = useState(
		document?.description ?? "",
	);
	const [body, setBody] = useState(document?.body ?? "");
	const [categoryId, setCategoryId] = useState(document?.categoryId ?? "");
	const [author, setAuthor] = useState(document?.author ?? "");
	const [sortOrder, setSortOrder] = useState(document?.sortOrder ?? 0);
	const [status, setStatus] = useState(document?.status ?? "draft");
	const [metaTitle, setMetaTitle] = useState(document?.metaTitle ?? "");
	const [metaDescription, setMetaDescription] = useState(
		document?.metaDescription ?? "",
	);
	const [seoOpen, setSeoOpen] = useState(false);

	const { data: categories } = useQuery(trpc.categories.list.queryOptions());

	const createMutation = useMutation(
		trpc.documents.create.mutationOptions({
			onSuccess: (doc) => {
				toast.success("Document created");
				queryClient.invalidateQueries({
					queryKey: trpc.documents.list.queryKey(),
				});
				if (doc) {
					router.navigate({
						to: "/admin/documents/$id",
						params: { id: doc.id },
					});
				}
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const updateMutation = useMutation(
		trpc.documents.update.mutationOptions({
			onSuccess: () => {
				toast.success("Document saved");
				queryClient.invalidateQueries({
					queryKey: trpc.documents.list.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.documents.getById.queryKey(),
				});
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	function generateSlug(text: string) {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "");
	}

	function handleTitleChange(value: string) {
		setTitle(value);
		if (!isEditing || slug === generateSlug(document?.title ?? "")) {
			setSlug(generateSlug(value));
		}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payload = {
			title,
			slug,
			description: description || undefined,
			body: body || undefined,
			categoryId,
			author: author || undefined,
			sortOrder,
			status: status as "draft" | "published",
			metaTitle: metaTitle || undefined,
			metaDescription: metaDescription || undefined,
		};

		if (isEditing && document) {
			updateMutation.mutate({ id: document.id, ...payload });
		} else {
			createMutation.mutate(payload);
		}
	}

	const isPending = createMutation.isPending || updateMutation.isPending;

	return (
		<div className="mx-auto max-w-4xl">
			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Header */}
				<div className="flex items-center justify-between gap-4">
					<Link
						className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
						to="/admin/documents"
					>
						<ArrowLeft className="size-3.5" />
						Back to Documents
					</Link>
					<div className="flex gap-2">
						<Button
							disabled={isPending}
							onClick={() => setStatus("draft")}
							size="sm"
							type="submit"
							variant="outline"
						>
							{isPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
							Save Draft
						</Button>
						<Button
							disabled={isPending}
							onClick={() => setStatus("published")}
							size="sm"
							type="submit"
						>
							{isPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
							{isEditing ? "Save" : "Publish"}
						</Button>
					</div>
				</div>

				{/* Title & Slug */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							onChange={(e) => handleTitleChange(e.target.value)}
							placeholder="Document title"
							required
							value={title}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="slug">Slug</Label>
						<Input
							id="slug"
							onChange={(e) => setSlug(e.target.value)}
							placeholder="document-slug"
							required
							value={slug}
						/>
					</div>
				</div>

				{/* Category & Order */}
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-1.5">
						<Label htmlFor="category">Category</Label>
						<select
							className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
							id="category"
							onChange={(e) => setCategoryId(e.target.value)}
							required
							value={categoryId}
						>
							<option value="">Select category</option>
							{categories?.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.title}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="author">Author</Label>
						<Input
							id="author"
							onChange={(e) => setAuthor(e.target.value)}
							placeholder="Author name"
							value={author}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="sortOrder">Sort Order</Label>
						<Input
							id="sortOrder"
							onChange={(e) => setSortOrder(Number(e.target.value))}
							type="number"
							value={sortOrder}
						/>
					</div>
				</div>

				{/* Description */}
				<div className="space-y-1.5">
					<Label htmlFor="description">Description</Label>
					<textarea
						className="min-h-16 w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
						id="description"
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Short description"
						rows={2}
						value={description}
					/>
				</div>

				{/* Body (markdown) */}
				<div className="space-y-1.5">
					<Label htmlFor="body">Content (Markdown)</Label>
					<textarea
						className="min-h-[320px] w-full rounded-none border border-input bg-transparent px-3 py-2.5 font-mono text-xs leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
						id="body"
						onChange={(e) => setBody(e.target.value)}
						placeholder="Write your content in Markdown..."
						value={body}
					/>
				</div>

				{/* SEO section */}
				<div className="rounded-md border">
					<button
						className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted"
						onClick={() => setSeoOpen(!seoOpen)}
						type="button"
					>
						SEO Settings
						<span className="text-muted-foreground text-xs">
							{seoOpen ? "Hide" : "Show"}
						</span>
					</button>
					{seoOpen ? (
						<div className="space-y-4 border-t px-4 py-4">
							<div className="space-y-1.5">
								<Label htmlFor="metaTitle">Meta Title</Label>
								<Input
									id="metaTitle"
									onChange={(e) => setMetaTitle(e.target.value)}
									placeholder="SEO title"
									value={metaTitle}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="metaDescription">Meta Description</Label>
								<textarea
									className="min-h-16 w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
									id="metaDescription"
									onChange={(e) => setMetaDescription(e.target.value)}
									placeholder="SEO description"
									rows={2}
									value={metaDescription}
								/>
							</div>
						</div>
					) : null}
				</div>
			</form>
		</div>
	);
}
