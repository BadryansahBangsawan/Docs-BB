import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pageViews = sqliteTable(
	"page_views",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		path: text("path").notNull(),
		referrer: text("referrer"),
		userAgent: text("user_agent"),
		country: text("country"),
		viewedAt: integer("viewed_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`),
	},
	(table) => [
		index("idx_page_views_path").on(table.path),
		index("idx_page_views_viewed_at").on(table.viewedAt),
	],
);
