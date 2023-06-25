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
  import { Group } from '@/arkwaifu-api'

  defineProps<{
    group: Group,
    focused: boolean,
  }>()
</script>
