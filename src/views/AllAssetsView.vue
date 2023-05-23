<template>
  <assets-sheet :assets="assets"></assets-sheet>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useApi } from '@/arkwaifu-api'
  import AssetsSheet from '@/components/avg/AssetsSheet.vue'

  const api = useApi()
  const assets = computed(() => [...api.assets.value.values()])
</script>
