<template>
  <v-container v-if="arts.length">
    <p :id="category" class="text-h6">
      <a :href="`#${category}`" class="text-black text-decoration-none">§</a>
      {{ category }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-for="art in arts" cols="6" sm="4" lg="3" xl="2">
        <art-card @loupe="openCarousel(art.id)" :art="art" />
      </v-col>
    </v-row>
    <v-overlay v-model="carouselOverlayModel" class="align-center justify-center">
      <v-sheet>
        <v-carousel v-model="carouselModel"
                    height="100%"
                    hide-delimiters
                    show-arrows="hover"
        >
          <v-carousel-item v-for="art in arts"
                           :value="art.id"
                           :src="api.getArtContentURL(art.id, 'origin')"
                           :width="art.variants[0].contentWidth"
                           :height="art.variants[0].contentHeight"
                           eager
          >
            <router-link :to="{ name: 'Art', params: { id: art.id } }" />
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-overlay>
  </v-container>
</template>
<script setup lang="ts">
  import { Art, useApi } from '@/arkwaifu-api'
  import ArtCard from '@/components/art/ArtCard.vue'
  import { ref } from 'vue'

  const api = useApi()

  defineProps<{
    arts: Art[],
    category: string,
  }>()

  const carouselOverlayModel = ref<boolean>(false)
  const carouselModel = ref<string>('')

  function openCarousel(newCarouselValue: string) {
    carouselModel.value = newCarouselValue
    carouselOverlayModel.value = true
  }
</script>
