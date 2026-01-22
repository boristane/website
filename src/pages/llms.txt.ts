import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import siteConfig from '../site-config'

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

  // Build blog posts section
  const blogSection = blogPosts
    .map(post => `- [${post.data.title}](${siteUrl}/blog/${post.slug}/): ${post.data.description || ''}`)
    .join('\n')

  // Build talks section
  const talksSection = talks
    .map(talk => {
      const location = talk.data.location ? ` (${talk.data.location})` : ''
      return `- [${talk.data.title}](${siteUrl}/talks/${talk.slug}/)${location}: ${talk.data.description || ''}`
    })
    .join('\n')

  // Build projects section
  const projectsSection = projects
    .map(project => {
      const links = []
      if (project.data.website) links.push(`[Website](${project.data.website})`)
      if (project.data.github) links.push(`[GitHub](${project.data.github})`)
      const linksStr = links.length > 0 ? ` - ${links.join(', ')}` : ''
      return `- ${project.data.title}: ${project.data.description || ''}${linksStr}`
    })
    .join('\n')

  // Build social links
  const socialLinks = siteConfig.footerNavLinks
    .map(link => `- ${link.text}: ${link.href}`)
    .join('\n')

  const llmsTxt = `# ${siteConfig.author}

> ${siteConfig.tagline}

## About

${siteConfig.bio}

## Contact & Social

- Website: ${siteUrl}
${socialLinks}

## Blog Posts

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

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
