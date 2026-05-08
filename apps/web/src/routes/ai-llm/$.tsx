import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/ai-llm/$")({
	component: AiLlmSplatRoute,
});

function AiLlmSplatRoute() {
	const params = Route.useParams() as { _splat?: string };
	return <SectionDocPage section="ai-llm" splat={params._splat} />;
}
