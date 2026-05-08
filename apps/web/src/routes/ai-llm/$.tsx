import { createFileRoute, useLocation } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/ai-llm/$")({
	component: AiLlmSplatRoute,
});

function AiLlmSplatRoute() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const splat = pathname.replace(/^\/ai-llm\/?/, "");
	return <SectionDocPage section="ai-llm" splat={splat} />;
}
