import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const socialLinks = sqliteTable("social_links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	label: text("label").notNull(),
	href: text("href").notNull(),
	description: text("description").default(""),
	icon: text("icon"),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
