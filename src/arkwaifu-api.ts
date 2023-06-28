import { defineStore } from 'pinia'
import { readonly } from 'vue'

const BASE_URL = (() => {
  if (import.meta.env.DEV) {
    console.log('App running in development mode, use localhost:7080 as the base url for API')
    return 'http://localhost:7080/api/v1'
  } else {
    return '/api/v1'
  }
})()

export enum Category {
  image = 'image',
  background = 'background',
  item = 'item',
  character = 'character'
}

export enum Server {
  CN = 'CN',
  EN = 'EN',
  JP = 'JP',
  KR = 'KR',
  // Taiwan server hasn't been implemented yet.
  // TW = 'TW'
}

export interface Art {
  id: string
  category: Category
  variants: Variant[]
}

export interface Variant {
  artID: string
  variation: string

  contentPresent: boolean
  contentPath: string
  contentWidth: number
  contentHeight: number
}

export interface StoryGroup {
  server: Server
  id: string
  name: string
  type: string
  stories: Story[]
}

export interface Story {
  server: Server
  id: string

  tag: string
  tagText: string
  code: string
  name: string
  info: string

  groupID: string

  pictureArts: PictureArt[]
  characterArts: CharacterArt[]
}

export interface StoryArt {
  server: Server
  id: string
  category: Category
  storyID: string
}

export interface PictureArt extends StoryArt {
  server: Server
  id: string
  category: Category
  storyID: string

  title: string
  subtitle: string
}

export interface CharacterArt extends StoryArt {
  server: Server
  id: string
  category: Category
  storyID: string

  names: string[]
}

export const useApi = defineStore('api', () => {
  const server = readonly(JSON.parse(localStorage.getItem('server') ?? 'null') ?? Server.CN)

  function switchServer(newServer: Server) {
    if (newServer != server) {
      localStorage.setItem('server', JSON.stringify(newServer))
      location.reload()
    }
  }

  async function fetchStoryGroupsByType(type: string): Promise<StoryGroup[]> {
    return fetch(`${BASE_URL}/${server}/story-groups?type=${type}`)
      .then(el => el.json())
      .then(el => (el as StoryGroup[]))
  }

  async function fetchStoryGroupByID(id: string): Promise<StoryGroup> {
    id = encodeURIComponent(id)
    return fetch(`${BASE_URL}/${server}/story-groups/${id}`)
      .then(resp => resp.json())
  }

  async function fetchStoryByID(id: string): Promise<Story> {
    id = encodeURIComponent(id)
    return fetch(`${BASE_URL}/${server}/stories/${id}`)
      .then(resp => resp.json())
  }

  async function fetchStoryArts(): Promise<StoryArt[]> {
    const resp = await fetch(`${BASE_URL}/${server}/arts`)
    return await resp.json()
  }

  function getArtContentURL(id: string, variation: string): string {
    id = encodeURIComponent(id)
    return `${BASE_URL}/arts/${id}/variants/${variation}/content`
  }

  async function fetchArts(): Promise<Art[]> {
    const resp = await fetch(`${BASE_URL}/arts`)
    return await resp.json()
  }

  async function fetchArtByID(id: string): Promise<Art> {
    id = encodeURIComponent(id)
    let resp = await fetch(`${BASE_URL}/arts/${id}`)
    return await resp.json()
  }

  return {
    server,
    switchServer,

    fetchStoryGroupsByType,
    fetchStoryGroupByID,
    fetchStoryByID,
    fetchStoryArts,

    fetchArts, fetchArtByID,

    getArtContentURL,
  }
})
