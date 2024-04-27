<script lang="ts" setup>
import siteConfig from '../site-config'
</script>

<template>
  <footer class="w-full px-6 pt-4 pb-12 max-w-3xl mx-auto opacity-60">
    <div class="mb-6 flex flex-wrap gap-x-4 gap-y-2">

      <a v-for="link in siteConfig.footerNavLinks" :href="link.href" target="_blank" rel="noopener noreferrer"
        class="prose-link flex items-center">
        <span>{{ link.text }}</span>
      </a>

    </div>
  </footer>
</template>