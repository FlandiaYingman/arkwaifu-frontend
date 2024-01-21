import { createRouter, createWebHistory, type RouteRecordRaw, RouterView } from 'vue-router'

const DefaultView = () => import('@/layouts/default/DefaultView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const StoriesView = () => import('@/views/story/StoriesView.vue')
const StoryGroupView = () => import('@/views/story/StoryGroupView.vue')
const StoryStoryView = () => import('@/views/story/StoryStoryView.vue')
const ArtView = () => import('@/views/art/ArtView.vue')
const GalleriesView = () => import('@/views/gallery/GalleriesView.vue')
const GalleryView = () => import('@/views/gallery/GalleryView.vue')
const AboutView = () => import('@/views/AboutView.vue')

const routes: Readonly<RouteRecordRaw[]> = [
  {
    // Static Routes
    path: '/',
    component: DefaultView,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'story',
        component: RouterView,
        children: [
          // Static Routes
          {
            path: 'main-stories',
            name: 'Main Stories',
            component: StoriesView,
            props: { type: 'main-story' },
          },
          {
            path: 'major-events',
            name: 'Major Events',
            component: StoriesView,
            props: { type: 'major-event' },
          },
          {
            path: 'minor-events',
            name: 'Minor Events',
            component: StoriesView,
            props: { type: 'minor-event' },
          },
          {
            path: 'others',
            name: 'Others',
            component: StoriesView,
            props: { type: 'other' },
          },

          // Dynamic Routes
          {
            path: 'groups/:id',
            name: 'Group',
            component: StoryGroupView,
            props: true,
          },
          {
            path: 'stories/:id',
            name: 'Story',
            component: StoryStoryView,
            props: true,
          },
        ],
      },
      {
        path: 'galleries',
        name: 'Galleries',
        component: GalleriesView,
      },
      {
        path: 'galleries/:id',
        name: 'Gallery',
        component: GalleryView,
        props: true,
      },
      {
        path: 'about',
        name: 'About',
        component: AboutView,
      },
      {
        path: 'arts/:id',
        name: 'Art',
        component: ArtView,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from) => {
    const dynamicRouteNames = ['Group', 'Story', 'Art']
    if (dynamicRouteNames.includes(<string>to.name) && dynamicRouteNames.includes(<string>from.name)) {
      return false
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
