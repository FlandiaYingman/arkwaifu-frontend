<template>
  <arts-panel :arts="arts"></arts-panel>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Art, useArkwaifu } from '@/arkwaifu-api'
  import ArtsPanel from '@/components/story/ArtsPanel.vue'

  const api = useArkwaifu()

  const arts = ref<Art[]>([])

  watchEffect(async () => {
    arts.value = await api.fetchArtsExceptForStoryArts()
  })
</script>
