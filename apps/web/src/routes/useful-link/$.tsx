import { createFileRoute, useLocation } from "@tanstack/react-router";

import { SectionDocPage } from "@/components/doc-page";

export const Route = createFileRoute("/useful-link/$")({
	component: UsefulLinkSplatRoute,
});

function UsefulLinkSplatRoute() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const splat = pathname.replace(/^\/useful-link\/?/, "");
	return <SectionDocPage section="useful-link" splat={splat} />;
}
