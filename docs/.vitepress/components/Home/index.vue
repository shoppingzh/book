<template>
  <div
    ref="el"
    class="text-2xl font-semibold leading-loose tracking-wider transition-all duration-300 ease-in-out"
    :class="{ 'is-done text-3xl': isDone }"></div>
</template>

<script setup lang="ts">
import TypeIt from 'typeit'
import { onMounted, ref } from 'vue'

const el = ref()
const isDone = ref(false)

onMounted(() => {
  const instance = new TypeIt(el.value, {
    breakLines: true,
    html: true,
    strings: [
      'Hello, 我是晓平。',
      '很高兴与你相遇，一同学习知识。',
      '希望你能玩得开心！'
    ],
    speed: 65,
    // loop: true,
    // loopDelay: 15000,
    afterComplete: () => {
      setTimeout(() => {
        isDone.value =  true
      }, 500)
    }
  })
  instance.go()
})

</script>

<style scoped>
.is-done {
  @apply text-transparent;
  background: linear-gradient(to bottom, theme('colors.b-primary.DEFAULT'), theme('colors.b-success.DEFAULT'));
  -webkit-background-clip: text;
}
</style>
