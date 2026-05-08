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
import { profile } from "../content/profile";

import appCss from "../index.css?url";
export interface RouterAppContext {
	trpc: TRPCOptionsProxy<AppRouter>;
	queryClient: QueryClient;
}

const themeScript = `
(() => {
  try {
    const theme = window.localStorage.getItem("docs-badry-theme") === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

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
				title: `${profile.name} | Personal Docs`,
			},
			{
				name: "description",
				content: profile.description,
			},
			{
				name: "author",
				content: profile.name,
			},
			{
				name: "keywords",
				content:
					"badryansah, badryansah bangsawan, portfolio frontend developer, software engineer makassar",
			},
			{
				property: "og:title",
				content: `${profile.name} | Personal Website`,
			},
			{
				property: "og:description",
				content: profile.description,
			},
			{
				property: "og:image",
				content: "/avatar.jpg",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "shortcut icon",
				href: "/logo.png",
			},
			{
				rel: "icon",
				href: "/logo.png",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo.png",
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="id" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Theme must be applied before CSS paints to avoid dark/light flash.
					dangerouslySetInnerHTML={{ __html: themeScript }}
				/>
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
