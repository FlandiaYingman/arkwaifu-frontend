<template>
  <v-sheet v-if="group">
    <group-panel :focus="group" :group="group" />
    <arts-panel :arts="artsOfStoryGroup" />
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Art, StoryGroup } from '@/arkwaifu-api'
import GroupPanel from '@/components/story/GroupPanel.vue'
import ArtsPanel from '@/components/story/ArtsPanel.vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { storeToRefs } from 'pinia'
import { useMetaStore } from '@/stores/meta'

const api = useArkwaifu()

const props = defineProps<{
  id: string
}>()

const group = ref<StoryGroup>()
const artsOfStoryGroup = ref<Art[]>()

watchEffect(async () => (group.value = await api.fetchStoryGroupByID(props.id)))
watchEffect(async () => (artsOfStoryGroup.value = await api.fetchArtsOfStoryGroup(props.id)))

const { appTitle } = storeToRefs(useMetaStore())
watchEffect(() => (appTitle.value = group.value?.name ?? ''))
</script>
