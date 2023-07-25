<template>
  <v-container>
    <p :id="group.id" class="text-h5">
      <a :href="`#${group.id}`" class="text-black text-decoration-none">§</a>
      {{ group.name }}
    </p>
    <p class="text-caption text-medium-emphasis">
      {{ t(group.type) }}
    </p>
    <p class="text-caption text-medium-emphasis">
      {{ group.id }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-if="group.stories.length > 1" cols="6" sm="4" lg="3" xl="2">
        <group-card :group="group" :focused="focus?.id == group.id" />
      </v-col>
      <v-col v-for="story in group.stories" :key="story.id" cols="6" sm="4" lg="3" xl="2">
        <story-card :story="story" :focused="focus?.id == story.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Story, StoryGroup } from '@/arkwaifu-api'
import StoryCard from '@/components/story/StoryCard.vue'
import GroupCard from '@/components/story/GroupCard.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  group: StoryGroup
  focus?: StoryGroup | Story
}>()

const { t } = useI18n()
</script>

<i18n locale="en" lang="yaml">
main-story: Main Theme
major-event: Intermezzo / Side Story
minor-event: Vignette
other: Other
</i18n>

<i18n locale="zh" lang="yaml">
main-story: 主题曲
major-event: 插曲 & 别传
minor-event: 故事集
other: 其它
</i18n>
