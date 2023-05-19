import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router'

const Home = () => import( '@/views/Home.vue')
const AvgView = () => import( '@/views/AvgView.vue')
const AssetView = () => import( '@/views/AssetView.vue')
const About = () => import( '@/views/About.vue')
const DefaultView = () => import( '@/layouts/default/View.vue')

const routes: Readonly<RouteRecordRaw[]> = [
  {
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
        ],
      },
      {
        path: 'non-avg',
        name: 'Non-AVG',
        component: AssetView,
      },
      {
        path: 'all',
        name: 'All',
        component: AssetView,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
