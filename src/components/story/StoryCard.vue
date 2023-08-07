<template>
  <v-card :to="{ name: 'Story', params: { id: story.id } }" :variant="focused ? 'tonal' : 'elevated'">
    <template #title>
      <span style="white-space: normal">{{ story.name }}</span>
    </template>
    <template #subtitle>
      {{ story.code }} {{ story.tagText }}<br />
      <span class="monospace d-none d-sm-flex">{{ story.id }}</span>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { Story } from '@/arkwaifu-api'

defineProps<{
  story: Story
  focused: boolean
}>()
</script>
