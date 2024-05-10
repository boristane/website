<script lang="ts" setup>


withDefaults(defineProps<{
  topics: string[]
}>(), {
  topics: () => [],
})





</script>

<template>
  <ul v-if="topics && topics.length" class="flex items-center gap-1 text-main text-gray-400">[
    <li v-for="(topic, index) in topics " :key="topic">
      <span lh-normal class="bg-gray-100 px-2 py-[1px] text-sky-600 rounded">
        {{ topic }}
      </span>
    </li>
    ]
  </ul>
</template>