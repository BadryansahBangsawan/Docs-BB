import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text("slug").notNull().unique(),
	title: text("title").notNull(),
	description: text("description").default(""),
	icon: text("icon"),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
