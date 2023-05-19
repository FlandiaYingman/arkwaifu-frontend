<template xmlns="http://www.w3.org/1999/html">
  <div class="my-8">
    <group-sheet v-for="group in groups" :key="group.id" :group="group" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useApi } from '@/arkwaifu-api'
  import GroupSheet from '@/components/avg/GroupSheet.vue'

  const props = defineProps({
    type: '' | 'MAINLINE' | 'ACTIVITY' | 'MINI_ACTIVITY' | 'NONE',
  })
  const api = useApi()
  const groups = computed(() => {
    if (props.type) {
      return api.getGroups().filter(el => el.type == props.type)
    } else {
      return api.getGroups()
    }
  })
</script>
