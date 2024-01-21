<template>
  <v-container v-if="arts.length">
    <div :id="label" class="text-h6">
      <a :href="`#${label}`" class="text-black text-decoration-none">§</a>
      {{ title }}
    </div>

    <v-row class="mx-1 my-2">
      <v-col v-for="(art, i) in artsResult" :key="art.id + i" cols="6" lg="3" sm="4" xl="2">
        <art-card :art="art" @loupe="carousel?.openCarousel(i)" />
      </v-col>
    </v-row>

    <art-carousel ref="carousel" :arts="arts" :preload="3" />
  </v-container>
</template>

<script lang="ts" setup>
import { Art } from '@/arkwaifu-api'
import ArtCard from '@/components/art/ArtCard.vue'
import ArtCarousel from '@/components/art/ArtCarousel.vue'
import { computed, ref } from 'vue'
import _ from 'lodash'

const props = withDefaults(
  defineProps<{
    title: string
    label: string
    arts: Art[]
    unique?: boolean
  }>(),
  {
    unique: true,
  },
)

const artsUnique = computed(() => _.uniqBy(props.arts, (el) => el.id))
const artsResult = computed(() => (props.unique ? artsUnique.value : props.arts))

const carousel = ref<InstanceType<typeof ArtCarousel>>()
</script>
