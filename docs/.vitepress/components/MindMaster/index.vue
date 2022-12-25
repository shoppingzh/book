<template>
  <iframe
    v-if="windowWidth != null"
    :width="windowWidth"
    height="4000px"
    class="border-none outline-none"
    :src="src"></iframe>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const windowWidth = ref()

defineProps({
  src: String,
})

onMounted(() => {
  windowWidth.value = (window.innerWidth || document.documentElement.clientWidth) - 20
})
</script>