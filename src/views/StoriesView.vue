<template>
  <v-sheet
    v-if="groups.length > 0"
    class="my-8"
  >
    <group-panel
      v-for="group in groupsView"
      :key="group.id"
      :group="group"
    />
    <v-layout-item
      model-value
      position="bottom"
      class="d-flex"
    >
      <v-btn
        :icon="ascend ? 'mdi-sort-calendar-ascending' : 'mdi-sort-calendar-descending'"
        size="large"
        color="primary"
        elevation="8"
        class="ma-12 mt-auto ml-auto"
        @click="ascend = !ascend"
      />
    </v-layout-item>
  </v-sheet>
  <v-sheet
    v-else
    class="h-screen d-flex justify-center align-center"
  >
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue'
  import { StoryGroup, useArkwaifu } from '@/arkwaifu-api'
  import GroupPanel from '@/components/story/GroupPanel.vue'

  const api = useArkwaifu()

  const props = defineProps<{
    type: 'main-story' | 'major-event' | 'minor-event' | 'other',
  }>()

  const ascend = ref(false)

  const groups = ref<StoryGroup[]>([])
  const reversedGroups = computed(() => groups.value.slice().reverse())

  const groupsView = computed(() => ascend.value ? groups.value : reversedGroups.value)

  watchEffect(async () => {
    groups.value = []
    groups.value = await api.fetchStoryGroupsByType(props.type)
  })
</script>
