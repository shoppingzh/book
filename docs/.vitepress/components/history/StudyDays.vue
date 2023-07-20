<template>
  <Transition name="fade" appear>
    <div class="inline-flex px-4 py-2 bg-blue-500 shadow-lg rounded-md text-white text-sm">系统学习历史：{{ getDays('2023-05-08') }}天</div>
  </Transition>
</template>

<script setup lang="ts">
import { getDays } from '@/utils/datetime'
</script>


<style scoped lang="css">
.fade {
  &-enter-from, &-leave-to {
    @apply translate-x-[300%];
  }
  &-enter-active, &-leave-active {
    @apply transition-all duration-150;
  }
}
</style>