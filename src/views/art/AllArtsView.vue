<template>
  <art-panel-by-category :arts="arts" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { Art } from '@/arkwaifu-api'
import ArtPanelByCategory from '@/components/story/ArtPanelByCategory.vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { storeToRefs } from 'pinia'
import { useMetaStore } from '@/stores/meta'
import { useI18n } from 'vue-i18n'

const api = useArkwaifu()
const arts = ref<Art[]>([])

onMounted(async () => {
  arts.value = await api.fetchArts()
})

const { t } = useI18n()
const { appTitle } = storeToRefs(useMetaStore())
watchEffect(() => (appTitle.value = t('allTitle')))
</script>
