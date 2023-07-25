<template>
  <v-container>
    <p>
      <v-img src="@/assets/logo_phantom.png" width="256" />
    </p>

    <p class="text-h3">
      {{ t('introduction.title') }}
    </p>
    <i18n-t keypath="introduction.p1" tag="p" class="text-body-1">
      <template #arknights>
        <b>{{ t('arknights') }}</b>
      </template>
    </i18n-t>
    <p class="text-body-1">
      {{ t('introduction.p2') }}
    </p>

    <p class="text-h4">
      {{ t('available_arts.title') }}
    </p>
    <i18n-t keypath="available_arts.p1" tag="p" class="text-body-1">
      <template #images>
        <b>{{ t('images') }}</b>
      </template>
      <template #backgrounds>
        <b>{{ t('backgrounds') }}</b>
      </template>
      <template #characters>
        <b>{{ t('characters') }}</b>
      </template>
    </i18n-t>

    <p class="text-h5">
      {{ t('available_arts.images_title') }}
    </p>
    <p class="text-body-1">
      {{ t('available_arts.images_p1') }}
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.contentSrcOf('32_i18', Variation.Origin)" />
      </v-card>
    </p>
    <p class="text-caption">
      {{ t('available_arts.images_c1') }}
    </p>

    <p class="text-h5">
      {{ t('available_arts.backgrounds_title') }}
    </p>
    <p class="text-body-1">
      {{ t('available_arts.backgrounds_p1') }}
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.contentSrcOf('bg_courtyard', Variation.Origin)" />
      </v-card>
    </p>
    <p class="text-caption">
      {{ t('available_arts.backgrounds_c1') }}
    </p>

    <p class="text-h5">
      {{ t('available_arts.characters_title') }}
    </p>
    <p class="text-body-1">
      {{ t('available_arts.characters_p1') }}
    </p>
    <p class="text-body-1">
      <v-card max-width="864" variant="flat">
        <v-img :src="api.contentSrcOf('char_250_phantom_1#3$1', Variation.Origin)" />
      </v-card>
    </p>
    <p class="text-caption">
      {{ t('available_arts.characters_c1') }}
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { useArkwaifu, Variation } from '@/arkwaifu-api'
import { useI18n } from 'vue-i18n'

const api = useArkwaifu()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
p,
ul {
  margin-bottom: 1rem;
  line-height: 1.8;
}
</style>

<i18n locale="en" lang="yaml">
arknights: Arknights
images: images
backgrounds: backgrounds
characters: characters
introduction:
  title: >
    Welcome to Arkwaifu!
  p1: >
    Arkwaifu is a website which arranges and provides almost all artworks extracted from {arknights} (the game). Arkwaifu also enlarges (4x) the artworks with super-resolution neural networks - Real-ESRGAN.
  p2: >
    Discover the artworks starting from the navigation bar on the left. Have fun!
available_arts:
  title: >
    Available Arts
  p1: >
    Now, only arts that appear in the "in-game stories" are available, including {images}, {backgrounds} and {characters}.
  images_title: >
    Images
  images_p1: >
    Images are the exquisite artworks that appear when some special events in the stories happen.
  images_c1: >
    images/32_i18, from story "11-15 (淬火尘霾-土地震颤)", Logos casting a spell against 血魔大君
  backgrounds_title: >
    Backgrounds
  backgrounds_p1: >
    Backgrounds are the artworks that always appear during dialogue between characters.
  backgrounds_c1: backgrounds/bg_courtyard, from the story "NL-2 (长夜临光-垂死的刺)", Nearl's courtyard, located in Kazimierz
  characters_title: >
    Characters
  characters_p1: >
    Characters are the artworks that represent characters that appear during dialogue.
  characters_c1: >
    characters/char_250_phantom_1#3$1, from the story "踏寻往昔之风-交错光影", Phantom, painful of taking his mask off
</i18n>

<i18n locale="zh" lang="yaml">
arknights: 明日方舟
images: images
backgrounds: backgrounds
characters: characters
introduction:
  title: >
    欢迎来到 Arkwaifu！
  p1: >
    Arkwaifu 提供几乎所有从{arknights}中提取的图片资源。同时，Arkwaifu 也会利用神经网络 Real-ESRGAN 将资源进行超分辨率（4x）。
  p2: >
    从左边的导航栏开始。玩的开心！
available_arts:
  title: >
    可用的资源
  p1: >
    现在，Arkwaifu 只提供游戏中剧情出现的资源，包括 {images}、{backgrounds} 和 {characters}。
  images_title: >
    Images
  images_p1: >
    Images 是当某些重要的事件发生时展示的图片资源。
  images_c1: >
    images/32_i18, 剧情“11-15 (淬火尘霾-土地震颤)”，Logos 在施法对抗血魔大君
  backgrounds_title: >
    Backgrounds
  backgrounds_p1: >
    Backgrounds 是角色在对话时总是在背景展示的图片资源。
  backgrounds_c1: backgrounds/bg_courtyard, 剧情“NL-2 (长夜临光-垂死的刺)”，临光家的院子，位于卡西米尔
  characters_title: >
    Characters
  characters_p1: >
    Characters 是角色在对话时代表角色的图片资源。
  characters_c1: >
    characters/char_250_phantom_1#3$1, 剧情“踏寻往昔之风-交错光影”，傀影，痛苦地摘掉面具
</i18n>
