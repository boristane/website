<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useBrowserLocation } from '@vueuse/core'


const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const location = useBrowserLocation()
const basePath = location.value.origin;

onMounted(async () => {
  const params = new URLSearchParams({
    type: props?.type,
    slug: props?.slug,
    referrer: document.referrer
  });

  await fetch(`${basePath}/api/collect?${params}`, {
    method: "GET",
  });
})
</script>

<template>
</template>