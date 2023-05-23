<template>
  <assets-sheet-by-kind v-for="kind in Object.values(AssetKind)"
                        :key="kind"
                        :assets="(unique ? groupedAssetsUniq : groupedAssets)[kind] ?? []"
                        :assets-kind="<AssetKind>kind" />
  <v-layout-item model-value position="bottom" class="d-flex">
    <v-btn @click="unique = !unique"
           :icon="unique ? 'mdi-fingerprint' : 'mdi-fingerprint-off'"
           size="large"
           color="primary"
           elevation="8"
           class="ma-12 mt-auto ml-auto"
    />
  </v-layout-item>
</template>

<script setup lang="ts">
  import { Asset, AssetKind } from '@/arkwaifu-api'
  import { computed, ref } from 'vue'
  import _ from 'lodash'
  import AssetsSheetByKind from '@/components/avg/AssetsSheetByKind.vue'

  const props = withDefaults(defineProps<{
    assets: Array<Asset>
  }>(), {
    assets: () => [],
  })

  const unique = ref(true)
  const groupedAssets = computed(() => _
    .chain(props.assets)
    .groupBy(el => el.kind)
    .value(),
  )
  const groupedAssetsUniq = computed(() => _
    .chain(groupedAssets.value)
    .mapValues(el => _.uniqBy(el, el => el.name))
    .value(),
  )
</script>
