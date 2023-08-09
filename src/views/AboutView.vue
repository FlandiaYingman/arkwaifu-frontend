<template>
  <v-container>
    <p>
      <v-img src="@/assets/logo_phantom.png" width="256" />
    </p>
    <i18n-t keypath="title" tag="p" class="text-h3" />
    <i18n-t keypath="p1" tag="p" class="text-body-1">
      <template #arknights>
        <b>{{ t('arknights') }}</b>
      </template>
    </i18n-t>
    <p>
      <v-avatar image="@/assets/FlandiaYingman.png" size="192" />
    </p>
    <i18n-t keypath="p2" tag="p" class="text-body-1">
      <template #flandia_yingman>
        <a href="https://github.com/FlandiaYingman">@FlandiaYingman</a>
      </template>
      <template #the_repository>
        <a href="https://github.com/FlandiaYingman/arkwaifu">{{ t('the_repository') }}</a>
      </template>
    </i18n-t>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useMetaStore } from '@/stores/meta'
import { watchEffect } from 'vue'

const { t } = useI18n()

const { appTitle } = storeToRefs(useMetaStore())
watchEffect(() => (appTitle.value = t('aboutTitle')))
</script>

<style lang="scss" scoped>
p,
ul {
  margin-bottom: 1rem;
  line-height: 1.8;
}
</style>

<i18n locale="en" lang="yaml">
arknights: >-
  Arknights
the_repository: >-
  the repository
title: >-
  About Arkwaifu...
p1: >-
  Arkwaifu is a website which arranges and provides almost all artworks extracted from {arknights} (the game).
  Arkwaifu also enlarges (4x) the artworks with super-resolution neural networks - Real-ESRGAN.
p2: >-
  I am Flandia Yingman ({flandia_yingman}), the webmaster and currently the sole maintainer of Arkwaifu.
  If you have any questions or want to contribute to Arkwaifu, feel free to create an issue or pull request to {the_repository}.
  Any questions, comments, suggestions and contribution are welcome!
</i18n>

<i18n locale="zh" lang="yaml">
arknights: >-
  明日方舟
the_repository: >-
  这个仓库
title: >-
  关于 Arkwaifu……
p1: >-
  Arkwaifu 提供几乎所有从{arknights}中提取的图片资源。
  同时，Arkwaifu 也会利用神经网络 Real-.ESRGAN 将资源进行超分辨率（4x）。
p2: >-
  我是 Flandia Yingman（{flandia_yingman}），Arkwaifu 的站长和目前唯一的开发者。
  如果有任何问题，或者想为 Arkwaifu 贡献，就来{the_repository}创建一个 issue 或者 pull request 吧。
  任何问题、建议或者贡献都可以！
</i18n>
