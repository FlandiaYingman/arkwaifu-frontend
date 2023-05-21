<template>
  <v-sheet v-if="group && story">
    <group-sheet :group="group" :focus="story" />
    <assets-sheet :assets="assets"></assets-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/avg/GroupSheet.vue'
  import AssetsSheet from '@/components/avg/AssetsSheet.vue'

  const props = defineProps<{
    id: string
  }>()

  const api = useApi()
  const story = computed(() => api.stories.value.get(props.id))
  const group = computed(() => story.value ? api.groups.value.get(story.value.groupID) : null)
  const assets = computed(() => story?.value?.assets ?? [])
</script>
