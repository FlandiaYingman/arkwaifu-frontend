<template>
  <v-layout-item class="text-end" model-value position="bottom" size="88" style="pointer-events: none">
    <v-btn
      :icon="icon"
      class="ma-12 mt-auto"
      color="primary"
      elevation="8"
      size="large"
      style="pointer-events: initial"
      @click="$emit('click')"
    />
  </v-layout-item>
</template>

<script setup lang="ts">
defineProps<{ icon: string }>()
defineEmits<{ click: [] }>()
</script>

<style scoped lang="scss"></style>
