<template>
  <v-sheet v-if="group">
    <group-sheet :group="group" :focus="group" />
    <arts-sheet :arts="artsOfGroup"></arts-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { StoryGroup, useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/story/GroupSheet.vue'
  import ArtsSheet from '@/components/story/ArtsSheet.vue'

  const api = useApi()

  const props = defineProps<{
    id: string
  }>()

  const group = ref<StoryGroup>()
  const artsOfGroup = computed(() => group.value
    ?.stories
    .flatMap(story => [...story.pictureArts, ...story.characterArts]),
  )

  watch(() => props.id, async (value) => {
    group.value = await api.fetchStoryGroupByID(value)
  }, { immediate: true })
</script>
