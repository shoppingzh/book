<template>
  <!-- <iframe
    class="border-none outline-none"
    :src="src"
    width="100%"
    height="1000"
    v-bind="$attrs"></iframe> -->
  <img :src="src">
</template>

<script setup>
import { onMounted, reactive } from 'vue';

const docSize = reactive({
  width: null,
  height: null,
})

defineProps({
  src: String,
})

onMounted(() => {
  const el = document.querySelector('.VPDoc > .container > .content .content-container')
  if (!el) return
  docSize.width = el.clientWidth
  docSize.height = el.clientHeight
})
</script>