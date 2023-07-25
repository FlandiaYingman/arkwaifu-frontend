<template>
  <arts-panel :arts="arts" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Art } from '@/arkwaifu-api'
import ArtsPanel from '@/components/story/ArtsPanel.vue'
import { useArkwaifu } from '@/stores/arkwaifu-api'

const api = useArkwaifu()
const arts = ref<Art[]>([])

onMounted(async () => {
  arts.value = await api.fetchArts()
})
</script>
