import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { adminUsers } from "./admin-users";

export const media = sqliteTable("media", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	filename: text("filename").notNull(),
	url: text("url").notNull(),
	mimeType: text("mime_type").notNull(),
	size: integer("size").notNull(),
	altText: text("alt_text").default(""),
	uploadedBy: text("uploaded_by").references(() => adminUsers.id),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
