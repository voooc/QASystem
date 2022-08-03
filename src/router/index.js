import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
import { authorization, refreshToken } from '@/api/index'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/IndexView.vue')
  },
  {
    path: '/activate',
    name: 'activate',
    component: () => import('../views/activate.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 注册全局前置守卫
router.beforeEach(async (to, from, next) => {
  const access = store.state.Jwt.access || ''
  const refresh = store.state.Jwt.refresh || ''
  if (access) { // 已登录
    console.log('已经登录')
    // 调用接口判断access是否失效
    const res = await authorization(access).then((data) => data).catch((err) => err)
    const code = res.status || ''
    if (code === 200) {
      next()
    } else {
      // 失效就使用刷新token
      console.log('使用刷新token')
      const res = await refreshToken(refresh).then((data) => data).catch((err) => err)
      const code = res.status || ''
      if (code === 200) {
        console.log('刷新成功...')
        store.commit('SetJwt', { access: res.data.access, refresh: refresh })
        next()
      } else {
        store.commit('SetJwt', '')
        next({ name: 'login' })
      }
    }
  } else { // 未登录
    // 如果去的页面是登陆页，直接跳到登陆页
    if (to.name !== 'home') {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
