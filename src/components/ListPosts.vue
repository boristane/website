<script lang="ts" setup>
import ListTags from './ListTags.vue';

interface Post {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list: Post[],
  mini?: boolean,
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Post) {
  if (post.data.redirect)
    return post.data.redirect
  return `/${post.collection}/${post.slug}`
}

function getTarget(posts: Post) {
  if (posts.data.redirect)
    return '_blank'
  return '_self'
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}
</script>

<template>
  <ul>
    <template v-if="!list || list.length === 0">
      <div py2 text-gray-400>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" :class="mini ? 'mb-4' : 'mb-6'">
      <div v-if="!isSameYear(post.data.date, list[index - 1]?.data.date) && !mini" select-none relative h18
        pointer-events-none>
        <span text-7em -ml-2 xl:-ml-18 absolute top--0.2em relative -z-10
          class="font-neucha text-[#eaeaea] dark:text-[#474747]">
          {{ getYear(post.data.date) }}
        </span>
      </div>
      <div text-lg lh-tight flex="~ col gap-1">
        <div flex="~ col" md:flex="~ row gap-1 items-center" flex-wrap :class="mini ? 'text-sm' : 'text-lg'">
          <time w-32 :datetime="getDate(post.data.date)" v-if="mini" flex-none>{{ post.data.date }}</time>
          <a :target="getTarget(post)" :href="getHref(post)" nav-link :class="mini ? 'text-lg text-link' : 'text-2xl'">
            <span lh-normal>
              <i v-if="post.data.draft" text-base vertical-mid i-ri-draft-line />
              {{ post.data.title }}
            </span>
          </a>
        </div>
        <div text-gray-500 text-md v-if="!mini">{{ post.data.description }}</div>
        <div text-gray-500 text-sm ws-nowrap flex="~ gap-1 items-center" flex-wrap w-full v-if="!mini">
          <time :datetime="getDate(post.data.date)">{{ post.data.date }}</time>
          <div v-if="post.data.location" flex="~ gap-1 items-center">
            <div>·</div>
            <div>{{ post.data.location }}</div>
          </div>
          <div v-if="post.data.tags && post.data.tags.length" flex="~ gap-1 items-center">
            <div>·</div>
            <ListTags :tags="post.data.tags" />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>