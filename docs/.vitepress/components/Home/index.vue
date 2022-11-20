<template>
  <div ref="el" class="text-3xl font-semibold"></div>
</template>

<script setup lang="ts">
import TypeIt from 'typeit'
import { onMounted, ref } from 'vue'

const el = ref()

onMounted(() => {
  const instance = new TypeIt(el.value, {
    strings: [
      'Hello, 我是晓平.',
    ],
    loop: true,
    loopDelay: 5000,
  })
  instance.go()
})

</script>