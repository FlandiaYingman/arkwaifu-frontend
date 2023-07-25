<template>
  <v-container v-if="art" class="my-8">
    <div v-if="aggregatedStoryArt instanceof AggregatedPictureArt">
      <p class="text-h3">
        {{ aggregatedStoryArt.title }}
      </p>
      <p class="text-body-1">
        {{ aggregatedStoryArt.subtitle }}
      </p>
    </div>
    <p class="text-h4">
      {{ art.id }}
    </p>
    <p v-if="aggregatedStoryArt instanceof AggregatedCharacterArt" class="text-h6">
      {{ aggregatedStoryArt.names.join(t('comma')) }}
    </p>
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
        <router-link :to="{ name: 'Home' }">
          {{ t('home_page') }}
        </router-link>
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
    <v-expansion-panels multiple model-value="origin">
      <v-expansion-panel v-for="variant in art.variants" :key="variant.variation" :value="variant.variation">
        <v-expansion-panel-title class="text-uppercase">
          {{ variant.variation }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-sheet>
            <img :src="api.contentSrcOf(art.id, variant.variation)" alt="" style="max-width: 100%" />
            <p class="text-caption">{{ art.id }} ({{ variant.contentWidth }}x{{ variant.contentHeight }})</p>
          </v-sheet>
          <v-btn prepend-icon="mdi-download" class="mx-2" @click="download(variant, 'image/webp')">
            Download (WebP)
          </v-btn>
          <v-btn prepend-icon="mdi-download" class="mx-2" @click="download(variant, 'image/jpeg')">
            Download (JPEG)
          </v-btn>
          <v-btn prepend-icon="mdi-download" class="mx-2" @click="download(variant, 'image/png')">
            Download (PNG)
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  AggregatedCharacterArt,
  AggregatedPictureArt,
  Art,
  Category,
  useArkwaifu,
  Variant,
  Variation,
} from '@/arkwaifu-api'
import { useI18n } from 'vue-i18n'
import { saveAs } from 'file-saver'
import { extension } from 'mime-types'

const props = defineProps<{
  id: string
}>()

const api = useArkwaifu()
const art = ref<Art>()
const aggregatedStoryArt = ref<AggregatedPictureArt | AggregatedCharacterArt>()

const { t } = useI18n()

watchEffect(async () => (art.value = await api.fetchArtByID(props.id)))
watchEffect(async () => {
  if (art.value) {
    if (art.value.category !== Category.Character) {
      aggregatedStoryArt.value = await api.fetchAggregatedPictureArt(props.id)
    } else {
      aggregatedStoryArt.value = await api.fetchAggregatedCharacterArt(props.id)
    }
  }
})

function download(variant: Variant, format: string) {
  const name = `${variant.artID}${variant.variation != Variation.Origin ? `.${variant.variation}` : ''}.${extension(
    format,
  )}`
  const url = api.contentSrcOf(variant.artID, variant.variation)
  if (format == 'image/webp') {
    saveAs(url, name)
    return
  }
  const imgElement: HTMLImageElement = document.createElement('img')
  imgElement.crossOrigin = 'anonymous'
  imgElement.onload = () => {
    const canvasElement: HTMLCanvasElement = document.createElement('canvas')
    canvasElement.width = imgElement.naturalWidth
    canvasElement.height = imgElement.naturalHeight
    const ctx = canvasElement.getContext('2d')!!
    ctx.drawImage(imgElement, 0, 0)
    canvasElement.toBlob(
      (blob) => {
        saveAs(blob!!, name)
      },
      format,
      0.95,
    )
  }
  imgElement.src = url
}
</script>

<style scoped>
p,
ul {
  margin-bottom: 1rem;
  line-height: 1.8;
}
</style>

<i18n locale="en" lang="yaml">
comma: ', '
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
comma: '，'
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
