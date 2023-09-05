<template>
  <v-container v-if="arts.length">
    <p :id="category" class="text-h6">
      <a :href="`#${category}`" class="text-black text-decoration-none">§</a>
      {{ category }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-for="art in arts" :key="art.id" cols="6" lg="3" sm="4" xl="2">
        <art-card :art="art" @loupe="openCarousel(art.id)" />
      </v-col>
    </v-row>
    <v-overlay v-model="carouselOverlayModel" class="align-center justify-center">
      <v-sheet>
        <v-carousel v-model="carouselModel" height="100%" hide-delimiters show-arrows="hover">
          <v-carousel-item
            v-for="art in arts"
            :key="art.id"
            :src="api.contentSrcOf(art.id, Variation.Origin)"
            :value="art.id"
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
import { computed, ref } from 'vue'
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

defineProps<{
  arts: Art[]
  category: string
}>()

const carouselOverlayModel = ref<boolean>(false)
const carouselModel = ref<string>('')

function openCarousel(newCarouselValue: string) {
  carouselModel.value = newCarouselValue
  carouselOverlayModel.value = true
}
</script>
