<template>
  <v-container v-if="arts.length">
    <p :id="category" class="text-h6">
      <a :href="`#${category}`" class="text-black text-decoration-none">§</a>
      {{ category }}
    </p>
    <v-row class="mx-1 my-2">
      <v-col v-for="art in arts" cols="6" sm="4" lg="3" xl="2">
        <art-card :art="art" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
  import { Art } from '@/arkwaifu-api'
  import ArtCard from '@/components/art/ArtCard.vue'

  defineProps<{
    arts: Art[],
    category: string,
  }>()
</script>
