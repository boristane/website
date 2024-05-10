import type { APIRoute } from "astro";
import { BaselimeLogger } from "@baselime/edge-logger"
import type { ExecutionContext } from "@cloudflare/workers-types";
import { createUser, deleteUser } from "../../../services/db/users";

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB, BASELIME_API_KEY, IS_LOCAL } = locals.runtime.env;

  const logger = new BaselimeLogger({
    service: "website",
    namespace: request.url,
    apiKey: BASELIME_API_KEY,
    ctx: locals.runtime.ctx,
    isLocalDev: !!IS_LOCAL,
  });

  const body = await request.json() as { subscriber: { email_address: string, state: string, created_at: string, id: number } };

  logger.info("The request to delete a subscriber", body);

  await deleteUser(DB, `user_${body.subscriber.id}`);
  locals.runtime.ctx.waitUntil(logger.flush());

  return new Response(JSON.stringify({
    message: "Success"
  })
  )
}
