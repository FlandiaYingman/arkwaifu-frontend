import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router'

const DefaultView = () => import('@/layouts/default/DefaultView.vue')
const Home = () => import('@/views/Home.vue')
const AvgView = () => import('@/views/AvgView.vue')
const AvgGroupView = () => import('@/views/AvgGroupView.vue')
const AvgStoryView = () => import('@/views/AvgStoryView.vue')
const AssetView = () => import('@/views/AssetView.vue')
const NonAvgView = () => import('@/views/NonAvgView.vue')
const AllAssetsView = () => import('@/views/AllAssetsView.vue')
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
        path: 'avg',
        component: RouterView,
        children: [
          // Static Routes
          {
            path: 'main-story',
            name: 'Main Story',
            component: AvgView,
            props: { type: 'MAINLINE' },
          },
          {
            path: 'major-events',
            name: 'Major Events',
            component: AvgView,
            props: { type: 'ACTIVITY' },
          },
          {
            path: 'minor-events',
            name: 'Minor Events',
            component: AvgView,
            props: { type: 'MINI_ACTIVITY' },
          },
          {
            path: 'others',
            name: 'Others',
            component: AvgView,
            props: { type: 'NONE' },
          },

          // Dynamic Routes
          {
            path: 'groups/:id',
            name: 'Group',
            component: AvgGroupView,
            props: true,
          },
          {
            path: 'stories/:id',
            name: 'Story',
            component: AvgStoryView,
            props: true,
          },
        ],
      },
      {
        path: 'non-avg',
        name: 'Non-AVG',
        component: NonAvgView,
      },
      {
        path: 'all',
        name: 'All',
        component: AllAssetsView,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
      {
        name: 'Asset',
        path: 'assets/:kind/:name',
        component: AssetView,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
