<template>
  <v-container v-if="arts.length">
    <p :id="category" class="text-h6">
      <a :href="`#${category}`" class="text-black text-decoration-none">§</a>
      {{ category }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-for="(art, i) in arts" :key="art.id" cols="6" lg="3" sm="4" xl="2">
        <art-card :art="art" @loupe="openCarousel(i)" />
      </v-col>
    </v-row>
    <v-overlay ref="carouselOverlay" v-model="carouselOverlayModel" class="align-center justify-center">
      <v-sheet>
        <v-carousel v-model="carouselModel" height="100%" hide-delimiters show-arrows="hover">
          <v-carousel-item
            v-for="(art, i) in arts"
            :key="art.id"
            :src="api.contentSrcOf(art.id, Variation.Origin)"
            :value="i"
            :width="sizeFittingBox(art.variants[0].contentWidth, art.variants[0].contentHeight).value[0]"
            :height="sizeFittingBox(art.variants[0].contentWidth, art.variants[0].contentHeight).value[1]"
            eager
          >
            <router-link :to="{ name: 'Art', params: { id: art.id } }" />
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-overlay>
  </v-container>
</template>
<script lang="ts" setup>
import { Art, Variation } from '@/arkwaifu-api'
import ArtCard from '@/components/art/ArtCard.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { useDisplay } from 'vuetify'

const api = useArkwaifu()
const { width, height } = useDisplay()

function sizeFittingBox(wi: number, hi: number) {
  return computed(() => {
    const ws = width.value,
      hs = height.value
    const rs = ws / hs
    const ri = wi / hi
    return rs > ri ? [(wi * hs) / hi, hs] : [ws, (hi * ws) / wi]
  })
}

const props = defineProps<{
  arts: Art[]
  category: string
}>()

const carouselOverlayModel = ref<boolean>(false)
const carouselModel = ref<number>(0)

// Keyboard Listeners

function openCarousel(newCarouselValue: number) {
  carouselModel.value = newCarouselValue
  carouselOverlayModel.value = true
}

function switchCarouselLeft() {
  if (carouselModel.value === 0) {
    carouselModel.value = props.arts.length - 1
  } else {
    carouselModel.value = carouselModel.value - 1
  }
}

function switchCarouselRight() {
  if (carouselModel.value === props.arts.length - 1) {
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
</script>
