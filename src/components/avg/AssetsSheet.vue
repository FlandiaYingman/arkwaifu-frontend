<template>
  <assets-sheet-by-kind v-for="kind in Object.values(AssetKind)"
                        :assets="groupedAssets[kind] ?? []"
                        :assets-kind="<AssetKind>kind" />
</template>

<script setup lang="ts">
  import { Asset, AssetKind } from '@/arkwaifu-api'
  import { computed } from 'vue'
  import _ from 'lodash'
  import AssetsSheetByKind from '@/components/avg/AssetsSheetByKind.vue'

  const props = withDefaults(defineProps<{
    assets: Array<Asset>
  }>(), {
    assets: () => [],
  })

  const groupedAssets = computed(() => _.groupBy(props.assets, el => el.kind))
</script>
