import { defineStore } from 'pinia'
import { AggregatedCharacterArt, AggregatedPictureArt, Art, Server, Story, StoryGroup, Variation } from '@/arkwaifu-api'
import { type Ref, ref } from 'vue'

export const useArkwaifu = defineStore('arkwaifu-api', () => {
  const api = import.meta.env.VITE_ARKWAIFU_API_BASE_URL ?? '/api/v1'

  const server: Ref<Server> = (() => {
    const localServer = localStorage.getItem('server')
    if (localServer) {
      return ref(JSON.parse(localServer))
    } else {
      return ref(Server.CN)
    }
  })()

  function switchServer(newServer: Server) {
    server.value = newServer
  }

  async function fetchStoryGroupsByType(type: string): Promise<StoryGroup[]> {
    const resp = await fetch(`${api}/${server.value}/story-groups?type=${type}`)
    const jsonObj: any[] = await resp.json()
    return jsonObj.map((el) => Object.assign(new StoryGroup(), el))
  }

  async function fetchStoryGroupByID(id: string): Promise<StoryGroup> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${api}/${server.value}/story-groups/${id}`)
    const jsonObj: any = resp.json()
    return Object.assign(new StoryGroup(), jsonObj)
  }

  async function fetchStoryByID(id: string): Promise<Story> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${api}/${server.value}/stories/${id}`)
    const jsonObj: any = resp.json()
    return Object.assign(new Story(), jsonObj)
  }

  async function fetchAggregatedPictureArt(id: string): Promise<AggregatedPictureArt> {
    const resp = await fetch(`${api}/${server.value}/aggregated-picture-arts/${id}`)
    const jsonObj = await resp.json()
    return Object.assign(new AggregatedPictureArt(), jsonObj)
  }

  async function fetchAggregatedCharacterArt(id: string): Promise<AggregatedCharacterArt> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${api}/${server.value}/aggregated-character-arts/${id}`)
    const jsonObj = await resp.json()
    return Object.assign(new AggregatedCharacterArt(), jsonObj)
  }

  async function fetchArts(): Promise<Art[]> {
    const resp = await fetch(`${api}/arts`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsOfStoryGroup(groupID: string): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server.value}&group=${groupID}`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsOfStory(storyID: string): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server.value}&story=${storyID}`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsExceptForStoryArts(): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server.value}&except-for-story-arts=true`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtByID(id: string): Promise<Art> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${api}/arts/${id}`)
    const jsonObj = await resp.json()
    return Object.assign(new Art(), jsonObj)
  }

  function contentSrcOf(id: string, variation: Variation): string {
    id = encodeURIComponent(id)
    return `${api}/arts/${id}/variants/${variation}/content`
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
