<template>
  <v-card :to="{ name: 'Gallery', params: { id: gallery.id } }">
    <v-carousel
      :cycle="true"
      :interval="getRandomIntInclusive(10000, 20000)"
      :show-arrows="false"
      height=""
      hide-delimiters
    >
      <v-carousel-item
        v-for="art in gallery.arts"
        :key="art.id"
        :aspect-ratio="16 / 9"
        :lazy-src="arkwaifu.contentSrcOf(art.id, Variation.Thumbnail)"
        :src="arkwaifu.contentSrcOf(art.id, Variation.Origin)"
      />
    </v-carousel>

    <v-card-item>
      <v-card-title>
        <a :href="`#${gallery.id}`" class="text-black text-decoration-none">§</a>
        {{ gallery.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ gallery.id }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="white-space: pre-line">
      {{ gallery.description }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useArkwaifu, useArkwaifuGallery } from '@/stores/arkwaifu-api'
import { ref, watchEffect } from 'vue'
import type { Gallery } from '@/arkwaifu-api'
import { Variation } from '@/arkwaifu-api'
import { getRandomIntInclusive } from '@/utils'

const props = defineProps<{
  gallery: Gallery
}>()

const arkwaifu = useArkwaifu()
const arkwaifuGallery = useArkwaifuGallery()

const galleries = ref<Gallery[]>([])
watchEffect(async () => (galleries.value = await arkwaifuGallery.listGalleries()))
</script>

<style lang="scss" scoped></style>
