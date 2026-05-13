import { usefulLinks } from "@docs-badry/db/schema";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const usefulLinksRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.db
			.select()
			.from(usefulLinks)
			.orderBy(asc(usefulLinks.sortOrder));
	}),

	create: adminProcedure
		.input(
			z.object({
				title: z.string(),
				url: z.string(),
				description: z.string().optional(),
				category: z.string().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [link] = await ctx.db
				.insert(usefulLinks)
				.values(input)
				.returning();
			return link;
		}),

	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				url: z.string().optional(),
				description: z.string().optional(),
				category: z.string().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const [link] = await ctx.db
				.update(usefulLinks)
				.set(data)
				.where(eq(usefulLinks.id, id))
				.returning();
			return link;
		}),

	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(usefulLinks).where(eq(usefulLinks.id, input.id));
		}),
});
