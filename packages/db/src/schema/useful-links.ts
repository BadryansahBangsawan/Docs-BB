import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usefulLinks = sqliteTable("useful_links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text("title").notNull(),
	url: text("url").notNull(),
	description: text("description").default(""),
	category: text("category").default("general"),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
