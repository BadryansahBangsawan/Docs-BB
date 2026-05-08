import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/project")({
	component: () => <SectionDocPage section="project" />,
});
