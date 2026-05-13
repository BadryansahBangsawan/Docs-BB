import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
import { Label } from "@docs-badry/ui/components/label";
import { Checkbox } from "@docs-badry/ui/components/checkbox";
import { Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

type ProjectData = {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	content: string | null;
	linkDemo: string | null;
	linkGithub: string | null;
	stacks: string[];
	image: string | null;
	isFeatured: boolean;
	sortOrder: number;
	status: string;
};

export function PortfolioForm({ project }: { project?: ProjectData }) {
	const trpc = useTRPC();
	const router = useRouter();
	const queryClient = useQueryClient();
	const isEditing = !!project;

	const [title, setTitle] = useState(project?.title ?? "");
	const [slug, setSlug] = useState(project?.slug ?? "");
	const [description, setDescription] = useState(project?.description ?? "");
	const [content, setContent] = useState(project?.content ?? "");
	const [linkDemo, setLinkDemo] = useState(project?.linkDemo ?? "");
	const [linkGithub, setLinkGithub] = useState(project?.linkGithub ?? "");
	const [stacks, setStacks] = useState<string[]>(project?.stacks ?? []);
	const [stackInput, setStackInput] = useState("");
	const [image, setImage] = useState(project?.image ?? "");
	const [isFeatured, setIsFeatured] = useState(project?.isFeatured ?? false);
	const [sortOrder, setSortOrder] = useState(project?.sortOrder ?? 0);
	const [status, setStatus] = useState(project?.status ?? "draft");

	const createMutation = useMutation(
		trpc.portfolio.create.mutationOptions({
			onSuccess: (proj) => {
				toast.success("Project created");
				queryClient.invalidateQueries({
					queryKey: trpc.portfolio.list.queryKey(),
				});
				if (proj) {
					router.navigate({
						to: "/admin/portfolio/$id",
						params: { id: proj.id },
					});
				}
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	const updateMutation = useMutation(
		trpc.portfolio.update.mutationOptions({
			onSuccess: () => {
				toast.success("Project saved");
				queryClient.invalidateQueries({
					queryKey: trpc.portfolio.list.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.portfolio.getById.queryKey(),
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
		if (!isEditing) {
			setSlug(generateSlug(value));
		}
	}

	function addStack() {
		const trimmed = stackInput.trim();
		if (trimmed && !stacks.includes(trimmed)) {
			setStacks([...stacks, trimmed]);
		}
		setStackInput("");
	}

	function removeStack(stack: string) {
		setStacks(stacks.filter((s) => s !== stack));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payload = {
			title,
			slug,
			description: description || undefined,
			content: content || undefined,
			linkDemo: linkDemo || null,
			linkGithub: linkGithub || null,
			stacks,
			image: image || undefined,
			isFeatured,
			sortOrder,
			status: status as "draft" | "published",
		};

		if (isEditing && project) {
			updateMutation.mutate({ id: project.id, ...payload });
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
						to="/admin/portfolio"
					>
						<ArrowLeft className="size-3.5" />
						Back to Portfolio
					</Link>
					<div className="flex gap-2">
						<Button
							disabled={isPending}
							onClick={() => setStatus("draft")}
							size="sm"
							type="submit"
							variant="outline"
						>
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
							placeholder="Project title"
							required
							value={title}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="slug">Slug</Label>
						<Input
							id="slug"
							onChange={(e) => setSlug(e.target.value)}
							placeholder="project-slug"
							required
							value={slug}
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
						placeholder="Short project description"
						rows={2}
						value={description}
					/>
				</div>

				{/* Links */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="linkDemo">Demo URL</Label>
						<Input
							id="linkDemo"
							onChange={(e) => setLinkDemo(e.target.value)}
							placeholder="https://demo.example.com"
							type="url"
							value={linkDemo}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="linkGithub">GitHub URL</Label>
						<Input
							id="linkGithub"
							onChange={(e) => setLinkGithub(e.target.value)}
							placeholder="https://github.com/..."
							type="url"
							value={linkGithub}
						/>
					</div>
				</div>

				{/* Image & Settings */}
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-1.5 sm:col-span-2">
						<Label htmlFor="image">Image URL</Label>
						<Input
							id="image"
							onChange={(e) => setImage(e.target.value)}
							placeholder="https://example.com/image.png"
							value={image}
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

				{/* Featured */}
				<div className="flex items-center gap-2">
					<Checkbox
						checked={isFeatured}
						id="featured"
						onCheckedChange={(checked) =>
							setIsFeatured(checked === true)
						}
					/>
					<Label htmlFor="featured">Featured project</Label>
				</div>

				{/* Stacks */}
				<div className="space-y-1.5">
					<Label>Tech Stack</Label>
					<div className="flex flex-wrap gap-1.5">
						{stacks.map((stack) => (
							<span
								className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs"
								key={stack}
							>
								{stack}
								<button
									className="text-muted-foreground hover:text-foreground"
									onClick={() => removeStack(stack)}
									type="button"
								>
									<X className="size-3" />
								</button>
							</span>
						))}
					</div>
					<div className="flex gap-2">
						<Input
							onChange={(e) => setStackInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addStack();
								}
							}}
							placeholder="Add technology..."
							value={stackInput}
						/>
						<Button onClick={addStack} size="sm" type="button" variant="outline">
							Add
						</Button>
					</div>
				</div>

				{/* Content */}
				<div className="space-y-1.5">
					<Label htmlFor="content">Content (Markdown)</Label>
					<textarea
						className="min-h-[200px] w-full rounded-none border border-input bg-transparent px-3 py-2.5 font-mono text-xs leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
						id="content"
						onChange={(e) => setContent(e.target.value)}
						placeholder="Project details in Markdown..."
						value={content}
					/>
				</div>
			</form>
		</div>
	);
}
