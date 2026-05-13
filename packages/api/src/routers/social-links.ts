import { socialLinks } from "@docs-badry/db/schema";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const socialLinksRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.db
			.select()
			.from(socialLinks)
			.orderBy(asc(socialLinks.sortOrder));
	}),

	create: adminProcedure
		.input(
			z.object({
				label: z.string(),
				href: z.string(),
				description: z.string().optional(),
				icon: z.string().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [link] = await ctx.db
				.insert(socialLinks)
				.values(input)
				.returning();
			return link;
		}),

	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				label: z.string().optional(),
				href: z.string().optional(),
				description: z.string().optional(),
				icon: z.string().nullable().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const [link] = await ctx.db
				.update(socialLinks)
				.set(data)
				.where(eq(socialLinks.id, id))
				.returning();
			return link;
		}),

	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(socialLinks).where(eq(socialLinks.id, input.id));
		}),

	reorder: adminProcedure
		.input(z.array(z.object({ id: z.string(), sortOrder: z.number() })))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.transaction(async (tx) => {
				for (const item of input) {
					await tx
						.update(socialLinks)
						.set({ sortOrder: item.sortOrder })
						.where(eq(socialLinks.id, item.id));
				}
			});
		}),
});
