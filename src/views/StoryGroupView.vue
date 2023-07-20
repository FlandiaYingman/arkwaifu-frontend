<template>
  <v-sheet v-if="group">
    <group-panel :group="group" :focus="group" />
    <arts-panel :arts="artsOfStoryGroup"></arts-panel>
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Art, StoryGroup, useArkwaifu } from '@/arkwaifu-api'
  import GroupPanel from '@/components/story/GroupPanel.vue'
  import ArtsPanel from '@/components/story/ArtsPanel.vue'

  const api = useArkwaifu()

  const props = defineProps<{
    id: string
  }>()

  const group = ref<StoryGroup>()
  const artsOfStoryGroup = ref<Art[]>()

  watchEffect(async () => group.value = await api.fetchStoryGroupByID(props.id))
  watchEffect(async () => artsOfStoryGroup.value = await api.fetchArtsOfStoryGroup(props.id))
</script>
