import { getCollection } from 'astro:content'
import type { CollectionPosts, Posts } from '../types'

export function sortPostsByDate(itemA: CollectionPosts, itemB: CollectionPosts) {
  return new Date((itemB as any).data.date).getTime() - new Date((itemA as any).data.date).getTime()
}

export async function getPosts(type: Posts, tag?: string) {
  const isProd = import.meta.env.PROD;
  return (await getCollection(type, data => {
    if (tag) {
      return (data as any).data.tags?.includes(tag) ? true : false;
    }
    return true;
  })).filter((item: CollectionPosts) => isProd ? (item as any).draft !== true : true).sort(sortPostsByDate)
}

export async function getAllPosts(tag?: string) {
  const posts = await Promise.all([
    getPosts('blog', tag),
    getPosts('talks', tag),
  ])
  return posts.flat().sort(sortPostsByDate)
}
