import { db } from "@docs-badry/db";
import { adminUsers, sessions } from "@docs-badry/db/schema";
import { and, eq, gt } from "drizzle-orm";

import { parseCookies } from "./auth";

export async function createContext(opts: {
	req: Request;
	resHeaders: Headers;
}) {
	const cookieHeader = opts.req.headers.get("cookie") ?? "";
	const cookies = parseCookies(cookieHeader);
	const sessionToken = cookies.admin_session;

	let admin: { id: string; email: string; name: string } | null = null;

	if (sessionToken) {
		const now = new Date();
		const result = await db
			.select({
				userId: sessions.userId,
				email: adminUsers.email,
				name: adminUsers.name,
			})
			.from(sessions)
			.innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
			.where(and(eq(sessions.id, sessionToken), gt(sessions.expiresAt, now)))
			.limit(1);

		const row = result[0];
		if (row) {
			admin = { id: row.userId, email: row.email, name: row.name };
		}
	}

	return {
		db,
		admin,
		resHeaders: opts.resHeaders,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
