<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="360">
    <PhantomLogo />

    <v-list nav>
      <v-list-subheader>
        Navigation
      </v-list-subheader>
      <v-list-item
        :to="{ name: 'Home'}"
        color="primary"
        prepend-icon="mdi-home"
        title="Home"
        :active="$route.name == 'Home'"
      >
      </v-list-item>
      <v-list-group
        color="primary"
      >
        <template #activator="{ props }">
          <v-list-item
            prepend-icon="mdi-television"
            subtitle="Arts that have appeared in the Stories"
            title="Stories"
            v-bind="props"
          />
        </template>
        <v-list-item
          :to="{ name: 'Main Stories' }"
          prepend-icon="mdi-cube"
          subtitle="Main Stories"
          title="Main Themes"
        />
        <v-list-item
          :to="{ name: 'Major Events' }"
          prepend-icon="mdi-music-clef-treble"
          subtitle="Major Events"
          title="Intermezzi & Side Stories"
        />
        <v-list-item
          :to="{ name: 'Minor Events' }"
          prepend-icon="mdi-music-clef-bass"
          subtitle="Minor Events: Story Collections, etc."
          title="Vignettes"
        />
        <v-list-item
          :to="{ name: 'Others' }"
          prepend-icon="mdi-music-rest-quarter"
          subtitle="Operator Records, etc."
          title="Others"
        />
      </v-list-group>
      <v-list-item
        :to="{ name: 'Non-Stories' }"
        color="primary"
        prepend-icon="mdi-television-off"
        subtitle="Arts that have not appeared in the Stories"
        title="Non-Stories"
      />
      <v-list-item
        :to="{ name: 'All' }"
        color="primary"
        prepend-icon="mdi-all-inclusive"
        subtitle="May take a long time! "
        title="All Arts"
      />
      <v-list-item
        :to="{ name: 'About' }"
        color="primary"
        prepend-icon="mdi-information"
        title="About"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import PhantomLogo from './PhantomLogo.vue'

  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>
