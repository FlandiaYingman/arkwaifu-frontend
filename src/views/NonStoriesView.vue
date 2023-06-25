<template>
  <arts-sheet :arts="nonStoryArts"></arts-sheet>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { Art, StoryArt, useApi } from '@/arkwaifu-api'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()

  const arts = ref<Art[]>([])
  const storyArts = ref<StoryArt[]>([])

  onMounted(async () => {
    arts.value = await api.fetchArts()
    storyArts.value = await api.fetchStoryArts()
  })

  const nonStoryArts = computed(() => {
    const storyArtsIDSet = new Set(storyArts.value.map(el => el.id))
    return arts.value.filter(el => !storyArtsIDSet.has(el.id))
  })
</script>
