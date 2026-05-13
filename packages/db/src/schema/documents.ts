import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { categories } from "./categories";

export const documents = sqliteTable("documents", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text("slug").notNull().unique(),
	title: text("title").notNull(),
	description: text("description").default(""),
	body: text("body").notNull().default(""),
	categoryId: text("category_id")
		.notNull()
		.references(() => categories.id),
	author: text("author"),
	image: text("image"),
	sortOrder: integer("sort_order").notNull().default(0),
	status: text("status", { enum: ["draft", "published"] })
		.notNull()
		.default("draft"),
	publishedAt: integer("published_at", { mode: "timestamp" }),
	metaTitle: text("meta_title"),
	metaDescription: text("meta_description"),
	ogImage: text("og_image"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
