<template>
  <div class="not-found">
    <img src="@/assets/404.gif" alt="" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '404'
})
</script>
<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
}

</style>
