import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/project/$")({
	component: ProjectSplatRoute,
});

function ProjectSplatRoute() {
	const params = Route.useParams() as { _splat?: string };
	return <SectionDocPage section="project" splat={params._splat} />;
}
