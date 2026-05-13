import { createContext } from "@docs-badry/api/context";
import { appRouter } from "@docs-badry/api/routers/index";
import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler({ request }: { request: Request }) {
	const resHeaders = new Headers();

	return fetchRequestHandler({
		req: request,
		router: appRouter,
		createContext: () => createContext({ req: request, resHeaders }),
		endpoint: "/api/trpc",
		responseMeta: () => ({
			headers: resHeaders,
		}),
	});
}

export const Route = createFileRoute("/api/trpc/$")({
	server: {
		handlers: {
			GET: handler,
			POST: handler,
		},
	},
});
