<template>
  <v-container v-if="arts.length">
    <div :id="label" class="text-h6">
      <a :href="`#${label}`" class="text-black text-decoration-none">§</a>
      {{ title }}
    </div>

    <v-row class="mx-1 my-2">
      <v-col
        v-for="(art, i) in doHideArts ? artsResult.slice(0, 8 - 1) : artsResult"
        :key="art.id + i"
        cols="6"
        lg="3"
        sm="4"
        xl="2"
      >
        <art-card :art="art" @loupe="carousel?.openCarousel(i)" />
      </v-col>
      <v-col v-if="canHideArts" cols="6" lg="3" sm="4" xl="2">
        <v-responsive :aspect-ratio="arts[0].category !== 'character' ? 16 / 9 : 1">
          <div class="h-100 d-flex justify-center align-center">
            <v-btn
              :icon="doHideArts ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'"
              variant="text"
              size="x-large"
              @click="doHideArts = !doHideArts"
            ></v-btn>
          </div>
        </v-responsive>
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
const canHideArts = computed(() => props.arts.length > 8)
const doHideArts = ref(true)

const carousel = ref<InstanceType<typeof ArtCarousel>>()
</script>
