import { createFileRoute } from "@tanstack/react-router";

import { SectionRoutePage } from "@/components/doc-page";

export const Route = createFileRoute("/useful-link")({
	component: () => <SectionRoutePage section="useful-link" />,
});
