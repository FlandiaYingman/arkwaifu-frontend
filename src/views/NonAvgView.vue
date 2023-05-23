<template>
  <assets-sheet :assets="assets"></assets-sheet>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useApi } from '@/arkwaifu-api'
  import AssetsSheet from '@/components/avg/AssetsSheet.vue'

  const api = useApi()
  const avgAssets = computed(() => {
    return new Set(
      [...api.stories.value.values()]
        .flatMap(el => el.assets)
        .map(el => `${el.kind}/${el.name}`),
    )
  })
  const assets = computed(() => [...api.assets.value.values()].filter(el => !avgAssets.value.has(`${el.kind}/${el.name}`)))
</script>
