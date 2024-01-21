<template>
  <v-overlay ref="carouselOverlay" v-model="carouselOverlayModel" class="align-center justify-center">
    <v-sheet>
      <v-carousel v-model="carouselModel" height="100%" hide-delimiters show-arrows="hover">
        <v-carousel-item
          v-for="(art, i) in arts"
          :key="art.id"
          :src="api.contentSrcOf(art.id, Variation.Origin)"
          :value="i"
          :width="calculateSize(art.variants[0]).width"
          :height="calculateSize(art.variants[0]).height"
          :eager="canPreload(i)"
        >
          <router-link :to="{ name: 'Art', params: { id: art.id } }" />
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
  </v-overlay>
</template>
<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { onMounted, onUnmounted, ref } from 'vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { Art, Variant, Variation } from '@/arkwaifu-api'
import { getSizeFitInBox } from '@/utils'

const { arts, preload = 0 } = defineProps<{ arts: Art[]; preload?: number }>()
const api = useArkwaifu()

// Calculate Carousel Item Size

const { width, height } = useDisplay()
const calculateSize = (v: Variant) => getSizeFitInBox(v.contentWidth, v.contentHeight, width.value, height.value)

// Keyboard Listeners

const carouselOverlayModel = ref<boolean>(false)
const carouselModel = ref<number>(0)

function canPreload(i: number) {
  // If the distance between 'i' and the current model is less than 'preload', return true.
  // Note that the carousel is a cycle, consider the first and last 'preload' items.
  const distance = Math.abs(carouselModel.value - i)
  return distance <= preload || distance >= arts.length - preload
}

function openCarousel(newCarouselValue: number) {
  carouselModel.value = newCarouselValue
  carouselOverlayModel.value = true
}

function switchCarouselLeft() {
  if (carouselModel.value === 0) {
    carouselModel.value = arts.length - 1
  } else {
    carouselModel.value = carouselModel.value - 1
  }
}

function switchCarouselRight() {
  if (carouselModel.value === arts.length - 1) {
    carouselModel.value = 0
  } else {
    carouselModel.value = carouselModel.value + 1
  }
}

function closeCarousel() {
  carouselOverlayModel.value = false
}

const KeyboardListener = (e: KeyboardEvent) => {
  if (carouselOverlayModel.value) {
    if (e.key === 'Escape') closeCarousel()
    else if (e.key === 'ArrowLeft') switchCarouselLeft()
    else if (e.key === 'ArrowRight') switchCarouselRight()
  }
}

onMounted(() => window.addEventListener('keydown', KeyboardListener))
onUnmounted(() => window.removeEventListener('keydown', KeyboardListener))

defineExpose({
  openCarousel,
  closeCarousel,
  switchCarouselLeft,
  switchCarouselRight,
  calculateSize,
})
</script>
