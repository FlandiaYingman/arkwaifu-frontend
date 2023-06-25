<template>
  <v-lazy>
    <v-sheet>
      <v-card :to="{ name: 'Art', params: { id: art.id } }" min-height="94">
        <v-img :src="url" />
      </v-card>
      <p class="text-caption">{{ art.category }}/{{ art.id }}</p>
    </v-sheet>
  </v-lazy>
</template>
<script lang="ts" setup>
  import { Art, useApi } from '@/arkwaifu-api'
  import { computed } from 'vue'

  const props = defineProps<{
    art: Art,
  }>()
  const api = useApi()
  const url = computed(() => api.getArtContentURL(props.art.id, 'thumbnail'))
</script>

