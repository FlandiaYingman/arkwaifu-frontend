<template>
  <v-card :to="{ name: 'Group', params: { id: group.id } }" :variant="focused ? 'tonal' : 'elevated'">
    <template #title>
      <span style="white-space: normal"># {{ group.name }}</span>
    </template>
    <template #subtitle>
      {{ t(group.type) }}<br />
      <span class="monospace d-none d-sm-flex">{{ group.id }}</span>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { StoryGroup } from '@/arkwaifu-api'
import { useI18n } from 'vue-i18n'

defineProps<{
  group: StoryGroup
  focused: boolean
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml" locale="en">
main-story: Main Theme
major-event: Intermezzo / Side Story
minor-event: Vignette
other: Other
</i18n>

<i18n lang="yaml" locale="zh">
main-story: 主题曲
major-event: 插曲 & 别传
minor-event: 故事集
other: 其它
</i18n>
