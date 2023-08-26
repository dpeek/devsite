import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const { procedure, router } = initTRPC.context<Env>().create();

const postsRouter = router({
  list: procedure.query(async ({ ctx }) => {
    return ["1", "2", "3"];
  }),
});

const appRouter = router({
  posts: postsRouter,
});

// export { procedure, router };
// export default appRouter;
// export type AppRouter = typeof appRouter;

export const onRequest: PagesFunction<Env> = async (ctx) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: ctx.request,
    router: appRouter,
    createContext: () => ctx.env,
  });
};
