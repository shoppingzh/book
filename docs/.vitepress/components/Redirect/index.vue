<template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  url: string
}
const props = defineProps<Props>()

onMounted(() => {
  if (!props.url) return
  location.href = props.url
})
</script>
