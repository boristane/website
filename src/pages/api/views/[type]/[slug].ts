import type { APIRoute } from "astro";
import { count } from "../../../../services/analytics/count";

export const GET: APIRoute = async ({ params, request, locals }) => {
  const { CLOUDFLARE_TOKEN, CLOUDFLARE_ACCOUNT } = locals.runtime.env;
  const data = await count(params.type || "", params.slug || "", CLOUDFLARE_ACCOUNT, CLOUDFLARE_TOKEN);
  
  return new Response(JSON.stringify({
    message: "Retrieved counts",
    data,
    params,
  }),
    {
      headers: {
        "Content-Type": "application/json",
        Expires: "Mon, 01 Jan 1990 00:00:00 GMT",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Last-Modified": new Date().toUTCString(),
        Tk: "N",
      }
    }
  )
}