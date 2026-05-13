import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioProjects = sqliteTable("portfolio_projects", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	description: text("description").notNull().default(""),
	content: text("content"),
	linkDemo: text("link_demo"),
	linkGithub: text("link_github"),
	stacks: text("stacks", { mode: "json" }).notNull().$type<string[]>().default([]),
	image: text("image").notNull().default(""),
	isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
	sortOrder: integer("sort_order").notNull().default(0),
	status: text("status", { enum: ["draft", "published"] })
		.notNull()
		.default("draft"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
