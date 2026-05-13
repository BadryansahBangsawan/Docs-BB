import { sessions } from "@docs-badry/db/schema";
import { adminUsers } from "@docs-badry/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

import {
	clearSessionCookie,
	createSessionCookie,
	verifyPassword,
} from "../auth";
import { publicProcedure, router } from "../index";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const adminRouter = router({
	login: publicProcedure
		.input(z.object({ email: z.string().email(), password: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const [user] = await ctx.db
				.select()
				.from(adminUsers)
				.where(eq(adminUsers.email, input.email))
				.limit(1);

			if (!user) {
				return { success: false as const, error: "Invalid credentials" };
			}

			const valid = await verifyPassword(input.password, user.passwordHash);
			if (!valid) {
				return { success: false as const, error: "Invalid credentials" };
			}

			const sessionId = crypto.randomUUID();
			const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

			await ctx.db.insert(sessions).values({
				id: sessionId,
				userId: user.id,
				expiresAt,
			});

			ctx.resHeaders.append(
				"Set-Cookie",
				createSessionCookie(sessionId, SESSION_MAX_AGE),
			);

			return { success: true as const, user: { id: user.id, name: user.name } };
		}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		ctx.resHeaders.append("Set-Cookie", clearSessionCookie());
		return { success: true };
	}),

	me: publicProcedure.query(({ ctx }) => {
		return ctx.admin;
	}),

	seed: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(8),
				name: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { hashPassword } = await import("../auth");

			const existing = await ctx.db
				.select({ id: adminUsers.id })
				.from(adminUsers)
				.limit(1);

			if (existing.length > 0) {
				return { success: false as const, error: "Admin user already exists" };
			}

			const passwordHash = await hashPassword(input.password);
			const [user] = await ctx.db
				.insert(adminUsers)
				.values({
					email: input.email,
					passwordHash,
					name: input.name,
				})
				.returning();

			return { success: true as const, userId: user?.id };
		}),
});
