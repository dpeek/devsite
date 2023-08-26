import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { procedure, router } from "./trpc";

export const posts = sqliteTable("posts", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  postedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const postsRouter = router({
  list: procedure.query(() => ["1", "2", "3"]),
});
