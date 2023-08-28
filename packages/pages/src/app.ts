import { pagesRouter } from "./pages";
import { router } from "./trpc";

export const appRouter = router({
  pages: pagesRouter,
});

export type AppRouter = typeof appRouter;
