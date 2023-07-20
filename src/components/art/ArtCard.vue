<template>
  <v-lazy :options="{threshold: 0.0}">
    <v-sheet>
      <v-card @click="$emit('loupe')">
        <v-img @load="loaded = true" :src="url" :aspect-ratio="ratio" class="transparent-background">
          <template #placeholder>
            <div class="d-flex fill-height align-center justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-card>
      <router-link
        :to="{ name: 'Art', params: { id: art.id } }"
        class="text-caption text-black text-decoration-underline"
      >
        {{ art.category }}/{{ art.id }}
      </router-link>
    </v-sheet>
  </v-lazy>
</template>
<script lang="ts" setup>
  import { Art, useArkwaifu, Variation } from '@/arkwaifu-api'
  import { computed, ref } from 'vue'

  const props = defineProps<{
    art: Art,
  }>()
  const api = useArkwaifu()
  const url = computed(() => api.contentSrcOf(props.art.id, Variation.Thumbnail))

  const loaded = ref(false)
  const ratio = computed(() => {
    const thumbnail = props.art.variants.find(v => v.variation == Variation.Thumbnail)!!
    return thumbnail.contentWidth / thumbnail.contentHeight
  })
</script>

<style scoped>
  /* Add chessboard background for images with alpha channel. */
  .transparent-background {
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 75%,
      rgba(0, 0, 0, 0.25) 0
    ), linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 75%,
      rgba(0, 0, 0, 0.25) 0
    );
    background-position: 0 0, 10px 10px;
    background-origin: padding-box, padding-box;
    background-clip: border-box, border-box;
    background-size: 20px 20px, 20px 20px;
    box-shadow: none;
  }
</style>
