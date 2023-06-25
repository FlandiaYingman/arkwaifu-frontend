<template>
  <arts-sheet :arts="arts"></arts-sheet>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Art, useApi } from '@/arkwaifu-api'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()
  const arts = ref<Art[]>([])

  onMounted(async () => {
    arts.value = await api.fetchArts()
  })
</script>
