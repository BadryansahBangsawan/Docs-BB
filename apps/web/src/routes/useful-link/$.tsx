import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/useful-link/$")({
	component: UsefulLinkSplatRoute,
});

function UsefulLinkSplatRoute() {
	const params = Route.useParams() as { _splat?: string };
	return <SectionDocPage section="useful-link" splat={params._splat} />;
}
