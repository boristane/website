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
  count: {
    type: Number,
    required: true,
  }
});

const location = useBrowserLocation()
const views = ref(0);
const basePath = location.value.origin;

const numViews = computed(() => {
  return props.count || views.value || 0;
})

onMounted(async () => {
  if (!props.count) {
    const res = await fetch(`${basePath}/api/views/talk/${props.slug}`, {
      method: "GET",
    });

    views.value = ((await res.json()) as any)?.data?.views;
  }

  const params = new URLSearchParams({
    type: props.type,
    slug: props.slug,
    referrer: document.referrer
  });

  await fetch(`${basePath}/api/collect?${params}`, {
    method: "GET",
  });
})
</script>

<template>
  <div text-main font-mono opacity-50>
    {{ numViews }} view{{ numViews === 1 ? '' : 's' }}
  </div>
</template>