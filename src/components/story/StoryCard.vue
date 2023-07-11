<template>
  <v-card :to="{ name: 'Story', params: { id: story.id } }" :variant="focused ? 'tonal' : 'elevated'">
    <template #title>{{ story.name }}</template>
    <template #subtitle>
      {{ story.code }} {{ story.tagText }}<br />
      <span class="d-none d-sm-flex">{{ story.id }}</span>
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import { Story } from '@/arkwaifu-api'

  defineProps<{
    story: Story,
    focused: boolean,
  }>()
</script>
