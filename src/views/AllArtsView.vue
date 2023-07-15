<template>
  <arts-panel :arts="arts"></arts-panel>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Art, useApi } from '@/arkwaifu-api'
  import ArtsPanel from '@/components/story/ArtsPanel.vue'

  const api = useApi()
  const arts = ref<Art[]>([])

  onMounted(async () => {
    arts.value = await api.fetchArts()
  })
</script>
