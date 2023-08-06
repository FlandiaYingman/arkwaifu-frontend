<template>
  <v-container>
    <v-row align="stretch">
      <v-col v-for="gallery in galleries" :key="gallery.id" cols="12" lg="4" md="6">
        <gallery-card :gallery="gallery" class="fill-height" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useArkwaifuGallery } from '@/stores/arkwaifu-api'
import { ref, watchEffect } from 'vue'
import type { Gallery } from '@/arkwaifu-api'
import GalleryCard from '@/components/gallery/GalleryCard.vue'

const arkwaifuGallery = useArkwaifuGallery()

const galleries = ref<Gallery[]>([])
watchEffect(async () => (galleries.value = await arkwaifuGallery.listGalleries()))
</script>

<style lang="scss" scoped>
.header {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
</style>
