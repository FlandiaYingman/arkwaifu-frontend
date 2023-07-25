import { defineStore } from 'pinia'
import { Art, Server, Variation } from '@/arkwaifu-api'
import { AggregatedCharacterArt, AggregatedPictureArt, Story, StoryGroup } from '@/arkwaifu-api'

export const useArkwaifu = defineStore('arkwaifu-api', () => {
  const api = import.meta.env.VITE_ARKWAIFU_API_BASE_URL ?? '/api/v1'
  const server = JSON.parse(localStorage.getItem('server') ?? 'null') ?? Server.CN

  function switchServer(newServer: Server) {
    if (newServer != server) {
      localStorage.setItem('server', JSON.stringify(newServer))
      location.reload()
    }
  }

  async function fetchStoryGroupsByType(type: string): Promise<StoryGroup[]> {
    return fetch(`${api}/${server}/story-groups?type=${type}`)
      .then((el) => el.json())
      .then((el) => el as any[])
      .then((el) => el.map((obj) => Object.assign(new StoryGroup(), obj)))
  }

  async function fetchStoryGroupByID(id: string): Promise<StoryGroup> {
    id = encodeURIComponent(id)
    return fetch(`${api}/${server}/story-groups/${id}`)
      .then((el) => el.json())
      .then((el) => Object.assign(new StoryGroup(), el))
  }

  async function fetchStoryByID(id: string): Promise<Story> {
    id = encodeURIComponent(id)
    return fetch(`${api}/${server}/stories/${id}`)
      .then((el) => el.json())
      .then((el) => Object.assign(new Story(), el))
  }

  async function fetchAggregatedPictureArt(id: string): Promise<AggregatedPictureArt> {
    const resp = await fetch(`${api}/${server}/aggregated-picture-arts/${id}`)
    const jsonObj = await resp.json()
    return Object.assign(new AggregatedPictureArt(), jsonObj)
  }

  async function fetchAggregatedCharacterArt(id: string): Promise<AggregatedCharacterArt> {
    id = encodeURIComponent(id)
    const resp = await fetch(`${api}/${server}/aggregated-character-arts/${id}`)
    const jsonObj = await resp.json()
    return Object.assign(new AggregatedCharacterArt(), jsonObj)
  }

  async function fetchArts(): Promise<Art[]> {
    const resp = await fetch(`${api}/arts`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsOfStoryGroup(groupID: string): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server}&group=${groupID}`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsOfStory(storyID: string): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server}&story=${storyID}`)
    const jsonObj = await resp.json()
    return jsonObj.map((el: any) => Object.assign(new Art(), el))
  }

  async function fetchArtsExceptForStoryArts(): Promise<Art[]> {
    const resp = await fetch(`${api}/arts?server=${server}&except-for-story-arts=true`)
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
