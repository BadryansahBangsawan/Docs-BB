import { createFileRoute } from "@tanstack/react-router";

import { DocumentForm } from "@/components/admin/document-form";

export const Route = createFileRoute("/admin/documents/new")({
	component: NewDocumentPage,
});

function NewDocumentPage() {
	return <DocumentForm />;
}
