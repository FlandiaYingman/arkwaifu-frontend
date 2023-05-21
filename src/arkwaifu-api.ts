import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

const BASE_URL = 'https://arkwaifu.cc/api/v0'

export const useApi = defineStore('api', () => {
  const groupsRef = shallowRef(new Map<string, Group>)
  const groups = computed(() => {
    if (storiesRef.value.size == 0) {
      fetch(`${BASE_URL}/avg/groups`)
        .then(response => response.json())
        .then((json: Group[]) => new Map(json.map(group => [group.id, group])))
        .then((map: Map<string, Group>) => groupsRef.value = map)
    }
    return groupsRef
  })

  const storiesRef = shallowRef(new Map<string, Story>)
  const stories = computed(() => {
    if (storiesRef.value.size == 0) {
      fetch(`${BASE_URL}/avg/stories`)
        .then(response => response.json())
        .then((json: Story[]) => new Map(json.map(story => [story.id, story])))
        .then((map: Map<string, Story>) => storiesRef.value = map)
    }
    return storiesRef
  })

  function getAssetUrl(asset: Asset, variant: 'img' | 'timg' | 'real-esrgan'): string {
    return `${BASE_URL}/asset/variants/${encodeURIComponent(asset.kind)}/${encodeURIComponent(asset.name)}/${encodeURIComponent(variant)}/file`
  }

  return { storiesRef, groupsRef, groups, stories, getAssetUrl }
})

export interface Group {
  id: string,
  name: string,
  type: 'MAINLINE' | 'ACTIVITY' | 'MINI_ACTIVITY' | 'NONE',
  stories: Story[]
}

export enum StoryTag {
  BeforeOperation = '行动前',
  AfterOperation = '行动后',
  Interludes = '幕间',
}

export interface Story {
  id: string,
  code: string,
  name: string,
  tag: StoryTag,
  groupID: string,
  assets: Asset[]
}

export interface Asset {
  name: string,
  kind: AssetKind,
}

export enum AssetKind {
  Images = 'images',
  Backgrounds = 'backgrounds',
  Characters = 'characters',
}
