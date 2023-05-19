<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event.target.value)"
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
            subtitle="Assets indexed by AVG"
            title="AVG"
            v-bind="props"
          />
        </template>
        <v-list-item
          :to="{ name: 'Main Story' }"
          prepend-icon="mdi-cube"
          subtitle="Main Story"
          title="Main Theme"
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
        :to="{ name: 'Non-AVG' }"
        color="primary"
        prepend-icon="mdi-television-off"
        subtitle="Assets that are not in AVG"
        title="Non-AVG"
      />
      <v-list-item
        :to="{ name: 'All' }"
        color="primary"
        prepend-icon="mdi-all-inclusive"
        subtitle="May take a long time! "
        title="All Assets"
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
