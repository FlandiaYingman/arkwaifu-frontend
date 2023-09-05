<template>
  <arts-category-panel
    v-for="category in Object.values(Category)"
    :key="category"
    :arts="(uniqueSwitch ? groupedArtsUniq : groupedArts)[category] ?? []"
    :category="category"
  />
  <v-layout-item class="text-end" model-value position="bottom" size="88" style="pointer-events: none">
    <v-btn
      :icon="uniqueSwitch ? 'mdi-fingerprint' : 'mdi-fingerprint-off'"
      class="ma-12 mt-auto"
      color="primary"
      elevation="8"
      size="large"
      style="pointer-events: initial"
      @click="uniqueSwitch = !uniqueSwitch"
    />
  </v-layout-item>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import _ from 'lodash'
import ArtsCategoryPanel from '@/components/story/ArtsCategoryPanel.vue'
import { Art, Category } from '@/arkwaifu-api'

const props = withDefaults(
  defineProps<{
    arts: Art[]
  }>(),
  {
    arts: () => [],
  },
)

const uniqueSwitch = ref(true)

const groupedArts = computed(() =>
  _.chain(props.arts)
    .groupBy((el) => el.category)
    .value(),
)

const groupedArtsUniq = computed(() =>
  _.chain(groupedArts.value)
    .mapValues((el) => _.uniqBy(el, (el) => el.id))
    .value(),
)
</script>
