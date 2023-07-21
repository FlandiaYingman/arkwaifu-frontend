<template>
  <v-sheet v-if="group && story">
    <group-panel
      :group="group"
      :focus="story"
    />
    <arts-panel :arts="artsOfStory" />
  </v-sheet>
  <v-sheet
    v-else
    class="h-screen d-flex justify-center align-center"
  >
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Art, Story, StoryGroup, useArkwaifu } from '@/arkwaifu-api'
  import GroupPanel from '@/components/story/GroupPanel.vue'
  import ArtsPanel from '@/components/story/ArtsPanel.vue'

  const api = useArkwaifu()

  const props = defineProps<{
    id: string
  }>()

  const story = ref<Story>()
  const group = ref<StoryGroup>()
  const artsOfStory = ref<Art[]>()

  watchEffect(async () => {
    story.value = await api.fetchStoryByID(props.id)
    group.value = await api.fetchStoryGroupByID(story.value!!.groupID)
  })
  watchEffect(async () => artsOfStory.value = await api.fetchArtsOfStory(props.id))
</script>
