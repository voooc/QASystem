<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    :ellipsis="false"
  >
    <el-menu-item index="0">QA</el-menu-item>
    <el-menu-item index="/">首页</el-menu-item>
    <template v-if="store.state.User">
      <el-avatar :src="circleUrl" class="login" />
    </template>
    <template v-else>
      <el-menu-item index="/login" class="login">登录</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { defineComponent, ref } from 'vue'
import store from '@/store/index'
export default defineComponent({
  name: 'Navbar',
  setup () {
    const isLogin = ref(false)
    const activeIndex = ref('/')
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    return {
      activeIndex,
      isLogin,
      circleUrl,
      store
    }
  }
})
</script>

<style scoped lang="less">
.login {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
