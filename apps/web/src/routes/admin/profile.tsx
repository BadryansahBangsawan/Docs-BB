import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
import { Label } from "@docs-badry/ui/components/label";
import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/profile")({
	component: ProfilePage,
});

function ProfilePage() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const { data: profile, isLoading } = useQuery(
		trpc.profile.get.queryOptions(),
	);

	const [name, setName] = useState("");
	const [shortName, setShortName] = useState("");
	const [username, setUsername] = useState("");
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [workMode, setWorkMode] = useState("");
	const [siteUrl, setSiteUrl] = useState("");
	const [description, setDescription] = useState("");
	const [about, setAbout] = useState<string[]>([]);
	const [skills, setSkills] = useState<string[]>([]);
	const [skillInput, setSkillInput] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [resumeUrl, setResumeUrl] = useState("");

	useEffect(() => {
		if (profile) {
			setName(profile.name ?? "");
			setShortName(profile.shortName ?? "");
			setUsername(profile.username ?? "");
			setTitle(profile.title ?? "");
			setLocation(profile.location ?? "");
			setWorkMode(profile.workMode ?? "");
			setSiteUrl(profile.siteUrl ?? "");
			setDescription(profile.description ?? "");
			setAbout(profile.about ?? []);
			setSkills(profile.skills ?? []);
			setAvatarUrl(profile.avatarUrl ?? "");
			setResumeUrl(profile.resumeUrl ?? "");
		}
	}, [profile]);

	const updateMutation = useMutation(
		trpc.profile.update.mutationOptions({
			onSuccess: () => {
				toast.success("Profile saved");
				queryClient.invalidateQueries({
					queryKey: trpc.profile.get.queryKey(),
				});
			},
			onError: (err) => toast.error(err.message),
		}),
	);

	function addSkill() {
		const trimmed = skillInput.trim();
		if (trimmed && !skills.includes(trimmed)) {
			setSkills([...skills, trimmed]);
		}
		setSkillInput("");
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		updateMutation.mutate({
			name,
			shortName: shortName || null,
			username: username || null,
			title: title || null,
			location: location || null,
			workMode: workMode || null,
			siteUrl: siteUrl || null,
			description: description || null,
			about,
			skills,
			avatarUrl: avatarUrl || null,
			resumeUrl: resumeUrl || null,
		});
	}

	if (isLoading) {
		return (
			<div className="mx-auto max-w-3xl space-y-4">
				<Skeleton className="h-8 w-48" />
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton className="h-10 w-full" key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="flex items-center justify-between gap-4">
					<h2 className="font-semibold text-lg">Profile Settings</h2>
					<Button disabled={updateMutation.isPending} size="sm" type="submit">
						{updateMutation.isPending ? (
							<Loader2 className="size-3.5 animate-spin" />
						) : null}
						Save
					</Button>
				</div>

				{/* Name fields */}
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							onChange={(e) => setName(e.target.value)}
							required
							value={name}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="shortName">Short Name</Label>
						<Input
							id="shortName"
							onChange={(e) => setShortName(e.target.value)}
							value={shortName}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							onChange={(e) => setUsername(e.target.value)}
							placeholder="@username"
							value={username}
						/>
					</div>
				</div>

				{/* Title & Location */}
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-1.5">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Software Engineer"
							value={title}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							onChange={(e) => setLocation(e.target.value)}
							placeholder="City, Country"
							value={location}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="workMode">Work Mode</Label>
						<select
							className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
							id="workMode"
							onChange={(e) => setWorkMode(e.target.value)}
							value={workMode}
						>
							<option value="">Select</option>
							<option value="Onsite">Onsite</option>
							<option value="Remote">Remote</option>
							<option value="Hybrid">Hybrid</option>
						</select>
					</div>
				</div>

				{/* URLs */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="siteUrl">Site URL</Label>
						<Input
							id="siteUrl"
							onChange={(e) => setSiteUrl(e.target.value)}
							placeholder="https://yoursite.com"
							type="url"
							value={siteUrl}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="avatarUrl">Avatar URL</Label>
						<Input
							id="avatarUrl"
							onChange={(e) => setAvatarUrl(e.target.value)}
							placeholder="https://example.com/avatar.jpg"
							value={avatarUrl}
						/>
					</div>
				</div>

				{/* Description */}
				<div className="space-y-1.5">
					<Label htmlFor="description">Description</Label>
					<textarea
						className="min-h-20 w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
						id="description"
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						value={description}
					/>
				</div>

				{/* About */}
				<div className="space-y-1.5">
					<Label>About Paragraphs</Label>
					<div className="space-y-2">
						{about.map((paragraph, index) => (
							<div className="flex gap-2" key={index}>
								<textarea
									className="min-h-16 flex-1 rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
									onChange={(e) => {
										const updated = [...about];
										updated[index] = e.target.value;
										setAbout(updated);
									}}
									rows={2}
									value={paragraph}
								/>
								<Button
									onClick={() => setAbout(about.filter((_, i) => i !== index))}
									size="icon-xs"
									type="button"
									variant="ghost"
								>
									<X className="size-3" />
								</Button>
							</div>
						))}
					</div>
					<Button
						onClick={() => setAbout([...about, ""])}
						size="xs"
						type="button"
						variant="outline"
					>
						<Plus className="size-3" />
						Add paragraph
					</Button>
				</div>

				{/* Skills */}
				<div className="space-y-1.5">
					<Label>Skills</Label>
					<div className="flex flex-wrap gap-1.5">
						{skills.map((skill) => (
							<span
								className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs"
								key={skill}
							>
								{skill}
								<button
									className="text-muted-foreground hover:text-foreground"
									onClick={() =>
										setSkills(skills.filter((s) => s !== skill))
									}
									type="button"
								>
									<X className="size-3" />
								</button>
							</span>
						))}
					</div>
					<div className="flex gap-2">
						<Input
							onChange={(e) => setSkillInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addSkill();
								}
							}}
							placeholder="Add skill..."
							value={skillInput}
						/>
						<Button
							onClick={addSkill}
							size="sm"
							type="button"
							variant="outline"
						>
							Add
						</Button>
					</div>
				</div>

				{/* Resume */}
				<div className="space-y-1.5">
					<Label htmlFor="resumeUrl">Resume URL</Label>
					<Input
						id="resumeUrl"
						onChange={(e) => setResumeUrl(e.target.value)}
						placeholder="https://example.com/resume.pdf"
						value={resumeUrl}
					/>
				</div>
			</form>
		</div>
	);
}
