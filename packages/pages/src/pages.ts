import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { z } from "zod";
import { procedure, router } from "./trpc";

export const pages = sqliteTable("pages", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  postedAt: integer("posted_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  path: text("path").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const pagesRouter = router({
  put: procedure
    .input(
      z.object({
        id: z.string().optional(),
        path: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = drizzle(ctx.env.DB, { schema: { pages } });
      return db
        .insert(pages)
        .values(input)
        .onConflictDoUpdate({ target: pages.id, set: input })
        .returning();
    }),
  list: procedure.query(({ ctx }) => {
    const db = drizzle(ctx.env.DB, { schema: { pages } });
    return db.query.pages.findMany({});
  }),
  get: procedure.input(z.string()).query(({ ctx, input }) => {
    const db = drizzle(ctx.env.DB, { schema: { pages } });
    return db.query.pages.findFirst({ where: eq(pages.path, input) });
  }),
});
