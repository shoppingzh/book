<template>
  <Layout>
    <template #layout-top>
      <el-backtop>
        <svg-icon name="huojian" class="text-2xl" />
      </el-backtop>
      <div class="flex items-center fixed left-1 bottom-1 z-[101] opacity-60">
        <div class="text-xs text-secondary">总访问量：</div>
        <img
          class="w-[100px]"
          src="https://profile-counter.glitch.me/zhengxiaoping/count.svg">
      </div>
    </template>
  </Layout>
</template>

<script setup>
// 具体使用参见：https://vitepress.vuejs.org/guide/theme-introduction#extending-the-default-theme
import Theme from 'vitepress/theme'

const { Layout } = Theme
</script>