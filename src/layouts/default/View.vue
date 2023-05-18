<template>
  <v-app>
    <v-navigation-drawer v-model="drawerOpen" width="360">
      <PhantomLogo />

      <v-list nav>
        <v-list-subheader>
          Navigation
        </v-list-subheader>
        <v-list-item
          color="primary"
          prepend-icon="mdi-home"
          title="Home"
          to="/"
        >
        </v-list-item>
        <v-list-group
          color="primary"
        >
          <template #activator="{props}">
            <v-list-item
              prepend-icon="mdi-television"
              subtitle="Assets indexed by AVG"
              title="AVG"
              v-bind="props"
            />
          </template>
          <v-list-item
            prepend-icon="mdi-cube"
            subtitle="Main Stories"
            title="Main Theme"
            to="/avgs/main_themes"
          />
          <v-list-item
            prepend-icon="mdi-music-clef-treble"
            subtitle="Major Events"
            title="Intermezzi & Side Storie"
            to="/avgs/major_events"
          />
          <v-list-item
            prepend-icon="mdi-music-clef-bass"
            subtitle="Story Collections"
            title="Vignettes"
            to="/avgs/vignettes"
          />
          <v-list-item
            prepend-icon="mdi-music-rest-quarter"
            subtitle="Operator Records, etc."
            title="Others"
            to="/avgs/others"
          />
        </v-list-group>
        <v-list-item
          color="primary"
          prepend-icon="mdi-television-off"
          subtitle="Assets that are not in AVG"
          title="Non-AVG"
          to="/non_avgs"
        />
        <v-list-item
          color="primary"
          prepend-icon="mdi-all-inclusive"
          subtitle="May take a long time! "
          title="All Assets"
          to="/all"
        />
        <v-list-item
          color="primary"
          prepend-icon="mdi-information"
          title="About"
          to="/about"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>Arkwaifu</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import PhantomLogo from "@/components/PhantomLogo.vue";

  const drawerOpen = ref(true)
</script>

