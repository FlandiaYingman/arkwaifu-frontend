<template>
  <arts-sheet-by-kind v-for="category in Object.values(Category)"
                      :key="category"
                      :arts="(uniqueSwitch ? groupedArtsUniq : groupedArts)[category] ?? []"
                      :category="category" />
  <v-layout-item model-value position="bottom" class="d-flex">
    <v-btn @click="uniqueSwitch = !uniqueSwitch"
           :icon="uniqueSwitch ? 'mdi-fingerprint' : 'mdi-fingerprint-off'"
           size="large"
           color="primary"
           elevation="8"
           class="ma-12 mt-auto ml-auto"
    />
  </v-layout-item>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import _ from 'lodash'
  import ArtsSheetByKind from '@/components/story/ArtSheetByKind.vue'
  import { Art, Category } from '@/arkwaifu-api'


  const props = withDefaults(defineProps<{
    arts: Array<Art>
  }>(), {
    arts: () => [],
  })

  const uniqueSwitch = ref(true)

  const groupedArts = computed(() => _
    .chain(props.arts)
    .groupBy(el => el.category)
    .value(),
  )

  const groupedArtsUniq = computed(() => _
    .chain(groupedArts.value)
    .mapValues(el => _.uniqBy(el, el => el.id))
    .value(),
  )
</script>
