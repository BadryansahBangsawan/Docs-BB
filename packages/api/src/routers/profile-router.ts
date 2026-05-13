import { profile } from "@docs-badry/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../index";

export const profileRouter = router({
	get: publicProcedure.query(async ({ ctx }) => {
		const [row] = await ctx.db
			.select()
			.from(profile)
			.where(eq(profile.id, "main"))
			.limit(1);
		return row ?? null;
	}),

	update: adminProcedure
		.input(
			z.object({
				name: z.string().optional(),
				shortName: z.string().nullable().optional(),
				username: z.string().nullable().optional(),
				title: z.string().nullable().optional(),
				location: z.string().nullable().optional(),
				workMode: z.string().nullable().optional(),
				siteUrl: z.string().nullable().optional(),
				description: z.string().nullable().optional(),
				about: z.array(z.string()).optional(),
				skills: z.array(z.string()).optional(),
				avatarUrl: z.string().nullable().optional(),
				resumeUrl: z.string().nullable().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.db
				.select({ id: profile.id })
				.from(profile)
				.where(eq(profile.id, "main"))
				.limit(1);

			if (existing.length === 0) {
				const [row] = await ctx.db
					.insert(profile)
					.values({ id: "main", name: input.name ?? "Admin", ...input })
					.returning();
				return row;
			}

			const [row] = await ctx.db
				.update(profile)
				.set({ ...input, updatedAt: new Date() })
				.where(eq(profile.id, "main"))
				.returning();
			return row;
		}),
});
