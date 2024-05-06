<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'

withDefaults(defineProps<{
  showShare?: boolean
  showBack?: boolean
  url?: URL
}>(), {
  showShare: false,
  showBack: true,
})

const shareLinks = [
  {
    text: 'Twitter',
    icon: 'i-ri-twitter-line',
    href: 'https://twitter.com/intent/tweet?url=',
  },
  {
    text: 'Mail',
    icon: 'i-ri-mail-line',
    href: 'mailto:?subject=See%20this%20post&body=',
  },
]

const { y: scroll } = useWindowScroll()

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div sm:flex="~ flex-row items-start justify-between" w-full font-mono text-main>
    <div>
      <div v-if="showShare" flex="~ gap-2 items-center flex-wrap" mb-2>
        <i i-ri-arrow-right-s-line />
        <span>share on</span>
        <a v-for="link in shareLinks" :key="link.text" prose-link lh-tight flex class="item-center" :href="link.href + url">
          <i v-if="link.icon"  :class="link.icon" mr-0.8 />
          <div>
            {{ link.text }}
          </div>
        </a>
      </div>
      <div v-if="showBack" flex="~ gap-2 items-center">
        <i i-ri-arrow-right-s-line />
        <a prose-link href="javascript:history.back(-1)">cd ..</a>
      </div>
    </div>
    <div v-show="scroll > 300" cursor-pointer sm:m-0 mt-6 flex="~ gap-2 items-center" sm:gap-2>
      <i vertical-mid i-ri-arrow-up-line />
      <span prose-link @click="toTop()">Scroll to top</span>
    </div>
  </div>
</template>