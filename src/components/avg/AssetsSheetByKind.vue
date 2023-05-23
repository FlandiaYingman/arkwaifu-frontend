<template>
  <v-container>
    <p :id="assetsKind" class="text-h6">
      <a :href="`#${assetsKind}`" class="text-black text-decoration-none">§</a>
      {{ assetsKind }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-for="asset in assets" class="v-col-2">
        <asset-card :asset="asset" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
  import { Asset, AssetKind, useApi } from '@/arkwaifu-api'
  import AssetCard from '@/components/asset/AssetCard.vue'

  defineProps<{
    assets: Asset[],
    assetsKind: AssetKind,
  }>()

  const API = useApi()
</script>
