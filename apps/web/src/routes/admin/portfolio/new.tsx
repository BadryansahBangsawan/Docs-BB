import { createFileRoute } from "@tanstack/react-router";

import { PortfolioForm } from "@/components/admin/portfolio-form";

export const Route = createFileRoute("/admin/portfolio/new")({
	component: NewPortfolioPage,
});

function NewPortfolioPage() {
	return <PortfolioForm />;
}
