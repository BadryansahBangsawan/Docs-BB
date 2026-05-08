import { createFileRoute, useLocation } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/portfolio/$")({
	component: PortfolioSplatRoute,
});

function PortfolioSplatRoute() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const splat = pathname.replace(/^\/portfolio\/?/, "");
	return <SectionDocPage section="portfolio" splat={splat} />;
}
