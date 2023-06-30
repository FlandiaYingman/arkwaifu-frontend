<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="360">
    <PhantomLogo />

    <v-list nav>
      <v-list-subheader>
        {{ t('title') }}
      </v-list-subheader>
      <v-list-item
        :to="{ name: 'Home'}"
        color="primary"
        prepend-icon="mdi-home"
        :title="t('homeTitle')"
        :active="$route.name == 'Home'"
      >
      </v-list-item>
      <v-list-group
        color="primary"
      >
        <template #activator="{ props }">
          <v-list-item
            prepend-icon="mdi-television"
            :subtitle="t('storiesSubtitle')"
            :title="t('storiesTitle')"
            v-bind="props"
          />
        </template>
        <v-list-item
          :to="{ name: 'Main Stories' }"
          prepend-icon="mdi-cube"
          :subtitle="t('mainStoriesSubtitle')"
          :title="t('mainStoriesTitle')"
        />
        <v-list-item
          :to="{ name: 'Major Events' }"
          prepend-icon="mdi-music-clef-treble"
          :subtitle="t('majorEventsSubtitle')"
          :title="t('majorEventsTitle')"
        />
        <v-list-item
          :to="{ name: 'Minor Events' }"
          prepend-icon="mdi-music-clef-bass"
          :subtitle="t('minorEventsSubtitle')"
          :title="t('minorEventsTitle')"
        />
        <v-list-item
          :to="{ name: 'Others' }"
          prepend-icon="mdi-music-rest-quarter"
          :subtitle="t('othersSubtitle')"
          :title="t('othersTitle')"
        />
      </v-list-group>
      <v-list-item
        :to="{ name: 'Non-Stories' }"
        color="primary"
        prepend-icon="mdi-television-off"
        :subtitle="t('nonStoriesSubtitle')"
        :title="t('nonStoriesTitle')"
      />
      <v-list-item
        :to="{ name: 'All' }"
        color="primary"
        prepend-icon="mdi-all-inclusive"
        :subtitle="t('allSubtitle')"
        :title="t('allTitle')"
      />
      <v-list-item
        :to="{ name: 'About' }"
        color="primary"
        prepend-icon="mdi-information"
        :title="t('aboutTitle')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import PhantomLogo from './PhantomLogo.vue'
  import { useI18n } from 'vue-i18n'

  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])

  const { t } = useI18n()
</script>

<i18n locale="en">
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
allTitle: 'All Arts'
allSubtitle: 'May take a long time! '
aboutTitle: 'About'
</i18n>

<i18n locale="zh" lang="yaml">
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
allTitle: '全部'
allSubtitle: '可能需要加载很长时间！'
aboutTitle: '关于'
</i18n>
