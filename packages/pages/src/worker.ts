import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./app";

const worker: ExportedHandler<Env, QueueMessage, HostMetadata> = {
  async fetch(req, env, exe) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/trpc")) {
      return fetchRequestHandler({
        endpoint: "/trpc",
        req: req,
        router: appRouter,
        createContext: () => ({ req, env, exe }),
      });
    }
    return env.ASSETS.fetch(req);
  },
};

export default worker;
