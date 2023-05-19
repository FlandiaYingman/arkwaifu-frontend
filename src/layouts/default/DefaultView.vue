<template>
  <v-app>
    <NavigationDrawer v-model="drawerOpen" />

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>Arkwaifu</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="ma-auto" style="max-width: 1440px">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  const drawerOpen = ref(true)
</script>

<style lang="scss">
  html {
    /* height of sticky header, magic number measured from AvgView */
    scroll-padding-top: (64px + 32px + 16px);
  }
</style>
