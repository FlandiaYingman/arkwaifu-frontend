<template>
  <v-sheet v-if="group">
    <group-sheet :group="group" :focus="group" />
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
  const group = computed(() => api.groups.value.get(props.id))
  const assets = computed(() => group?.value?.stories?.flatMap(story => story.assets) ?? [])
</script>
