<template xmlns="http://www.w3.org/1999/html">
  <v-sheet v-if="groups.length > 0" class="my-8">
    <group-sheet v-for="group in groupsView" :key="group.id" :group="group" />
    <v-layout-item model-value position="bottom" class="d-flex">
      <v-btn @click="ascend = !ascend"
             :icon="ascend ? 'mdi-sort-calendar-ascending' : 'mdi-sort-calendar-descending'"
             size="large"
             color="primary"
             elevation="8"
             class="ma-12 mt-auto ml-auto"
      />
    </v-layout-item>
  </v-sheet>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { StoryGroup, useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/story/GroupSheet.vue'

  const api = useApi()

  const props = defineProps<{
    type: 'main-story' | 'major-event' | 'minor-event' | 'other',
  }>()

  const ascend = ref(false)

  const groups = ref<StoryGroup[]>([])
  const reversedGroups = computed(() => groups.value.slice().reverse())

  const groupsView = computed(() => ascend.value ? groups.value : reversedGroups.value)

  watch(() => props.type, async (value) => {
    groups.value = await api.fetchStoryGroupsByType(value)
  }, { immediate: true })
</script>
