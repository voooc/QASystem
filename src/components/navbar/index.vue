<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">QA</el-menu-item>
    <!-- <div class="flex-grow" /> -->
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="2">知识图谱</el-menu-item>
    <template v-if="!isLogin">
      <el-menu-item index="/login" class="login">登录</el-menu-item>
    </template>
    <template v-else>
      <el-avatar :src="circleUrl" class="login" />
    </template>
  </el-menu>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Navbar',
  setup () {
    const isLogin = ref(false)
    const activeIndex = ref('/')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    return {
      activeIndex,
      handleSelect,
      isLogin,
      circleUrl
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
