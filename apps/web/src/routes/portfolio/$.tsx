import { createFileRoute } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/portfolio/$")({
	component: PortfolioSplatRoute,
});

function PortfolioSplatRoute() {
	const params = Route.useParams() as { _splat?: string };
	return <SectionDocPage section="portfolio" splat={params._splat} />;
}
