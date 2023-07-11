<template>
  <v-sheet v-if="group && story">
    <group-sheet :group="group" :focus="story" />
    <arts-sheet :arts="artsOfStory"></arts-sheet>
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { Story, StoryGroup, useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/story/GroupSheet.vue'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()

  const props = defineProps<{
    id: string
  }>()

  const story = ref<Story>()
  const group = ref<StoryGroup>()
  const artsOfStory = computed(() =>
    [...(story.value?.pictureArts ?? []), ...(story.value?.characterArts ?? [])]
      .map(storyArt => ({ id: storyArt.id, category: storyArt.category, variants: [] })),
  )

  watch(() => props.id, async (value) => {
    story.value = await api.fetchStoryByID(value)
    group.value = await api.fetchStoryGroupByID(story.value!!.groupID)
  }, { immediate: true })
</script>
