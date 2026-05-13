import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@docs-badry/ui/components/card";
import { Button } from "@docs-badry/ui/components/button";
import { Skeleton } from "@docs-badry/ui/components/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/admin/analytics")({
	component: AnalyticsPage,
});

function AnalyticsPage() {
	const trpc = useTRPC();
	const [days, setDays] = useState(7);

	const { data: summary, isLoading: summaryLoading } = useQuery(
		trpc.analytics.summary.queryOptions({ days }),
	);

	const { data: topPages, isLoading: pagesLoading } = useQuery(
		trpc.analytics.topPages.queryOptions({ days, limit: 10 }),
	);

	const { data: topReferrers, isLoading: referrersLoading } = useQuery(
		trpc.analytics.topReferrers.queryOptions({ days, limit: 10 }),
	);

	return (
		<div className="mx-auto max-w-5xl space-y-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-lg">Analytics</h2>
				<div className="flex gap-1">
					{[7, 14, 30, 90].map((d) => (
						<Button
							key={d}
							onClick={() => setDays(d)}
							size="xs"
							variant={days === d ? "default" : "outline"}
						>
							{d}d
						</Button>
					))}
				</div>
			</div>

			{/* Total views */}
			<Card>
				<CardHeader className="border-b">
					<CardTitle>
						Total Views ({days} days):{" "}
						{summaryLoading ? (
							<Skeleton className="inline-block h-5 w-12" />
						) : (
							<span className="font-bold">{summary?.totalViews ?? 0}</span>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					{summaryLoading ? (
						<Skeleton className="h-32 w-full" />
					) : summary?.chart && summary.chart.length > 0 ? (
						<div className="flex h-32 items-end gap-1">
							{summary.chart.map((day) => {
								const max = Math.max(
									...summary.chart.map((d) => d.views),
									1,
								);
								const height = (day.views / max) * 100;
								return (
									<div
										className="group relative flex flex-1 flex-col items-center"
										key={day.date}
									>
										<div className="absolute -top-6 hidden text-xs group-hover:block">
											{day.views}
										</div>
										<div
											className="w-full rounded-sm bg-primary/20 transition-colors group-hover:bg-primary/40"
											style={{ height: `${Math.max(height, 4)}%` }}
										/>
										<span className="mt-1 text-[10px] text-muted-foreground">
											{day.date.slice(5)}
										</span>
									</div>
								);
							})}
						</div>
					) : (
						<p className="py-8 text-center text-muted-foreground text-sm">
							No data for this period.
						</p>
					)}
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Top pages */}
				<Card>
					<CardHeader className="border-b">
						<CardTitle>Top Pages</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						{pagesLoading ? (
							<div className="space-y-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton className="h-6 w-full" key={i} />
								))}
							</div>
						) : topPages?.length ? (
							<div className="space-y-1">
								{topPages.map((page, i) => (
									<div
										className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm"
										key={page.path}
									>
										<span className="min-w-0 truncate text-xs">
											<span className="text-muted-foreground">{i + 1}. </span>
											{page.path}
										</span>
										<span className="ml-2 shrink-0 font-medium text-xs">
											{page.views}
										</span>
									</div>
								))}
							</div>
						) : (
							<p className="py-4 text-center text-muted-foreground text-sm">
								No page data.
							</p>
						)}
					</CardContent>
				</Card>

				{/* Top referrers */}
				<Card>
					<CardHeader className="border-b">
						<CardTitle>Top Referrers</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						{referrersLoading ? (
							<div className="space-y-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton className="h-6 w-full" key={i} />
								))}
							</div>
						) : topReferrers?.length ? (
							<div className="space-y-1">
								{topReferrers.map((ref, i) => (
									<div
										className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm"
										key={ref.referrer}
									>
										<span className="min-w-0 truncate text-xs">
											<span className="text-muted-foreground">{i + 1}. </span>
											{ref.referrer}
										</span>
										<span className="ml-2 shrink-0 font-medium text-xs">
											{ref.views}
										</span>
									</div>
								))}
							</div>
						) : (
							<p className="py-4 text-center text-muted-foreground text-sm">
								No referrer data.
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
