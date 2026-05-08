import { ArrowLeft, Search } from "lucide-react";

export function NotFoundPage() {
	return (
		<div className="mx-auto flex min-h-[60svh] max-w-xl flex-col items-start justify-center">
			<div className="mb-4 inline-flex size-10 items-center justify-center rounded-md border bg-muted">
				<Search className="size-5 text-muted-foreground" />
			</div>
			<h1 className="font-semibold text-3xl tracking-normal">Page not found</h1>
			<p className="mt-3 text-muted-foreground text-sm leading-6">
				The page may have moved or has not been added to the docs index.
			</p>
			<a
				className="mt-6 inline-flex h-8 items-center gap-1.5 rounded-md border px-3 font-medium text-xs transition-colors hover:bg-muted"
				href="/"
			>
				<ArrowLeft className="size-4" />
				Back home
			</a>
		</div>
	);
}
