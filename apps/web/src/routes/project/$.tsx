import { createFileRoute, useLocation } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/project/$")({
	component: ProjectSplatRoute,
});

function ProjectSplatRoute() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const splat = pathname.replace(/^\/project\/?/, "");
	return <SectionDocPage section="project" splat={splat} />;
}
