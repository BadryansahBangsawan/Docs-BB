import { createFileRoute } from "@tanstack/react-router";

import { SectionRoutePage } from "@/components/doc-page";

export const Route = createFileRoute("/ai-llm")({
	component: () => <SectionRoutePage section="ai-llm" />,
});
