import type { AppRouter } from "@docs-badry/api/routers/index";
import { Toaster } from "@docs-badry/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { AppShell } from "../components/app-shell";

import appCss from "../index.css?url";
export interface RouterAppContext {
	trpc: TRPCOptionsProxy<AppRouter>;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Badry Docs",
			},
			{
				name: "description",
				content:
					"Personal documentation, project notes, case studies, and useful engineering references.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="id" className="dark" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<AppShell>
					<Outlet />
				</AppShell>
				<Toaster richColors />
				{import.meta.env.DEV ? (
					<>
						<TanStackRouterDevtools position="bottom-left" />
						<ReactQueryDevtools
							buttonPosition="bottom-right"
							position="bottom"
						/>
					</>
				) : null}
				<Scripts />
			</body>
		</html>
	);
}
