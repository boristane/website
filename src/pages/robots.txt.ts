import type { APIRoute } from 'astro'
import siteConfig from '../site-config'

export const GET: APIRoute = () => {
  const siteUrl = siteConfig.site

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
