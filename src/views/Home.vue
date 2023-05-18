<template>
  <v-container class="px-16" style="max-width: 1440px">
    <p>
      <v-img src="@/assets/logo_phantom.png" width="256" />
    </p>

    <p class="text-h3">
      Welcome to Arkwaifu!
    </p>
    <p class="text-body-1">
      Arkwaifu is a website which, arranges and provides almost all picture assets extracted from <b>Arknights</b> (the
      game).
      Arkwaifu also enlarges (4x) the picture assets with super-resolution neural networks - Real-ESRGAN.
    </p>
    <p class="text-body-1">
      Discover the assets starting from the navigation bar on the left. Have fun!
    </p>

    <p class="text-h4">Available Assets</p>
    <p class="text-body-1">
      Now, only assets that appear in the "in-game stories (<b>AVG</b>)", are available, including <b>images</b>, <b>backgrounds</b>
      and <b>characters</b>.
    </p>

    <p class="text-h5">Images</p>
    <p class="text-body-1">
      Images are the exquisite artworks that appear when some special events in the stories happen.
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <!-- TODO: Use relative URL instead -->
        <v-img src="https://arkwaifu.cc/api/v0/asset/variants/images/32_i18/img/file" />
      </v-card>
    </p>
    <p class="text-caption">
      images/32_i18, from AVG "11-15 (淬火尘霾-土地震颤)", Logos casting a spell against 血魔大君
    </p>

    <p class="text-h5">Backgrounds</p>
    <p class="text-body-1">
      Backgrounds are the artworks that always appear during dialogue between characters.
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <!-- TODO: Use relative URL instead -->
        <v-img src="https://arkwaifu.cc/api/v0/asset/variants/backgrounds/bg_courtyard/img/file" />
      </v-card>
    </p>
    <p class="text-caption">
      backgrounds/bg_courtyard, from AVG "NL-2 (长夜临光-垂死的刺)", Nearl's courtyard, located in Kazimierz
    </p>

    <p class="text-h5">Characters</p>
    <p class="text-body-1">
      Characters are the artworks that represents characters that appear during dialogue.
    </p>
    <p class="text-body-1">
      <v-container class="ma-0 pa-0" style="max-width: 864px">
        <v-row dense>
          <v-col>
            <v-card variant="flat">
              <!-- TODO: Use relative URL instead -->
              <v-img src="https://arkwaifu.cc/api/v0/asset/variants/characters/char_250_phantom_1%233%241/img/file" />
            </v-card>
          </v-col>
          <v-col>
            <v-card variant="flat">
              <!-- TODO: Use relative URL instead -->
              <v-img src="https://arkwaifu.cc/api/v0/asset/variants/characters/char_250_phantom_1%233%241/alpha/file" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </p>
    <p class="text-caption">
      characters/char_250_phantom_1#3$1, from AVG "踏寻往昔之风-交错光影", Phantom, painful of taking his mask off<br />
    </p>
  </v-container>
</template>

<style lang="scss" scoped>
  p, ul {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
</style>
