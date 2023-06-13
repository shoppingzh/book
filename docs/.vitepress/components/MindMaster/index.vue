<template>
  <div class="py-10">
    <div class="px-2 text-xs">
      <el-link type="primary" :underline="false" @click="handleRefresh">
        <el-icon class="mr-1"><Refresh /></el-icon> 刷新脑图
      </el-link>
      <el-divider direction="vertical" />
      <el-link type="primary" :underline="false" @click="handleOpenWindow">
        <el-icon><Connection /></el-icon> 新窗口打开
      </el-link>
    </div>
    <div v-loading="loading" class="mt-6">
      <img :src="`${src}?_=${time || ''}`">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const props = defineProps({
  src: String,
})
const time = ref()
const loading = ref(false)

function handleRefresh() {
  loading.value = true
  time.value = +new Date()
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

function handleOpenWindow() {
  window.open(props.src)
}
</script>

<style scoped lang="postcss">
.el-link {
  @apply text-xs;
}
</style>
