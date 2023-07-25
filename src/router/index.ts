import { createRouter, createWebHistory, type RouteRecordRaw, RouterView } from 'vue-router'

const DefaultView = () => import('@/layouts/default/DefaultView.vue')
const Home = () => import('@/views/Home.vue')
const StoriesView = () => import('@/views/StoriesView.vue')
const StoryGroupView = () => import('@/views/StoryGroupView.vue')
const StoryStoryView = () => import('@/views/StoryStoryView.vue')
const ArtView = () => import('@/views/ArtView.vue')
const NonStoriesView = () => import('@/views/NonStoriesView.vue')
const AllArtsView = () => import('@/views/AllArtsView.vue')
const About = () => import('@/views/About.vue')

const routes: Readonly<RouteRecordRaw[]> = [
  {
    // Static Routes
    path: '/',
    component: DefaultView,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
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
        path: 'non-stories',
        name: 'Non-Stories',
        component: NonStoriesView,
      },
      {
        path: 'all',
        name: 'All',
        component: AllArtsView,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
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
  history: createWebHistory(process.env.BASE_URL),
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
