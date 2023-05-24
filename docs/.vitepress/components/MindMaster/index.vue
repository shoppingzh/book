<template>
  <div class="py-10">
    <div class="px-6 text-right">
      <el-link type="primary" :underline="false" @click="handleRefresh">
        <el-icon class="mr-1"><Refresh /></el-icon> 刷新脑图
      </el-link>
    </div>
    <img :src="`${src}?_=${time || ''}`">
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const time = ref()
const docSize = reactive({
  width: null,
  height: null,
})

defineProps({
  src: String,
})

function handleRefresh() {
  time.value = +new Date()
}

onMounted(() => {
  const el = document.querySelector('.VPDoc > .container > .content .content-container')
  if (!el) return
  docSize.width = el.clientWidth
  docSize.height = el.clientHeight
})
</script>