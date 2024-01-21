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
        :subtitle="t('galleriesSubtitle')"
        :title="t('galleriesTitle')"
        :to="{ name: 'Galleries' }"
        color="primary"
        prepend-icon="mdi-panorama-variant-outline"
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
