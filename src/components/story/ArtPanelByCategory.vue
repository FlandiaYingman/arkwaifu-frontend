<template>
  <art-panel
    v-for="category in Object.keys(artsByCategory)"
    :key="category"
    :arts="artsByCategory[category]"
    :title="t(category)"
    :label="category"
    :unique="unique"
  />
  <FloatingActionButton :icon="unique ? 'mdi-fingerprint' : 'mdi-fingerprint-off'" @click="unique = !unique" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import _ from 'lodash'
import { Art } from '@/arkwaifu-api'
import ArtPanel from '@/components/art/ArtPanel.vue'
import { useI18n } from 'vue-i18n'
import FloatingActionButton from '@/components/FloatingActionButton.vue'

const props = withDefaults(
  defineProps<{
    arts: Art[]
  }>(),
  {
    arts: () => [],
  },
)
const { t } = useI18n()

const unique = ref(true)

const artsByCategory = computed(() => _.groupBy(props.arts, (el) => el.category))
</script>

<i18n lang="yaml" locale="en">
image: Images
background: Backgrounds
character: Characters
</i18n>

<i18n lang="yaml" locale="zh">
image: 插画
background: 背景
character: 角色
</i18n>
