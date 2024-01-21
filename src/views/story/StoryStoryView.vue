<template>
  <v-sheet v-if="group && story">
    <group-panel :focus="story" :group="group" />
    <art-panel-by-category :arts="artsOfStory" />
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Art, Story, StoryGroup } from '@/arkwaifu-api'
import GroupPanel from '@/components/story/GroupPanel.vue'
import ArtPanelByCategory from '@/components/story/ArtPanelByCategory.vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { storeToRefs } from 'pinia'
import { useMetaStore } from '@/stores/meta'

const api = useArkwaifu()

const props = defineProps<{
  id: string
}>()

const story = ref<Story>()
const group = ref<StoryGroup>()
const artsOfStory = ref<Art[]>()

watchEffect(async () => {
  story.value = await api.fetchStoryByID(props.id)
  group.value = await api.fetchStoryGroupByID(story.value!!.groupID)
})
watchEffect(async () => (artsOfStory.value = await api.fetchArtsOfStory(props.id)))

const { appTitle } = storeToRefs(useMetaStore())
watchEffect(() => (appTitle.value = story.value?.name ?? ''))
</script>
