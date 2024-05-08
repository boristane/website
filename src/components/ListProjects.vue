<script lang="ts" setup>
interface Project {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list: Project[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Project) {
  if (post.data.redirect)
    return post.data.redirect
  return `/${post.collection}/${post.slug}`
}

function getTarget(posts: Project) {
  if (posts.data.redirect)
    return '_blank'
  return '_self'
}

</script>

<template>
  <ul>
    <template v-if="!list || list.length === 0">
      <div py2 text-gray-400>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" mb-6>
      <div text-lg lh-tight flex="~ col gap-1">
        <a :target="getTarget(post)" :href="getHref(post)" nav-link text-xl>
          <span lh-normal>
            <i v-if="post.data.draft" text-base vertical-mid i-ri-draft-line />
            {{ post.data.title }}
          </span>
        </a>
        <div text-gray-500 text-sm>{{ post.data.description }}</div>
        <div text-gray-500 text-xs ws-nowrap flex="~ gap-1 items-center">
          <time :datetime="getDate(post.data.date)" v-if="post.data.date">{{ post.data.date }}</time>
          <div>·</div>
          <div v-if="post.data.location">{{ post.data.location }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>