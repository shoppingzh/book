<template>
  <div class="w-full h-full relative z-[2] px-4">
    <div>
      <div
        ref="el"
        class="text-2xl  leading-loose tracking-wider transition-all duration-300 ease-in-out">
      </div>
      <div v-if="isDone" class="mt-10">
        <div
          class="animate__animated animate__fadeInLeft animate__faster text-b-primary flex items-center cursor-pointer"
          @click="goFe">
          <el-icon class="mr-2 text-lg"><Guide /></el-icon>
          前端工程师技术栈
        </div>
      </div>
    </div>
  </div>
  <div class="fixed z-1 right-[10%] bottom-[10%] md:top-[120px] w-48 h-48 md:w-96 md:h-96">
    <css-doodle>
      @grid: 1x10 / 85%;

      @place: center;
      @size: calc(@i * 10%);

      border-radius: 50%;
      border-style: dashed;
      border-width: calc(@i * 4px);
      border-color: hsla(
        calc(20 * @i), 70%, 68%,
        calc(3 / @i * .8)
      );

      transform: rotate(@r(360deg));
    </css-doodle>
  </div>

  <!-- <div class="fixed z-[100] right-0 bottom-0 w-[300px] h-[300px] bg-red-500/80 rounded-full translate-x-[100%] translate-y-[100%]
    duration-500 transition-all"
    :class="{ 'translate-x-[50%] translate-y-[50%]': isDone }"  /> -->
    
</template>

<script setup lang="ts">
import TypeIt from 'typeit'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import 'css-doodle'

const el = ref()
const isDone = ref(false)
const router = useRouter()

const words = `
Hello, 我是晓平。
很高兴与你相遇，一同学习知识。
希望你能玩得开心！！
`

onMounted(() => {
  const instance = new TypeIt(el.value, {
    breakLines: true,
    html: true,
    strings: words.split(/\r?\n/g),
    speed: 30,
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

function goFe() {
  router.go('fullstack/前端技术栈')
}

</script>

<style scoped>
.is-done {
  @apply text-transparent;
  background: linear-gradient(to bottom, theme('colors.b-primary.DEFAULT'), theme('colors.b-success.DEFAULT'));
  -webkit-background-clip: text;
}
</style>
