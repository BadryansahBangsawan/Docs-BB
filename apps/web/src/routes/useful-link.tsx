import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/useful-link")({
	component: () => <SectionDocPage section="useful-link" />,
});
