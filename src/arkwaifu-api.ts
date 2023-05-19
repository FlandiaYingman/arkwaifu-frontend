import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

const BASE_URL = 'https://arkwaifu.cc/api/v0'

export const useApi = defineStore('api', () => {
  const groups = shallowRef(new Array<Group>())
  const stories = shallowRef(new Array<Story>())
  const assets = shallowRef(new Array<Asset>())

  function getGroups() {
    if (groups.value.length == 0) {
      fetch(`${BASE_URL}/avg/groups`)
        .then(response => response.json())
        .then(json => groups.value = json)
    }
    return groups.value
  }

  return { groups, stories, assets, getGroups }
})

export interface Group {
  id: string,
  name: string,
  type: 'MAINLINE' | 'ACTIVITY' | 'MINI_ACTIVITY' | 'NONE',
  stories: Story[]
}

export interface Story {
  id: string,
  code: string,
  name: string,
  tag: string,
  groupId: string,
  assets: Asset[]
}

export interface Asset {
  name: string,
  kind: '行动前' | '行动后' | '幕间'
}
