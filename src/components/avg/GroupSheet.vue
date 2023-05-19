<template>
  <!-- the height is an estimated value for lazy load -->
  <v-lazy :min-height="72 + 16 * 2 + group.stories.length * 120 / 6">
    <v-container>
      <p :id="group.id" class="text-h5"><a :href="`#${group.id}`" class="text-black text-decoration-none">§</a>
        {{ group.name }}</p>
      <p class="text-caption text-medium-emphasis">{{ group.type }}</p>
      <p class="text-caption text-medium-emphasis">{{ group.id }}</p>
      <v-row class="mx-1 my-2">
        <v-col class="v-col-2">
          <group-card :group="group" />
        </v-col>
        <v-col v-for="story in group.stories" class="v-col-2">
          <story-card :story="story" />
        </v-col>
      </v-row>
    </v-container>
  </v-lazy>
</template>

<script setup lang="ts">
  import { Group } from '@/arkwaifu-api'
  import StoryCard from '@/components/avg/StoryCard.vue'
  import GroupCard from '@/components/avg/GroupCard.vue'

  defineProps<{ group: Group }>()
</script>


