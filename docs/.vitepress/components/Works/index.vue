<template>

  <div v-for="(group, index) in config.groups" :key="group.name" :class="{ 'mt-4': index > 0 }">
    <div class="text-md font-semibold tracking-wide">{{ group.name }}</div>
    <div class="mt-4 flex flex-wrap items-stretch">
      <div
        v-for="(item, index2) in group.items"
        :key="item.name"
        class="mb-4 w-[50%] md:w-[240px] shrink-0"
        :class="{ 'pr-2': index2 >= 0 }">
        <div
          class="
            h-full rounded-xs overflow-hidden transition-all duration-300 cursor-pointer
            flex flex-col
            hover:shadow-xl hover:border-transparent hover:-translate-y-1
          "
          @click="open(item)">
          <div class="h-[110px] md:h-[140px] bg-cover bg-no-repeat bg-center" :style="{ 'background-image': `url(${logos[item.logo] || logos['default']})` }"></div>
          <div class="flex-1 p-2 md:p-4 border border-gray-300 dark:border-gray-900">
            <div class="text-md font-semibold">{{ item.name }}</div>
            <div class="mt-2 text-secondary text-sm">{{ item.description || '&nbsp;' }}</div>
            <!-- <div class="mt-2 text-right">
              <el-link type="primary" :underline="false">
                <el-icon><Right /></el-icon>
              </el-link>
            </div> -->
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