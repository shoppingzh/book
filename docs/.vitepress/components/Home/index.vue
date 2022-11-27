<template>
  <div ref="el" class="text-2xl font-semibold leading-loose tracking-wider"></div>
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
      'Hello, 我是晓平。',
      '很高兴与你相遇，一同学习知识。',
      // '',
      // '人生到处知何似，应似飞鸿踏雪泥',
      // '泥上偶然留指爪，鸿飞哪复计东西',
    ],
    speed: 50,
    // loop: true,
    // loopDelay: 15000,
  })
  instance.go()
})

</script>