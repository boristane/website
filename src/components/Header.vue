<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { onClickOutside, useWindowSize } from '@vueuse/core'
import siteConfig from '../site-config'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.headerNavLinks || []

const menuRef = ref(null)

defineProps<{
  pathname: string
}>()

const menu = ref(false)

function toggleMenu() {
  menu.value = !menu.value
}

const { width } = useWindowSize()

onClickOutside(menuRef, () => {
  if (width.value < 640)
    menu.value = false
})

watchEffect(() => {
  if (width.value > 640)
    menu.value = true
  else
    menu.value = false
})
</script>

<template>
  <header text-lg max-w-3xl mx-auto h-32 sm:h-18 px-6 flex mt-5 sm:mt-0 justify-between items-start sm:items-center relative>
    <div>
      <a href="/" nav-link font-500 text-xl hover:text-gray-800>boris tane</a>
    </div>
    <div flex gap-2 sm:gap-6 sm:flex-row flex-col>
      <a v-for="link in navLinks" :key="link.text" nav-link
        :class="pathname.includes(link.href) ? 'text-sky-600' : 'opacity-60  hover:opacity-100'" :href="link.href">
        {{ link.text }}
      </a>
      <div flex items-center>
        <a nav-link href="/rss.xml" i-ri-rss-line opacity-60 hover:opacity-100 w-5 h-5 />
      </div>
      <ThemeToggle />
    </div>
  </header>
</template>