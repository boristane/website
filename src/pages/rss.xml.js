import rss from '@astrojs/rss'
import { marked } from 'marked'
import siteConfig from '../site-config'
import { getAllPosts } from '../utils/posts'

// Strip MDX-specific imports and components from content
function cleanMdxContent(content) {
  if (!content) return ''
  return content
    // Remove import statements
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    // Remove JSX-style component tags (self-closing and with content)
    .replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '')
    .replace(/<[A-Z][a-zA-Z]*\s*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '')
    // Clean up excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function GET(context) {
  const posts = await getAllPosts()

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || siteConfig.site,
    items: posts.map((item) => {
      const cleanContent = cleanMdxContent(item.body)
      return {
        ...item.data,
        link: `/${item.collection}/${item.slug}/`,
        pubDate: new Date(item.data.date),
        author: `${siteConfig.author}`,
        content: marked.parse(cleanContent),
      }
    }),
  })
}