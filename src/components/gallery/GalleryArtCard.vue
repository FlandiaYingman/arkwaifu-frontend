<template>
  <v-card :to="{ name: 'Art', params: { id: galleryArt.id } }">
    <v-img :aspect-ratio="ratio" :src="url" class="transparent-background" @load="loaded = true">
      <template #placeholder>
        <div class="d-flex fill-height align-center justify-center">
          <v-progress-circular indeterminate />
        </div>
      </template>
    </v-img>
    <v-card-item>
      <v-card-title>
        {{ galleryArt.name }}
        <v-btn
          density="comfortable"
          icon="mdi-loupe"
          position="absolute"
          size="default"
          variant="text"
          @click="$emit('loupe')"
        />
      </v-card-title>
      <v-card-subtitle>
        {{ galleryArt.id }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="white-space: pre-line">
      {{ galleryArt.description }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Art, GalleryArt, Variation } from '@/arkwaifu-api'
import { computed, ref, watchEffect } from 'vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'

const props = defineProps<{
  galleryArt: GalleryArt
}>()
defineEmits<{
  loupe: []
}>()

const api = useArkwaifu()
const url = computed(() => api.contentSrcOf(props.galleryArt.id, Variation.Thumbnail))
const art = ref<Art>()
watchEffect(async () => (art.value = await api.fetchArtByID(props.galleryArt.id)))

const loaded = ref(false)
const ratio = computed(() => {
  if (!art.value) return
  const thumbnail = art.value.variants.find((v) => v.variation == Variation.Thumbnail)!!
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
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 75%,
      rgba(0, 0, 0, 0.25) 0
    );
  background-position:
    0 0,
    10px 10px;
  background-origin: padding-box, padding-box;
  background-clip: border-box, border-box;
  background-size:
    20px 20px,
    20px 20px;
  box-shadow: none;
}
</style>
