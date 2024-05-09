import { defineCollection, z } from 'astro:content'

const postsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })),
  draft: z.boolean().optional().default(false),
  lang: z.string().optional().default('en-GB'),
  location: z.string().optional(),
  redirect: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
  }),
})

const blog = defineCollection({
  schema: postsSchema,
})

const talks = defineCollection({
  schema: postsSchema,
})

export const collections = { pages, blog, talks }