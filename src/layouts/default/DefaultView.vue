<template>
  <v-app>
    <NavigationDrawer v-model="drawerOpen" />

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>Arkwaifu</v-toolbar-title>

      <v-btn-toggle v-model="serverNum" mandatory color="secondary" class="mr-2">
        <v-btn v-for="server in Object.keys(Server)" prepend-icon="mdi-server">
          {{ server }}
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle v-model="langNum" mandatory color="secondary" class="mr-2">
        <v-btn v-for="locale in Object.keys(Locale)" prepend-icon="mdi-translate">
          {{ (new Intl.DisplayNames([locale], { type: 'language' })).of(locale) }}
        </v-btn>
      </v-btn-toggle>

      <template v-slot:append>
        <v-btn class="mx-2" icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <div class="ma-auto" style="max-width: 1440px">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { computed, ref, watchPostEffect } from 'vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import { Server, useApi } from '@/arkwaifu-api'
  import { useI18n } from 'vue-i18n'
  import { Locale } from '@/locales'

  const api = useApi()
  const i18n = useI18n()

  const drawerOpen = ref<boolean | null>(null)

  const serverNum = ref(Object.keys(Server).indexOf(api.server))
  const server = computed<Server>(() => Server[Object.keys(Server)[serverNum.value] as keyof typeof Server])
  watchPostEffect(() => api.switchServer(server.value))

  const langNum = ref(Object.values(Locale).indexOf(i18n.locale.value as Locale))
  const lang = computed<Locale>(() => Locale[Object.keys(Locale)[langNum.value] as keyof typeof Locale])
  watchPostEffect(() => i18n.locale.value = lang.value)
</script>

<style lang="scss">
  html {
    /* height of sticky header, magic number measured from AvgView */
    scroll-padding-top: (64px + 32px + 16px);
  }
</style>
