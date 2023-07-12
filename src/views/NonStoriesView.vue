<template>
  <arts-sheet :arts="arts"></arts-sheet>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Art, useApi } from '@/arkwaifu-api'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()

  const arts = ref<Art[]>([])

  watchEffect(async () => {
    arts.value = await api.fetchArtsExceptForStoryArts()
  })
</script>
