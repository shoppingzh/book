<template>

  <div v-for="(group, index) in config.groups" :key="group.name" :class="{ 'mt-4': index > 0 }">
    <div class="text-xl font-semibold">{{ group.name }}</div>
    <div class="mt-4 flex flex-wrap">
      <div
        v-for="(item, index2) in group.items"
        :key="item.name"
        class="
          mb-2 w-[240px] shrink-0 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
          border border-gray-200
          hover:shadow-lg hover:border-transparent hover:-translate-y-1
        "
        :class="{ 'ml-2': index2 > 0 }"
        @click="open(item)">
        <div class="h-[120px] bg-cover bg-no-repeat border-b border-b-gray-200" :style="{ 'background-image': `url(${logos[item.logo] || logos['default']})` }"></div>
        <div class="p-4">
          <div class="text-md font-semibold">{{ item.name }}</div>
          <div class="mt-4 text-secondary text-sm">{{ item.description || '&nbsp;' }}</div>
          <div class="mt-2 text-right">
            <el-link type="primary" :underline="false">
              <el-icon><Right /></el-icon>
            </el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import config, { Item } from './config'
import logos from './logo'

function open(item: Item) {
  window.open(item.url)
}

</script>