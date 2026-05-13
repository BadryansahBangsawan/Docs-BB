import { pageViews } from "@docs-badry/db/schema";
import { and, count, desc, gte, sql } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const analyticsRouter = router({
	track: publicProcedure
		.input(
			z.object({
				path: z.string(),
				referrer: z.string().optional(),
				userAgent: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(pageViews).values(input);
		}),

	summary: adminProcedure
		.input(z.object({ days: z.number().min(1).max(90).default(7) }).optional())
		.query(async ({ ctx, input }) => {
			const days = input?.days ?? 7;
			const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

			const [totalResult] = await ctx.db
				.select({ total: count() })
				.from(pageViews)
				.where(gte(pageViews.viewedAt, since));

			const chart = await ctx.db
				.select({
					date: sql<string>`date(${pageViews.viewedAt}, 'unixepoch')`.as(
						"date",
					),
					views: count(),
				})
				.from(pageViews)
				.where(gte(pageViews.viewedAt, since))
				.groupBy(sql`date(${pageViews.viewedAt}, 'unixepoch')`)
				.orderBy(sql`date(${pageViews.viewedAt}, 'unixepoch')`);

			return {
				totalViews: totalResult?.total ?? 0,
				chart,
			};
		}),

	topPages: adminProcedure
		.input(
			z
				.object({
					days: z.number().min(1).max(90).default(7),
					limit: z.number().min(1).max(50).default(10),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const days = input?.days ?? 7;
			const limit = input?.limit ?? 10;
			const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

			return ctx.db
				.select({
					path: pageViews.path,
					views: count(),
				})
				.from(pageViews)
				.where(gte(pageViews.viewedAt, since))
				.groupBy(pageViews.path)
				.orderBy(desc(count()))
				.limit(limit);
		}),

	topReferrers: adminProcedure
		.input(
			z
				.object({
					days: z.number().min(1).max(90).default(7),
					limit: z.number().min(1).max(50).default(10),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const days = input?.days ?? 7;
			const limit = input?.limit ?? 10;
			const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

			return ctx.db
				.select({
					referrer: pageViews.referrer,
					views: count(),
				})
				.from(pageViews)
				.where(
					and(
						gte(pageViews.viewedAt, since),
						sql`${pageViews.referrer} IS NOT NULL AND ${pageViews.referrer} != ''`,
					),
				)
				.groupBy(pageViews.referrer)
				.orderBy(desc(count()))
				.limit(limit);
		}),
});
