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

    <p class="text-h4 monospace">{{ art.category }}/{{ art.id }}</p>

    <p v-if="aggregatedStoryArt instanceof AggregatedCharacterArt" class="text-subtitle-2 text-pre-line">
      {{ aggregatedStoryArt.names.join(t('\n')) }}
    </p>

    <v-expansion-panels model-value="origin" multiple>
      <v-expansion-panel v-for="variant in art.variants" :key="variant.variation" :value="variant.variation">
        <v-expansion-panel-title class="text-uppercase">
          {{ t(`variants_${variant.variation}`) }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <i18n-t class="text-h6" :keypath="`variants_${variant.variation}`" tag="p" />
          <i18n-t class="text-body-1" :keypath="`variants_${variant.variation}_body`" tag="p" />
          <v-sheet>
            <img :src="api.contentSrcOf(art.id, variant.variation)" alt="" style="max-width: 100%" />
            <p class="text-caption">{{ art.id }} ({{ variant.contentWidth }}x{{ variant.contentHeight }})</p>
          </v-sheet>
          <v-btn class="mx-2" prepend-icon="mdi-download" @click="download(variant, 'image/webp')">
            Download (WebP)
          </v-btn>
          <v-btn class="mx-2" prepend-icon="mdi-download" @click="download(variant, 'image/jpeg')">
            Download (JPEG)
          </v-btn>
          <v-btn class="mx-2" prepend-icon="mdi-download" @click="download(variant, 'image/png')">
            Download (PNG)
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <art-panel v-if="siblings" :arts="siblings" :title="t('siblings')" label="siblings" />
  </v-container>
  <v-sheet v-else class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate />
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { AggregatedCharacterArt, AggregatedPictureArt, Art, Category, Variant, Variation } from '@/arkwaifu-api'
import { useI18n } from 'vue-i18n'
import { saveAs } from 'file-saver'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { storeToRefs } from 'pinia'
import { useMetaStore } from '@/stores/meta'
import ArtPanel from '@/components/art/ArtPanel.vue'

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

function filename(variant: Variant): string {
  let filename = variant.artID
  if (variant.variation != Variation.Origin) {
    filename += `.${variant.variation}`
  }
  return filename
}

function download(variant: Variant, format: string) {
  const name = filename(variant)
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

const { appTitle } = storeToRefs(useMetaStore())
watchEffect(() => (appTitle.value = art.value?.id ?? ''))

// Siblings
const siblings = ref<Art[]>()
watchEffect(async () => {
  if (art.value?.category === Category.Character) {
    siblings.value = await api.fetchSiblingsOfCharacterArt(art.value.id)
  }
})
const aggregatedSiblings = ref<AggregatedCharacterArt[]>()
watchEffect(async () => {
  if (siblings.value) {
    aggregatedSiblings.value = await Promise.all(siblings.value.map((el) => api.fetchAggregatedCharacterArt(el.id)))
  }
})
</script>

<style scoped>
p,
ul {
  margin-bottom: 1rem;
  line-height: 1.8;
}
</style>

<i18n lang="yaml" locale="en">
siblings: Siblings

variants_origin: Original Image
variants_origin_body: >-
  The original image is the raw art extracted from the game. The maximum size of this variant can reach about 1 MiB (lossless compression).
variants_thumbnail: Thumbnail
variants_thumbnail_body: >-
  The thumbnail is a "scaled-down" version of the original image, used for previewing the art. The maximum size of this variant can reach about 50 KiB (lossy compression).
variants_real-esrgan(realesrgan-x4plus): Real-ESRGAN (realesrgan-x4plus)
variants_real-esrgan(realesrgan-x4plus)_body: >-
  Real-ESRGAN is the art obtained by enlarging the original image 4x using the neural network Real-ESRGAN's model realesrgan-x4plus. Unlike realesrgan-x4plus-anime, realesrgan-x4plus tends to enlarge arts in a realistic style and process unclear details (such as object textures). This model has better visual effects in most cases than realesrgan-x4plus-anime. However, this model may cause "tearing" in some arts. The maximum size of this variant can reach about 8 MiB (lossless compression).
variants_real-esrgan(realesrgan-x4plus-anime): Real-ESRGAN (realesrgan-x4plus-anime)
variants_real-esrgan(realesrgan-x4plus-anime)_body: >-
  Real-ESRGAN is the art obtained by enlarging the original image 4x using the neural network Real-ESRGAN's model realesrgan-x4plus-anime. Unlike realesrgan-x4plus, realesrgan-x4plus-anime tends to enlarge arts in an anime style without processing details (such as object textures) too much. The maximum size of this variant can reach about 8 MiB (lossless compression).
</i18n>

<i18n lang="yaml" locale="zh">
siblings: 系列

variants_origin: 原始图
variants_origin_body: >-
  原始图是从游戏中解包出来的原始资源。这个变体的最大大小可达约 1 MiB（无损压缩）。
variants_thumbnail: 缩略图
variants_thumbnail_body: >-
  缩略图是原始图的“缩小版”，用来预览资源。这个变体的最大大小可达约 50 KiB（有损压缩）。
variants_real-esrgan(realesrgan-x4plus): Real-ESRGAN (realesrgan-x4plus)
variants_real-esrgan(realesrgan-x4plus)_body: >-
  Real-ESRGAN 是原始图经过神经网络 Real-ESRGAN 的模型 realesrgan-x4plus 放大 4x 所得的资源。与 realesrgan-x4plus-anime 不同的是，realesrgan-x4plus 会更倾向于将资源放大为写实风格，会对看不清的细节（如物体的纹理）进行处理。此模型在大部分情况下视觉效果会优于 realesrgan-x4plus-anime。然而，此模型可能会在部分资源上出现“撕裂”的现象。这个变体的最大大小可达约 8 MiB（无损压缩）。
variants_real-esrgan(realesrgan-x4plus-anime): Real-ESRGAN (realesrgan-x4plus-anime)
variants_real-esrgan(realesrgan-x4plus-anime)_body: >-
  Real-ESRGAN 是原始图经过神经网络 Real-ESRGAN 的模型 realesrgan-x4plus-anime 放大 4x 所得的资源。与 realesrgan-x4plus 不同的是，realesrgan-x4plus-anime 会更倾向于将资源放大为动漫风格，而不会对细节（如物体的纹理）进行过多的处理。这个变体的最大大小可达约 8 MiB（无损压缩）。
</i18n>
