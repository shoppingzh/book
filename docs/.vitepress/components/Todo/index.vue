<template>
  <div ref="el" class="py-4 leading-tight text-secondary">

  </div>
</template>

<script setup lang="ts">
import TypeIt from 'typeit'
import { onMounted, ref } from 'vue'

const el = ref()

onMounted(() => {
  const instance = new TypeIt(el.value, {
    breakLines: true,
    html: true,
    strings: [
      '🤔 正在构思中..'
    ],
    speed: 30,
    loop: true,
    loopDelay: 3000,
  })
  instance.go()
})
</script>
