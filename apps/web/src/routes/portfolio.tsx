import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/portfolio")({
	component: () => <SectionDocPage section="portfolio" />,
});
