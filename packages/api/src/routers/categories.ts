import { categories, documents } from "@docs-badry/db/schema";
import { asc, count, eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const categoriesRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		const rows = await ctx.db
			.select({
				id: categories.id,
				slug: categories.slug,
				title: categories.title,
				description: categories.description,
				icon: categories.icon,
				sortOrder: categories.sortOrder,
				documentCount: count(documents.id),
			})
			.from(categories)
			.leftJoin(documents, eq(categories.id, documents.categoryId))
			.groupBy(categories.id)
			.orderBy(asc(categories.sortOrder));

		return rows;
	}),

	create: adminProcedure
		.input(
			z.object({
				slug: z.string(),
				title: z.string(),
				description: z.string().optional(),
				icon: z.string().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [cat] = await ctx.db
				.insert(categories)
				.values(input)
				.returning();
			return cat;
		}),

	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				slug: z.string().optional(),
				title: z.string().optional(),
				description: z.string().optional(),
				icon: z.string().nullable().optional(),
				sortOrder: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const [cat] = await ctx.db
				.update(categories)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(categories.id, id))
				.returning();
			return cat;
		}),

	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const [docCount] = await ctx.db
				.select({ total: count() })
				.from(documents)
				.where(eq(documents.categoryId, input.id));

			if (docCount && docCount.total > 0) {
				throw new Error(
					"Cannot delete category with existing documents. Remove or reassign documents first.",
				);
			}

			await ctx.db.delete(categories).where(eq(categories.id, input.id));
		}),

	reorder: adminProcedure
		.input(z.array(z.object({ id: z.string(), sortOrder: z.number() })))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.transaction(async (tx) => {
				for (const item of input) {
					await tx
						.update(categories)
						.set({ sortOrder: item.sortOrder })
						.where(eq(categories.id, item.id));
				}
			});
		}),
});
