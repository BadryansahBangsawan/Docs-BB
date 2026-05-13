import { Button } from "@docs-badry/ui/components/button";
import { Input } from "@docs-badry/ui/components/input";
import { Label } from "@docs-badry/ui/components/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@docs-badry/ui/components/card";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginPage,
});

function AdminLoginPage() {
	const trpc = useTRPC();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginMutation = useMutation(
		trpc.admin.login.mutationOptions({
			onSuccess: (data) => {
				if (data.success) {
					toast.success("Welcome back!");
					router.navigate({ to: "/admin" });
				} else {
					toast.error(data.error);
				}
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
	);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		loginMutation.mutate({ email, password });
	}

	return (
		<div className="flex min-h-svh items-center justify-center bg-background px-4">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader className="text-center">
						<div className="mx-auto mb-3">
							<img
								alt="Logo"
								className="size-10 rounded-full border bg-white object-cover"
								src="/logo.png"
							/>
						</div>
						<CardTitle>Admin Login</CardTitle>
						<CardDescription>
							Sign in to manage your site content.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div className="space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									autoComplete="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="admin@example.com"
									required
									type="email"
									value={email}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									autoComplete="current-password"
									id="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter password"
									required
									type="password"
									value={password}
								/>
							</div>
							<Button
								className="w-full"
								disabled={loginMutation.isPending}
								type="submit"
							>
								{loginMutation.isPending ? (
									<Loader2 className="size-4 animate-spin" />
								) : null}
								Sign In
							</Button>
						</form>
						<div className="mt-4 text-center">
							<a
								className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
								href="/"
							>
								<ArrowLeft className="size-3" />
								Back to site
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
