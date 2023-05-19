<template>
  <v-card :to="{ name: 'Story', params: { id: story.id } }">
    <template #title>{{ story.name }}</template>
    <template #subtitle>
      {{ story.code }} {{ story.tag }}<br />
      {{ story.id }}
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import { Story } from '@/arkwaifu-api'

  defineProps<{ story: Story }>()
</script>
