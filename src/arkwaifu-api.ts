import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_ARKWAIFU_API_BASE_URL ?? '/api/v1'

enum Server {
  CN = 'CN',
  EN = 'EN',
  JP = 'JP',
  KR = 'KR',
  // Taiwan server hasn't been implemented yet.
  // TW = 'TW'
}

class Art {
  id: string
  category: Category
  variants: Variant[]

  variant(variation: Variation): Variant {
    return this.variants.find(el => el.variation === variation)
  }
}

enum Category {
  Image = 'image',
  Background = 'background',
  Item = 'item',
  Character = 'character'
}

class Variant {
  artID: string
  variation: Variation

  contentPresent: boolean
  contentWidth: number
  contentHeight: number
}

enum Variation {
  Origin = 'origin',
  RealEsrganX4Plus = 'real-esrgan(realesrgan-x4plus)',
  RealEsrganX4PlusAnime = 'real-esrgan(realesrgan-x4plus-anime)',
  Thumbnail = 'thumbnail',
}

class StoryGroup {
  server: Server
  id: string
  name: string
  type: StoryGroupType
  stories: Story[]
}

enum StoryGroupType {
  MainStory = 'main-story',
  MajorEvent = 'major-event',
  MinorEvent = 'minor-event',
  Other = 'other',
}

class Story {
  server: Server
  id: string

  tag: StoryTag
  tagText: string
  code: string
  name: string
  info: string

  groupID: string

  pictureArts: PictureArt[]
  characterArts: CharacterArt[]
}

enum StoryTag {
  Before = 'before',
  After = 'after',
  Interlude = 'interlude',
}

class PictureArt {
  server: Server
  id: string
  category: Category
  storyID: string

  title: string
  subtitle: string
}

class CharacterArt {
  server: Server
  id: string
  category: Category
  storyID: string

  names: string[]
}

class AggregatedPictureArt {
  server: Server
  id: string
  category: Category

  title: string
  subtitle: string
}

class AggregatedCharacterArt {
  server: Server
  id: string
  category: Category

  names: string[]
}

export {
  Category,
  Server,
  Art,
  Variant,
  Variation,
  StoryGroup,
  StoryGroupType,
  Story,
  StoryTag,
  PictureArt,
  CharacterArt,
  AggregatedPictureArt,
  AggregatedCharacterArt,
}


export const useArkwaifu = defineStore('arkwaifu-api', () => {
  const server = JSON.parse(localStorage.getItem('server') ?? 'null') ?? Server.CN

  function switchServer(newServer: Server) {
    if (newServer != server) {
      localStorage.setItem('server', JSON.stringify(newServer))
      location.reload()
    }
  }

  async function fetchStoryGroupsByType(type: string): Promise<StoryGroup[]> {
    return fetch(`${BASE_URL}/${server}/story-groups?type=${type}`)
      .then(el => el.json())
      .then(el => el as any[])
      .then(el => el.map(obj => Object.assign(new StoryGroup, obj)))
  }

  async function fetchStoryGroupByID(id: string): Promise<StoryGroup> {
    id = encodeURIComponent(id)
    return fetch(`${BASE_URL}/${server}/story-groups/${id}`)
      .then(el => el.json())
      .then(el => Object.assign(new StoryGroup, el))
  }

  async function fetchStoryByID(id: string): Promise<Story> {
    id = encodeURIComponent(id)
    return fetch(`${BASE_URL}/${server}/stories/${id}`)
      .then(el => el.json())
      .then(el => Object.assign(new Story, el))
  }

  async function fetchAggregatedPictureArt(id: string): Promise<AggregatedPictureArt> {
    const resp = await fetch(`${BASE_URL}/${server}/aggregated-picture-arts/${id}`)
    const jsonObj = await resp.json<any>()
    return Object.assign(new AggregatedPictureArt, jsonObj)
  }

  async function fetchAggregatedCharacterArt(id: string): Promise<AggregatedCharacterArt> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${BASE_URL}/${server}/aggregated-character-arts/${id}`)
    const jsonObj = await resp.json<any>()
    return Object.assign(new AggregatedCharacterArt, jsonObj)
  }


  async function fetchArts(): Promise<Art[]> {
    const resp = await fetch(`${BASE_URL}/arts`)
    const jsonObj = await resp.json<any[]>()
    return jsonObj.map(el => Object.assign(new Art, el))
  }

  async function fetchArtsOfStoryGroup(groupID: string): Promise<Art[]> {
    const resp = await fetch(`${BASE_URL}/arts?server=${server}&group=${groupID}`)
    const jsonObj = await resp.json<any[]>()
    return jsonObj.map(el => Object.assign(new Art, el))
  }

  async function fetchArtsOfStory(storyID: string): Promise<Art[]> {
    const resp = await fetch(`${BASE_URL}/arts?server=${server}&story=${storyID}`)
    const jsonObj = await resp.json<any[]>()
    return jsonObj.map(el => Object.assign(new Art, el))
  }

  async function fetchArtsExceptForStoryArts(): Promise<Art[]> {
    const resp = await fetch(`${BASE_URL}/arts?server=${server}&except-for-story-arts=true`)
    const jsonObj = await resp.json<any[]>()
    return jsonObj.map(el => Object.assign(new Art, el))
  }

  async function fetchArtByID(id: string): Promise<Art> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${BASE_URL}/arts/${id}`)
    const jsonObj = await resp.json<any[]>()
    return Object.assign(new Art, jsonObj)
  }

  function contentSrcOf(id: string, variation: Variation): string {
    id = encodeURIComponent(id)
    return `${BASE_URL}/arts/${id}/variants/${variation}/content`
  }

  return {
    server,
    switchServer,

    fetchStoryGroupsByType,
    fetchStoryGroupByID,
    fetchStoryByID,
    fetchAggregatedPictureArt,
    fetchAggregatedCharacterArt,

    fetchArts,
    fetchArtsOfStoryGroup,
    fetchArtsOfStory,
    fetchArtsExceptForStoryArts,
    fetchArtByID,

    contentSrcOf,
  }
})
