<template xmlns="http://www.w3.org/1999/html">
  <v-sheet v-if="asset" class="my-8">
    <p class="text-h4">{{ asset.kind }}/{{ asset.name }}</p>
    <p class="text-body-1">
      The first part of the asset's title is its <b>kind</b>, which is <b>{{ asset.kind }}</b> in this case.
      For more information of assets' kind, please refer to<router-link :to="{ name: 'Home' }">the Home
      page</router-link>.
      The second part of the asset's title is its <b>name</b>, which is <b>{{ asset.name }}</b> in this case.
      Kind and name together can refer to a unique asset. They are original just like they was extracted from the game,
      so they are universal in everywhere.
    </p>
    <p class="text-body-1">
      Please do not batch download assets, because it will quickly use up the server's traffic and bandwidth. For those
      who want to download all assets from Arkwaifu, please refer to <a
      href="https://github.com/FlandiaYingman/arkwaifu-2x">this</a> GitHub repository.
    </p>
    <p class="text-h5">Variants</p>
    <p class="text-body-1">
      Variants are different forms or versions for a same asset. Except for TIMG, all variants are compressed in
      lossless mode.
    </p>
    <p class="text-h6">IMG</p>
    <p class="text-body-1">
      IMGs are the original assets that are directly extracted from the game. IMG stands for 'image'. The maximum size
      for this kind can reach ~1MiB.
    </p>
    <p class="text-h6">TIMG</p>
    <p class="text-body-1">
      TIMGs are the reduced-size versions of assets. It is used for previewing the asset. TIMG stands for 'thumbnail
      image'. The maximum size for this kind of assets can reach 50 KiB.
    </p>
    <p class="text-h6">Real-ESRGAN</p>
    <p class="text-body-1">
      Real-ESRGANs are the enlarged versions of assets with <a
      href="https://github.com/xinntao/Real-ESRGAN">Real-ESRGAN</a> super-resolution neural network by 4x.
      The maximum size for this kind of assets can reach 8 MiB, so it may take a long time to load.
    </p>
    <v-tabs v-model="tab">
      <v-tab v-for="(variant, i) in asset.variants" :key="variant.variant" :value="i">
        {{ variant.variant }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab" style="min-width: 100%; aspect-ratio: 1/1">
      <v-window-item v-for="(variant, i) in asset.variants" :key="variant.variant" :value="i">
        <v-sheet>
          <img :src="api.getAssetUrl(asset, <'img' | 'timg' | 'real-esrgan'>variant.variant)" alt=""
               style="max-width: 100%;" />
          <p class="text-caption">{{ kind }}/{{ name }}</p>
        </v-sheet>
        <v-btn prepend-icon="mdi-download"
               class="mx-2"
               :href="api.getAssetUrl(asset, <'img' | 'timg' | 'real-esrgan'>variant.variant)">
          Download (WebP)
        </v-btn>
        <v-btn prepend-icon="mdi-download" class="mx-2" disabled>Download (JPEG) (Coming Soon)</v-btn>
        <v-btn prepend-icon="mdi-download" class="mx-2" disabled>Download (PNG) (Coming Soon)</v-btn>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useApi } from '@/arkwaifu-api'

  const props = defineProps<{
    kind: string,
    name: string,
  }>()

  const api = useApi()
  const asset = computed(() => api.assets.value.get(`${props.kind}/${props.name}`))
  const tab = ref(0)
</script>

<style scoped>
  p, ul {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
</style>
