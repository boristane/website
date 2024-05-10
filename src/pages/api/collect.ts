import type { APIRoute } from "astro";
import { collect } from "../../services/analytics/collect";
import { BaselimeLogger } from "@baselime/edge-logger"
import type { ExecutionContext } from "@cloudflare/workers-types";
import { getUrlParams } from "../../utils/utils";

export const GET: APIRoute = async ({ request, locals }) => {

  const { VIEWS, BASELIME_API_KEY, IS_LOCAL } = locals.runtime.env;

  const logger = new BaselimeLogger({
    service: "website",
    namespace: (new URL(request.url)).hostname,
    apiKey: BASELIME_API_KEY,
    ctx: locals.runtime.ctx,
    isLocalDev: !!IS_LOCAL,
  });

  const params = getUrlParams(request.url) as { slug: string; type: string; referrer?: string };
  const userAgent = request.headers.get("user-agent") || undefined;

  collect({
    body: params,
    headers: request.headers,
    VIEWS,
    userAgent,
    cf: (request as RequestInit).cf,
    url: request.url,
    logger,
  })

  return incrementResponse(logger, locals.runtime.ctx);
}

function incrementResponse(logger: BaselimeLogger, context: ExecutionContext) {
  // encode 1x1 transparent gif
  const gif = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const gifData = atob(gif);
  const gifLength = gifData.length;
  const arrayBuffer = new ArrayBuffer(gifLength);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < gifLength; i++) {
    uintArray[i] = gifData.charCodeAt(i);
  }

  context.waitUntil(logger.flush());
  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "image/gif",
      Expires: "Mon, 01 Jan 1990 00:00:00 GMT",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      "Last-Modified": new Date().toUTCString(),
      Tk: "N",
    },
    status: 200,
  });
}