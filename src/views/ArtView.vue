<template xmlns="http://www.w3.org/1999/html">
  <v-sheet v-if="art" class="my-8">
    <p class="text-h4">{{ art.category }}/{{ art.id }}</p>
    <p class="text-body-1">
      The first part of the art's title is its <b>kind</b>, which is <b>{{ art.category }}</b> in this case.
      For more information of arts' kind, please refer to<router-link :to="{ name: 'Home' }">the Home
      page</router-link>.
      The second part of the art's title is its <b>name</b>, which is <b>{{ art.id }}</b> in this case.
      Kind and name together can refer to a unique art. They are original just like they was extracted from the game,
      so they are universal in everywhere.
    </p>
    <p class="text-body-1">
      Please do not batch download arts, because it will quickly use up the server's traffic and bandwidth. For those
      who want to download all arts from Arkwaifu, please refer to <a
      href="https://github.com/FlandiaYingman/arkwaifu-2x">this</a> GitHub repository.
    </p>
    <p class="text-h5">Variants</p>
    <p class="text-body-1">
      Variants are different forms or versions for a same art. Except for TIMG, all variants are compressed in
      lossless mode.
    </p>
    <p class="text-h6">IMG</p>
    <p class="text-body-1">
      IMGs are the original arts that are directly extracted from the game. IMG stands for 'image'. The maximum size
      for this kind can reach ~1MiB.
    </p>
    <p class="text-h6">TIMG</p>
    <p class="text-body-1">
      TIMGs are the reduced-size versions of arts. It is used for previewing the arts. TIMG stands for 'thumbnail
      image'. The maximum size for this kind of arts can reach 50 KiB.
    </p>
    <p class="text-h6">Real-ESRGAN</p>
    <p class="text-body-1">
      Real-ESRGANs are the enlarged versions of arts with <a
      href="https://github.com/xinntao/Real-ESRGAN">Real-ESRGAN</a> super-resolution neural network by 4x.
      The maximum size for this kind of arts can reach 8 MiB, so it may take a long time to load.
    </p>
    <v-tabs v-model="tab">
      <v-tab v-for="(variant, i) in art.variants" :key="variant.variation" :value="i">
        {{ variant.variation }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab" style="min-width: 100%; aspect-ratio: 1/1">
      <v-window-item v-for="(variant, i) in art.variants" :key="variant.variation" :value="i">
        <v-sheet>
          <img :src="api.getArtContentURL(art.id, variant.variation)" alt=""
               style="max-width: 100%;" />
          <p class="text-caption">{{ art.category }}/{{ art.id }}</p>
        </v-sheet>
        <v-btn prepend-icon="mdi-download"
               class="mx-2"
               :href="api.getArtContentURL(art.id, variant.variation)">
          Download (WebP)
        </v-btn>
        <v-btn prepend-icon="mdi-download" class="mx-2" disabled>Download (JPEG) (Coming Soon)</v-btn>
        <v-btn prepend-icon="mdi-download" class="mx-2" disabled>Download (PNG) (Coming Soon)</v-btn>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Art, useApi } from '@/arkwaifu-api'

  const props = defineProps<{
    id: string,
  }>()

  const api = useApi()
  const art = ref<Art>()
  const tab = ref(0)

  watch(() => props.id, async val => art.value = await api.fetchArtByID(val), { immediate: true })
</script>

<style scoped>
  p, ul {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
</style>
