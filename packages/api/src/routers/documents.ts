import { categories, documents } from "@docs-badry/db/schema";
import { and, asc, count, eq, like } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const documentsRouter = router({
	list: adminProcedure
		.input(
			z
				.object({
					status: z.enum(["draft", "published"]).optional(),
					categoryId: z.string().optional(),
					search: z.string().optional(),
					limit: z.number().min(1).max(100).default(20),
					offset: z.number().min(0).default(0),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const filters = [];

			if (input?.status) {
				filters.push(eq(documents.status, input.status));
			}
			if (input?.categoryId) {
				filters.push(eq(documents.categoryId, input.categoryId));
			}
			if (input?.search) {
				filters.push(like(documents.title, `%${input.search}%`));
			}

			const where = filters.length > 0 ? and(...filters) : undefined;

			const [rows, totalResult] = await Promise.all([
				ctx.db
					.select({
						id: documents.id,
						slug: documents.slug,
						title: documents.title,
						description: documents.description,
						categoryId: documents.categoryId,
						categoryTitle: categories.title,
						author: documents.author,
						image: documents.image,
						sortOrder: documents.sortOrder,
						status: documents.status,
						publishedAt: documents.publishedAt,
						createdAt: documents.createdAt,
						updatedAt: documents.updatedAt,
					})
					.from(documents)
					.leftJoin(categories, eq(documents.categoryId, categories.id))
					.where(where)
					.orderBy(asc(documents.sortOrder), asc(documents.title))
					.limit(input?.limit ?? 20)
					.offset(input?.offset ?? 0),
				ctx.db.select({ total: count() }).from(documents).where(where),
			]);

			return { items: rows, total: totalResult[0]?.total ?? 0 };
		}),

	getById: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const [doc] = await ctx.db
				.select()
				.from(documents)
				.where(eq(documents.id, input.id))
				.limit(1);
			return doc ?? null;
		}),

	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const [doc] = await ctx.db
				.select()
				.from(documents)
				.where(
					and(
						eq(documents.slug, input.slug),
						eq(documents.status, "published"),
					),
				)
				.limit(1);
			return doc ?? null;
		}),

	create: adminProcedure
		.input(
			z.object({
				slug: z.string(),
				title: z.string(),
				description: z.string().optional(),
				body: z.string().optional(),
				categoryId: z.string(),
				author: z.string().optional(),
				image: z.string().optional(),
				sortOrder: z.number().optional(),
				status: z.enum(["draft", "published"]).optional(),
				metaTitle: z.string().optional(),
				metaDescription: z.string().optional(),
				ogImage: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [doc] = await ctx.db
				.insert(documents)
				.values({
					...input,
					publishedAt:
						input.status === "published" ? new Date() : undefined,
				})
				.returning();
			return doc;
		}),

	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				slug: z.string().optional(),
				title: z.string().optional(),
				description: z.string().optional(),
				body: z.string().optional(),
				categoryId: z.string().optional(),
				author: z.string().optional(),
				image: z.string().nullable().optional(),
				sortOrder: z.number().optional(),
				status: z.enum(["draft", "published"]).optional(),
				metaTitle: z.string().nullable().optional(),
				metaDescription: z.string().nullable().optional(),
				ogImage: z.string().nullable().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const [doc] = await ctx.db
				.update(documents)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(documents.id, id))
				.returning();
			return doc;
		}),

	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(documents).where(eq(documents.id, input.id));
		}),

	publish: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const [doc] = await ctx.db
				.update(documents)
				.set({
					status: "published",
					publishedAt: new Date(),
					updatedAt: new Date(),
				})
				.where(eq(documents.id, input.id))
				.returning();
			return doc;
		}),

	unpublish: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const [doc] = await ctx.db
				.update(documents)
				.set({
					status: "draft",
					publishedAt: null,
					updatedAt: new Date(),
				})
				.where(eq(documents.id, input.id))
				.returning();
			return doc;
		}),

	reorder: adminProcedure
		.input(z.array(z.object({ id: z.string(), sortOrder: z.number() })))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.transaction(async (tx) => {
				for (const item of input) {
					await tx
						.update(documents)
						.set({ sortOrder: item.sortOrder })
						.where(eq(documents.id, item.id));
				}
			});
		}),
});
