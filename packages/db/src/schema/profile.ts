import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable("profile", {
	id: text("id").primaryKey().default("main"),
	name: text("name").notNull(),
	shortName: text("short_name"),
	username: text("username"),
	title: text("title"),
	location: text("location"),
	workMode: text("work_mode"),
	siteUrl: text("site_url"),
	description: text("description"),
	about: text("about", { mode: "json" }).notNull().$type<string[]>().default([]),
	skills: text("skills", { mode: "json" }).notNull().$type<string[]>().default([]),
	avatarUrl: text("avatar_url"),
	resumeUrl: text("resume_url"),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
