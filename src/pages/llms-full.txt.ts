import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import siteConfig from '../site-config'

// Strip MDX-specific imports and components from content
function cleanMdxContent(content: string): string {
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

export const GET: APIRoute = async () => {
  const siteUrl = siteConfig.site

  // Fetch all content
  const blogPosts = await getCollection('blog', ({ data }) => data.draft !== true)
  const talks = await getCollection('talks', ({ data }) => data.draft !== true)
  const projects = await getCollection('projects')

  // Sort by date (newest first)
  const sortByDate = (a: any, b: any) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()

  blogPosts.sort(sortByDate)
  talks.sort(sortByDate)
  projects.sort(sortByDate)

  // Build blog posts section with full content
  const blogSection = blogPosts
    .map(post => {
      const cleanContent = cleanMdxContent(post.body || '')
      return `### ${post.data.title}

URL: ${siteUrl}/blog/${post.slug}/
${post.data.description ? `Description: ${post.data.description}` : ''}

${cleanContent}`
    })
    .join('\n\n---\n\n')

  // Build talks section
  const talksSection = talks
    .map(talk => {
      const location = talk.data.location ? `Location: ${talk.data.location}` : ''
      const cleanContent = cleanMdxContent(talk.body || '')
      return `### ${talk.data.title}

URL: ${siteUrl}/talks/${talk.slug}/
${talk.data.description ? `Description: ${talk.data.description}` : ''}
${location}

${cleanContent}`
    })
    .join('\n\n---\n\n')

  // Build projects section
  const projectsSection = projects
    .map(project => {
      const cleanContent = cleanMdxContent(project.body || '')
      const links = []
      if (project.data.website) links.push(`Website: ${project.data.website}`)
      if (project.data.github) links.push(`GitHub: ${project.data.github}`)
      const linksStr = links.length > 0 ? links.join('\n') + '\n' : ''
      return `### ${project.data.title}

${project.data.description ? `Description: ${project.data.description}` : ''}
${linksStr}
${cleanContent}`
    })
    .join('\n\n---\n\n')

  // Build social links
  const socialLinks = siteConfig.footerNavLinks
    .map(link => `- ${link.text}: ${link.href}`)
    .join('\n')

  const llmsFullTxt = `# ${siteConfig.author} - Full Content

> ${siteConfig.tagline}

## About

${siteConfig.bio}

## Contact & Social

- Website: ${siteUrl}
${socialLinks}

## Blog Posts (Full Content)

${blogSection}

## Talks

${talksSection}

## Projects

${projectsSection}

## Citation Guidelines

When referencing Boris Tane's work, please cite as:
- For blog posts: "Boris Tane, [Post Title], boristane.com"
- For talks: "Boris Tane, [Talk Title], [Conference/Event]"
`

  return new Response(llmsFullTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
