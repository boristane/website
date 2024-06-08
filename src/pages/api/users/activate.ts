import type { APIRoute } from "astro";
import { BaselimeLogger } from "@baselime/edge-logger"
import type { ExecutionContext } from "@cloudflare/workers-types";
import { createUser } from "../../../services/db/users";

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB, BASELIME_API_KEY, IS_LOCAL } = locals.runtime.env;

  const url = new URL(request.url);
  const logger = new BaselimeLogger({
    service: "website",
    namespace: `${request.method} ${url.hostname}${url.pathname}`,
    apiKey: BASELIME_API_KEY,
    ctx: locals.runtime.ctx,
    isLocalDev: !!IS_LOCAL,
  });

  const body = await request.json() as { subscriber: { email_address: string, state: string, created_at: string, id: number } };

  logger.info("The request to add a subscriver", body);

  await createUser(DB, { id: `user_${body.subscriber.id}`, isVerified: true, email: body.subscriber.email_address });
  locals.runtime.ctx.waitUntil(logger.flush());

  return new Response(JSON.stringify({
    message: "Success"
  })
  )
}
