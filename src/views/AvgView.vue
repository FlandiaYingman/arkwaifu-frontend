<template xmlns="http://www.w3.org/1999/html">
  <div class="my-8">
    <group-sheet v-for="group in groupsSorted" :key="group.id" :group="group" />
    <v-layout-item model-value position="bottom" class="d-flex">
      <v-btn @click="ascend = !ascend"
             :icon="ascend ? 'mdi-sort-calendar-ascending' : 'mdi-sort-calendar-descending'"
             size="large"
             color="primary"
             elevation="8"
             class="ma-12 mt-auto ml-auto"
      />
    </v-layout-item>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/avg/GroupSheet.vue'

  const props = defineProps<{
    type: '' | 'MAINLINE' | 'ACTIVITY' | 'MINI_ACTIVITY' | 'NONE',
  }>()
  const api = useApi()
  const ascend = ref(false)
  const groups = computed(() => {
    if (props.type) {
      return [...api.groups.value.values()].filter(el => el.type == props.type)
    } else {
      return [...api.groups.value.values()]
    }
  })
  const groupsSorted = computed(() => {
    if (ascend.value) {
      return groups.value
    } else {
      return [...groups.value].reverse()
    }
  })
</script>
