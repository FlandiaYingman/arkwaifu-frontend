<template>
  <arts-panel :arts="arts" />
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Art } from '@/arkwaifu-api'
import ArtsPanel from '@/components/story/ArtsPanel.vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'

const api = useArkwaifu()

const arts = ref<Art[]>([])

watchEffect(async () => {
  arts.value = await api.fetchArtsExceptForStoryArts()
})
</script>
