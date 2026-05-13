import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PortfolioForm } from "@/components/admin/portfolio-form";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/portfolio/$id")({
	component: EditPortfolioPage,
});

function EditPortfolioPage() {
	const { id } = Route.useParams();
	const trpc = useTRPC();

	const { data: project, isLoading } = useQuery(
		trpc.portfolio.getById.queryOptions({ id }),
	);

	if (isLoading) {
		return (
			<div className="mx-auto max-w-4xl space-y-4">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-48 w-full" />
			</div>
		);
	}

	if (!project) {
		return (
			<div className="py-12 text-center text-muted-foreground">
				Project not found.
			</div>
		);
	}

	return <PortfolioForm project={project} />;
}
