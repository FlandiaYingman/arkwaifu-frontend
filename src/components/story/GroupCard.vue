<template>
  <v-card :to="{ name: 'Group', params: { id: group.id } }" :variant="focused ? 'tonal' : 'elevated'">
    <template #title>
      <span style="white-space: normal"># {{ group.name }}</span>
    </template>
    <template #subtitle>
      {{ group.type }}<br />
      <span class="monospace d-none d-sm-flex">{{ group.id }}</span>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { StoryGroup } from '@/arkwaifu-api'

defineProps<{
  group: StoryGroup
  focused: boolean
}>()
</script>
