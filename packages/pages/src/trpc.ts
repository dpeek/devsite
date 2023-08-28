import { initTRPC } from "@trpc/server";

type FetchRequest = Request<
  HostMetadata,
  IncomingRequestCfProperties<HostMetadata>
>;

type FetchContext = { env: Env; req: FetchRequest; exe: ExecutionContext };

const { procedure, router } = initTRPC.context<FetchContext>().create();

export { procedure, router };
