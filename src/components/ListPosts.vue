<script lang="ts" setup>
interface Post {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list: Post[]
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
      <div py2 opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" mb-6>
      <div v-if="!isSameYear(post.data.date, list[index - 1]?.data.date)" select-none relative h18 pointer-events-none>
        <span text-7em color-transparent font-bold text-stroke-2 absolute top--0.2em relative -z-10 op60 class="text-stroke-[#eaeaea] dark:text-stroke-[#474747]">
          {{ getYear(post.data.date) }}
        </span>
      </div>
      <a text-lg lh-tight nav-link flex="~ col gap-2" :target="getTarget(post)" :href="getHref(post)">
        <div flex="~ col md:row gap-2 md:items-center">
          <div flex="~ gap-2 items-center text-wrap">
            <span lh-normal>
              <i v-if="post.data.draft" text-base vertical-mid i-ri-draft-line />
              {{ post.data.title }}
            </span>
          </div>
        </div>
        <div text-xs ws-nowrap flex="~ gap-1 items-center">
          <time :datetime="getDate(post.data.date)" >{{ post.data.date }}</time>
          <div>·</div>
          <div v-if="post.data.location">{{ post.data.location }}</div>
        </div>
        <div opacity-80 text-sm>{{ post.data.description }}</div>
      </a>
    </li>
  </ul>
</template>