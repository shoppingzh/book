<template>
  <div class="w-full h-full relative z-[101] px-4">
    <div>
      <div
        ref="el"
        class="text-2xl font-semibold leading-loose tracking-wider transition-all duration-300 ease-in-out"
        :class="{ 'is-done text-3xl': isDone }">
      </div>
      <div v-if="isDone" class="mt-10">
        <el-button type="primary" class="animate__animated animate__fadeInLeft animate__faster" @click="goFe">
          <el-icon class="mr-2"><Guide /></el-icon>
          前端工程师技术栈
        </el-button>
      </div>
    </div>
  </div>
  <div class="fixed z-100 right-[10%] bottom-[10%] md:top-[120px] w-48 h-48 md:w-96 md:h-96">
    <css-doodle>
      @grid: 14 / 80%;

      @random {
        border-left: 1px solid #5d81bc;
      }
      @random {
        border-top: 1px solid #5d81bc;
      }
      @random(.25) {
        background: linear-gradient(
          @p(#fff, tan, #5d81bc), @lp
        )
        50% / @r(60%) @lr
        no-repeat;
      }
      @random {
        filter: drop-shadow(0 0 10px #fff);
      }
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

onMounted(() => {
  const instance = new TypeIt(el.value, {
    breakLines: true,
    html: true,
    strings: [
      'Hello, 我是晓平。',
      '很高兴与你相遇，一同学习知识。',
      '希望你能玩得开心！'
    ],
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
  router.go('fe')
}

</script>

<style scoped>
.is-done {
  @apply text-transparent;
  background: linear-gradient(to bottom, theme('colors.b-primary.DEFAULT'), theme('colors.b-success.DEFAULT'));
  -webkit-background-clip: text;
}
</style>
