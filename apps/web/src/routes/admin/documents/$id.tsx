import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { DocumentForm } from "@/components/admin/document-form";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/documents/$id")({
	component: EditDocumentPage,
});

function EditDocumentPage() {
	const { id } = Route.useParams();
	const trpc = useTRPC();

	const { data: document, isLoading } = useQuery(
		trpc.documents.getById.queryOptions({ id }),
	);

	if (isLoading) {
		return (
			<div className="mx-auto max-w-4xl space-y-4">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (!document) {
		return (
			<div className="py-12 text-center text-muted-foreground">
				Document not found.
			</div>
		);
	}

	return <DocumentForm document={document} />;
}
