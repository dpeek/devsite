import type { Config } from "drizzle-kit";

export default {
  schema: "./src/*",
  out: "./migrations",
} satisfies Config;
