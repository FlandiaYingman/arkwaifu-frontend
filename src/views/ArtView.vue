<template xmlns="http://www.w3.org/1999/html">
  <v-sheet v-if="art" class="my-8">
    <p class="text-h4">{{ art.category }}/{{ art.id }}</p>
    <i18n-t keypath="body-1" tag="p" class="text-body-1">
      <template #bold_category>
        <b>{{ t('category') }}</b>
      </template>
      <template #category>
        <b>{{ art.category }}</b>
      </template>
      <template #bold_id>
        <b>{{ t('id') }}</b>
      </template>
      <template #id>
        <b>{{ art.id }}</b>
      </template>
      <template #home>
        <router-link :to="{ name: 'Home' }">{{ t('home_page') }}</router-link>
      </template>
    </i18n-t>
    <i18n-t keypath="body-2" tag="p" class="text-body-1">
      <template #arkwaifu_2x>
        <a href="https://github.com/FlandiaYingman/arkwaifu-2x">arkwaifu-2x</a>
      </template>
    </i18n-t>
    <i18n-t keypath="variants" tag="p" class="text-h5" />
    <i18n-t keypath="variants_body" tag="p" class="text-body-1" />
    <i18n-t keypath="variants_origin" tag="p" class="text-h6" />
    <i18n-t keypath="variants_origin_body" tag="p" class="text-body-1" />
    <i18n-t keypath="variants_thumbnail" tag="p" class="text-h6" />
    <i18n-t keypath="variants_thumbnail_body" tag="p" class="text-body-1" />
    <i18n-t keypath="variants_real_esrgan" tag="p" class="text-h6" />
    <i18n-t keypath="variants_real_esrgan_body" tag="p" class="text-body-1">
      <template #real_esrgan>
        <a href="https://github.com/xinntao/Real-ESRGAN">{{ t('variants_real_esrgan') }}</a>
      </template>
    </i18n-t>
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
  import { useI18n } from 'vue-i18n'

  const props = defineProps<{
    id: string,
  }>()

  const api = useApi()
  const art = ref<Art>()
  const tab = ref(0)

  const { t } = useI18n()

  watch(() => props.id, async val => art.value = await api.fetchArtByID(val), { immediate: true })
</script>

<style scoped>
  p, ul {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
</style>

<i18n locale="en" lang="yaml">
category: category
id: ID
home_page: Home page
body-1: >
  The first part of the art's title is its {bold_category}, which is {category} in this case.
  For more information of arts' category, please refer to {home}.
  The second part of the art's title is its {bold_id}, which is {id} in this case.
body-2: >
  Please do not batch download arts, because it will quickly use up the server's traffic and bandwidth.
  For those who want to download all arts from Arkwaifu, please refer to {arkwaifu_2x}.
variants: Variants
variants_body: >
  Variants are different forms or versions for the same art.
variants_origin: Origin
variants_origin_body: >
  Origin represents the original arts that are just the same as they were extracted directly from the game.
  The maximum size for this variant can reach ~1MiB, and it is compressed in lossless mode.
variants_thumbnail: Thumbnail
variants_thumbnail_body: >
  Variant 'thumbnail' are the reduced-size versions of arts. It is used for previewing the arts.
  The maximum size for this variant can reach ~50 KiB, and it is compressed in lossy mode.
variants_real_esrgan: Real-ESRGAN
variants_real_esrgan_body: >
  Variant 'Real-ESRGAN' are the enlarged versions of arts with {real_esrgan} super-resolution neural network by 4x.
  The maximum size for this variant can reach ~8 MiB, and it is compressed in lossless mode.
</i18n>

<i18n locale="zh" lang="yaml">
category: 类别
id: ID
home_page: 首页
body-1: >
  标题的第一部分是该资源的{bold_category}，对这个资源而言则是 {category}。
  关于资源的不同类别，请参照{home}。
  标题的第二部分是该资源的{bold_id}，对这个资源而言则是 {id}。
body-2: >
  请不要批量下载资源，因为这会快速地消耗掉服务器的带宽。
  你可以在 {arkwaifu_2x} 找到打包好的所有资源。
variants: 变体
variants_body: >
  变体是同一个资源的不同变种或形式。
variants_origin: 原始图
variants_origin_body: >
  原始图就跟从游戏中解包出来的资源一模一样。
  这个变体的最大大小可达约 1MiB（无损压缩）。
variants_thumbnail: 缩略图
variants_thumbnail_body: >
  缩略图是原始图的“缩小版”，用来预览资源。
  这个变体的最大大小可达约 50KiB（有损压缩）。
variants_real_esrgan: Real-ESRGAN
variants_real_esrgan_body: >
  Real-ESRGAN 是原始图经过神经网络 {real_esrgan} 放大 4x 而得的资源。
  这个变体的最大大小可达约 8MiB（无损压缩）。
</i18n>
