<template>
  <v-app>
    <NavigationDrawer v-model="drawerOpen" />

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>{{ meta.appTitle }}</v-toolbar-title>

      <v-btn v-if="mdAndUp" id="server-menu-activator" prepend-icon="mdi-server">
        {{ t('server') }}
      </v-btn>
      <v-btn v-else id="server-menu-activator" icon="mdi-server" />
      <v-menu activator="#server-menu-activator">
        <v-list>
          <v-list-item
            v-for="server in Object.keys(Server)"
            :key="server"
            prepend-icon="mdi-server"
            @click="api.switchServer(Server[server as keyof typeof Server])"
          >
            {{ server }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-if="mdAndUp" id="language-menu-activator" prepend-icon="mdi-translate">
        {{ t('language') }}
      </v-btn>
      <v-btn v-else id="language-menu-activator" icon="mdi-translate" />
      <v-menu activator="#language-menu-activator">
        <v-list>
          <v-list-item
            v-for="locale in Object.keys(Locale)"
            :key="locale"
            prepend-icon="mdi-translate"
            @click="i18n.locale.value = Locale[locale as keyof typeof Locale]"
          >
            {{ new Intl.DisplayNames([locale], { type: 'language' }).of(locale) }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <div class="ma-auto px-2 px-lg-8">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import { Server } from '@/arkwaifu-api'
import { useI18n } from 'vue-i18n'
import { Locale } from '@/locales'
import { useDisplay } from 'vuetify'
import { useArkwaifu } from '@/stores/arkwaifu-api'
import { useMetaStore } from '@/stores/meta'

const meta = useMetaStore()
const api = useArkwaifu()
const i18n = useI18n({ useScope: 'global' })
const { t } = useI18n()

const drawerOpen = ref<boolean | null>(null)

const { mdAndUp } = useDisplay()
</script>

<style lang="scss">
html {
  /* height of sticky header, magic number measured from AvgView */
  scroll-padding-top: (64px + 32px + 16px);
}
</style>

<i18n locale="en" lang="yaml">
server: Server
language: Language
</i18n>

<i18n locale="zh" lang="yaml">
server: 服务器
language: 语言
</i18n>
