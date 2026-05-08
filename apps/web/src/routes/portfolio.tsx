import { createFileRoute } from "@tanstack/react-router";

import { SectionRoutePage } from "@/components/doc-page";

export const Route = createFileRoute("/portfolio")({
	component: () => <SectionRoutePage section="portfolio" />,
});
