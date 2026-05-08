import { createFileRoute } from "@tanstack/react-router";

import { SectionRoutePage } from "@/components/doc-page";

export const Route = createFileRoute("/project")({
	component: () => <SectionRoutePage section="project" />,
});
