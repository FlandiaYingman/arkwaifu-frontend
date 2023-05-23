<template>
  <v-lazy>
    <v-sheet>
      <v-card :to="{ name: 'Asset', params: { kind: asset.kind, name: asset.name } }" min-height="94">
        <v-img :src="url" />
      </v-card>
      <p class="text-caption">{{ asset.kind }}/{{ asset.name }}</p>
    </v-sheet>
  </v-lazy>
</template>
<script lang="ts" setup>
  import { Asset, useApi } from '@/arkwaifu-api'
  import { computed } from 'vue'

  const props = defineProps<{
    asset: Asset,
  }>()
  const api = useApi()
  const url = computed(() => api.getAssetUrl(props.asset, 'timg'))
</script>
