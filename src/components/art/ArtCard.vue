<template>
  <v-lazy :options="{threshold: 0.0}">
    <v-sheet>
      <v-responsive :aspect-ratio="ratio">
        <v-card :to="{ name: 'Art', params: { id: art.id } }">
          <v-img @load="loaded = true" :src="url" class="transparent-background">
            <template #placeholder>
              <v-responsive :aspect-ratio="ratio">
                <div class="d-flex fill-height align-center justify-center">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </v-responsive>
            </template>
          </v-img>
        </v-card>
      </v-responsive>
      <p class="text-caption">{{ art.category }}/{{ art.id }}</p>
    </v-sheet>
  </v-lazy>
</template>
<script lang="ts" setup>
  import { Art, useApi } from '@/arkwaifu-api'
  import { computed, ref } from 'vue'

  const props = defineProps<{
    art: Art,
  }>()
  const api = useApi()
  const url = computed(() => api.getArtContentURL(props.art.id, 'thumbnail'))

  const loaded = ref(false)
  const ratio = computed(() => {
    // TODO: Get ratio from variant object.
    if (loaded.value) {
      // If loaded, we use the actual ratio.
      return undefined
    }
    if (props.art.category != 'character') {
      return 16 / 9
    } else {
      return 1
    }
  })
</script>

<style>
  /* Use placeholder's size for the v-img element on loading. */
  .v-img__placeholder {
    position: static;
  }
</style>

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
