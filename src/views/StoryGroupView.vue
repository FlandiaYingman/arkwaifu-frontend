<template>
  <v-sheet v-if="group">
    <group-sheet :group="group" :focus="group" />
    <arts-sheet :arts="artsOfStoryGroup"></arts-sheet>
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Art, StoryGroup, useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/story/GroupSheet.vue'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()

  const props = defineProps<{
    id: string
  }>()

  const group = ref<StoryGroup>()
  const artsOfStoryGroup = ref<Art[]>()

  watchEffect(async () => group.value = await api.fetchStoryGroupByID(props.id))
  watchEffect(async () => artsOfStoryGroup.value = await api.fetchArtsOfStoryGroup(props.id))
</script>
