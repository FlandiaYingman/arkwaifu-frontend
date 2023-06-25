<template>
  <v-card :to="{ name: 'Group', params: { id: group.id } }" :variant="focused ? 'tonal' : 'elevated'">
    <template #title># {{ group.name }}</template>
    <template #subtitle>
      {{ group.type }}<br />
      {{ group.id }}
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import { StoryGroup } from '@/arkwaifu-api'

  defineProps<{
    group: StoryGroup,
    focused: boolean,
  }>()
</script>
