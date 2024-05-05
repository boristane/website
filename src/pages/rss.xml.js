import rss from '@astrojs/rss'
import siteConfig from '../site-config'
import { getAllPosts } from '../utils/posts'

export async function GET(context) {
  const posts = await getAllPosts()

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || siteConfig.site,
    items: posts.map((item) => {
      return {
        ...item.data,
        link: `/${item.collection}/${item.slug}/`,
        pubDate: new Date(item.data.date),
        content: item.body,
        author: `${siteConfig.author} <${siteConfig.email}>`,
      }
    }),
  })
}