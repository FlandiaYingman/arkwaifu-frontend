<template>
  <v-container>
    <p>
      <v-img src="@/assets/logo_phantom.png" width="256" />
    </p>

    <p class="text-h3">
      Welcome to Arkwaifu!
    </p>
    <p class="text-body-1">
      Arkwaifu is a website which, arranges and provides almost all artworks extracted from <b>Arknights</b> (the
      game). Arkwaifu also enlarges (4x) the artworks with super-resolution neural networks - Real-ESRGAN.
    </p>
    <p class="text-body-1">
      Discover the artworks starting from the navigation bar on the left. Have fun!
    </p>

    <p class="text-h4">Available Arts</p>
    <p class="text-body-1">
      Now, only arts that appear in the "in-game stories", are available, including <b>images</b>, <b>backgrounds</b>
      and <b>characters</b>.
    </p>

    <p class="text-h5">Images</p>
    <p class="text-body-1">
      Images are the exquisite artworks that appear when some special events in the stories happen.
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.getArtContentURL('32_i18', 'origin')" />
      </v-card>
    </p>
    <p class="text-caption">
      images/32_i18, from story "11-15 (淬火尘霾-土地震颤)", Logos casting a spell against 血魔大君
    </p>

    <p class="text-h5">Backgrounds</p>
    <p class="text-body-1">
      Backgrounds are the artworks that always appear during dialogue between characters.
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.getArtContentURL('bg_courtyard', 'origin')" />
      </v-card>
    </p>
    <p class="text-caption">
      backgrounds/bg_courtyard, from story "NL-2 (长夜临光-垂死的刺)", Nearl's courtyard, located in Kazimierz
    </p>

    <p class="text-h5">Characters</p>
    <p class="text-body-1">
      Characters are the artworks that represents characters that appear during dialogue.
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.getArtContentURL('char_250_phantom_1#3$1', 'origin')" />
      </v-card>
    </p>
    <p class="text-caption">
      characters/char_250_phantom_1#3$1, from story "踏寻往昔之风-交错光影", Phantom, painful of taking his mask
      off<br />
    </p>
  </v-container>
</template>

<script setup lang="ts">
  import { useApi } from '@/arkwaifu-api'

  const api = useApi()
</script>

<style lang="scss" scoped>
  p, ul {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
</style>
