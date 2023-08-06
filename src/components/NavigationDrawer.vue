<template>
  <v-navigation-drawer
    :model-value="modelValue"
    :width="mobile ? 320 : 400"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <PhantomLogo />

    <v-list nav>
      <v-list-subheader>
        {{ t('title') }}
      </v-list-subheader>
      <v-list-item
        :active="route.name == 'Home'"
        :title="t('homeTitle')"
        :to="{ name: 'Home' }"
        color="primary"
        prepend-icon="mdi-home"
      />
      <v-list-group color="primary">
        <template #activator="{ props }">
          <v-list-item
            :subtitle="t('storiesSubtitle')"
            :title="t('storiesTitle')"
            prepend-icon="mdi-television"
            v-bind="props"
          />
        </template>
        <v-list-item
          :subtitle="t('mainStoriesSubtitle')"
          :title="t('mainStoriesTitle')"
          :to="{ name: 'Main Stories' }"
          prepend-icon="mdi-cube"
        />
        <v-list-item
          :subtitle="t('majorEventsSubtitle')"
          :title="t('majorEventsTitle')"
          :to="{ name: 'Major Events' }"
          prepend-icon="mdi-music-clef-treble"
        />
        <v-list-item
          :subtitle="t('minorEventsSubtitle')"
          :title="t('minorEventsTitle')"
          :to="{ name: 'Minor Events' }"
          prepend-icon="mdi-music-clef-bass"
        />
        <v-list-item
          :subtitle="t('othersSubtitle')"
          :title="t('othersTitle')"
          :to="{ name: 'Others' }"
          prepend-icon="mdi-music-rest-quarter"
        />
      </v-list-group>
      <v-list-item
        :subtitle="t('nonStoriesSubtitle')"
        :title="t('nonStoriesTitle')"
        :to="{ name: 'Non-Stories' }"
        color="primary"
        prepend-icon="mdi-television-off"
      />
      <v-list-item
        :subtitle="t('galleriesSubtitle')"
        :title="t('galleriesTitle')"
        :to="{ name: 'Galleries' }"
        color="primary"
        prepend-icon="mdi-panorama-variant-outline"
      />
      <v-list-item
        :subtitle="t('allSubtitle')"
        :title="t('allTitle')"
        :to="{ name: 'All' }"
        color="primary"
        prepend-icon="mdi-all-inclusive"
      />
      <v-list-item :title="t('aboutTitle')" :to="{ name: 'About' }" color="primary" prepend-icon="mdi-information" />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import PhantomLogo from './PhantomLogo.vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

defineProps<{
  modelValue: boolean | null
}>()
defineEmits<{
  'update:modelValue': [modelValue: boolean | null]
}>()

const route = useRoute()
const { t } = useI18n()

const { mobile } = useDisplay()
</script>

<i18n lang="yaml" locale="en">
title: 'Navigation'
homeTitle: 'Home'
storiesTitle: 'Stories'
storiesSubtitle: 'Arts that have appeared in the Stories'
mainStoriesTitle: 'Main Themes'
mainStoriesSubtitle: 'Main Stories'
majorEventsTitle: 'Intermezzi & Side Stories'
majorEventsSubtitle: 'Major Events'
minorEventsTitle: 'Vignettes'
minorEventsSubtitle: 'Minor Events: Story Collections, etc.'
othersTitle: 'Others'
othersSubtitle: 'Operator Records, etc.'
nonStoriesTitle: 'Non-Stories'
nonStoriesSubtitle: 'Arts that have not appeared in the Stories'
galleriesTitle: 'Galleries'
galleriesSubtitle: ''
allTitle: 'All Arts'
allSubtitle: 'May take a long time! '
aboutTitle: 'About'
</i18n>

<i18n lang="yaml" locale="zh">
title: '导航'
homeTitle: '首页'
storiesTitle: '剧情'
storiesSubtitle: '剧情中出现的资源'
mainStoriesTitle: '主题曲'
mainStoriesSubtitle: '主线故事'
majorEventsTitle: '插曲 & 别传'
majorEventsSubtitle: '大型活动'
minorEventsTitle: '故事集'
minorEventsSubtitle: '小型活动：（微型）故事集，etc.'
othersTitle: '其它'
othersSubtitle: '干员密录，etc.'
nonStoriesTitle: '非剧情'
nonStoriesSubtitle: '剧情中没有出现的资源'
galleriesTitle: '画廊'
galleriesSubtitle: ''
allTitle: '全部'
allSubtitle: '可能需要加载很长时间！'
aboutTitle: '关于'
</i18n>
