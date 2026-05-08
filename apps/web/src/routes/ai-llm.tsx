import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/ai-llm")({
	component: () => <SectionDocPage section="ai-llm" />,
});
