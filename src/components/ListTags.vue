<script lang="ts" setup>


withDefaults(defineProps<{
  tags: string[]
}>(), {
  tags: () => [],
})

function getHref(tag: string) {
  return `/tags/${tag}`
}



</script>

<template>
  <ul v-if="tags && tags.length" class="flex flex-wrap items-center gap-1 text-main text-gray-400 w-full">[
  <li v-for="(tag, index) in tags" :key="tag" class="block">
    <a :href="getHref(tag)" class="bg-gray-100 px-2 py-[1px] text-sky-600 rounded hover:text-white hover:bg-sky-600 transition">
      <span lh-normal>
        {{ tag }}
      </span>
    </a>
  </li>
  ]
</ul>
</template>