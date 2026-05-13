import { portfolioProjects } from "@docs-badry/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const portfolioRouter = router({
	list: adminProcedure
		.input(
			z
				.object({
					status: z.enum(["draft", "published"]).optional(),
					featured: z.boolean().optional(),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const filters = [];
			if (input?.status) {
				filters.push(eq(portfolioProjects.status, input.status));
			}
			if (input?.featured !== undefined) {
				filters.push(eq(portfolioProjects.isFeatured, input.featured));
			}
			const where = filters.length > 0 ? and(...filters) : undefined;

			return ctx.db
				.select()
				.from(portfolioProjects)
				.where(where)
				.orderBy(asc(portfolioProjects.sortOrder));
		}),

	listPublic: publicProcedure.query(async ({ ctx }) => {
		return ctx.db
			.select()
			.from(portfolioProjects)
			.where(eq(portfolioProjects.status, "published"))
			.orderBy(asc(portfolioProjects.sortOrder));
	}),

	getById: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const [project] = await ctx.db
				.select()
				.from(portfolioProjects)
				.where(eq(portfolioProjects.id, input.id))
				.limit(1);
			return project ?? null;
		}),

	create: adminProcedure
		.input(
			z.object({
				title: z.string(),
				slug: z.string(),
				description: z.string().optional(),
				content: z.string().optional(),
				linkDemo: z.string().nullable().optional(),
				linkGithub: z.string().nullable().optional(),
				stacks: z.array(z.string()).optional(),
				image: z.string().optional(),
				isFeatured: z.boolean().optional(),
				sortOrder: z.number().optional(),
				status: z.enum(["draft", "published"]).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [project] = await ctx.db
				.insert(portfolioProjects)
				.values(input)
				.returning();
			return project;
		}),

	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				slug: z.string().optional(),
				description: z.string().optional(),
				content: z.string().nullable().optional(),
				linkDemo: z.string().nullable().optional(),
				linkGithub: z.string().nullable().optional(),
				stacks: z.array(z.string()).optional(),
				image: z.string().optional(),
				isFeatured: z.boolean().optional(),
				sortOrder: z.number().optional(),
				status: z.enum(["draft", "published"]).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const [project] = await ctx.db
				.update(portfolioProjects)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(portfolioProjects.id, id))
				.returning();
			return project;
		}),

	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(portfolioProjects)
				.where(eq(portfolioProjects.id, input.id));
		}),

	toggleFeatured: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const [current] = await ctx.db
				.select({ isFeatured: portfolioProjects.isFeatured })
				.from(portfolioProjects)
				.where(eq(portfolioProjects.id, input.id))
				.limit(1);

			if (!current) return null;

			const [project] = await ctx.db
				.update(portfolioProjects)
				.set({ isFeatured: !current.isFeatured, updatedAt: new Date() })
				.where(eq(portfolioProjects.id, input.id))
				.returning();
			return project;
		}),
});
