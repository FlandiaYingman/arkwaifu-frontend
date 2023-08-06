<template>
  <v-container v-if="gallery">
    <section class="header">
      <header :id="gallery.id" class="text-h4">
        <a :href="`#${gallery.id}`" class="text-black text-decoration-none">§</a>
        {{ gallery.name }}
      </header>
      <p class="text-body-2 text-medium-emphasis">
        {{ gallery.id }}
      </p>
      <p class="blockquote text-body-1" style="white-space: pre-wrap">
        {{ gallery.description }}
      </p>
    </section>

    <v-row class="mx-1 my-2">
      <v-col v-for="art in gallery.arts" :key="art.id" cols="12" lg="4" sm="6" xl="3">
        <GalleryArtCard :gallery-art="art" @loupe="openCarousel(art.id)" />
      </v-col>
    </v-row>

    <v-overlay v-model="carouselOverlayModel" class="align-center justify-center">
      <v-sheet>
        <v-carousel v-model="carouselModel" height="100%" hide-delimiters show-arrows="hover">
          <v-carousel-item
            v-for="art in gallery.arts"
            :key="art.id"
            :value="art.id"
            :src="arkwaifu.contentSrcOf(art.artID, Variation.Origin)"
            :width="1280"
            :height="720"
            eager
          >
            <router-link :to="{ name: 'Art', params: { id: art.artID } }" />
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-overlay>
  </v-container>
</template>

<script lang="ts" setup>
import { useArkwaifu, useArkwaifuGallery } from '@/stores/arkwaifu-api'
import { ref, watchEffect } from 'vue'
import type { Gallery } from '@/arkwaifu-api'
import GalleryArtCard from '@/components/gallery/GalleryArtCard.vue'
import { Variation } from '@/arkwaifu-api'

const props = defineProps<{
  id: string
}>()
const arkwaifu = useArkwaifu()
const arkwaifuGallery = useArkwaifuGallery()

const gallery = ref<Gallery>()
watchEffect(async () => (gallery.value = await arkwaifuGallery.getGalleryByID(props.id)))

const carouselOverlayModel = ref<boolean>(false)
const carouselModel = ref<string>('')

function openCarousel(newCarouselValue: string) {
  carouselModel.value = newCarouselValue
  carouselOverlayModel.value = true
}
</script>

<style lang="scss" scoped>
.header {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
</style>
