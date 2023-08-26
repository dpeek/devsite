import { initTRPC } from "@trpc/server";

const { procedure, router } = initTRPC.context<Env>().create();

export { procedure, router };
