<template>
  <div class="carousel"
  @mouseenter="stop()"
  @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item, i) in list"
      :key="item.id"
      :class="{fade: index===i}">
        <img :src="item.imgUrl" alt="#">
        <div class="content">
          <h2 style="width: 800px; font-size: 8;">{{item.headline}}</h2>
          <p v-for="(p, i) in item.para" :key="i">
            {{p}}
            <br/>
          </p>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">&lt;</a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">&gt;</a>
    <div class="carousel-indicator">
      <span v-for="(item,i) in list"
      :key="i"
      :class="{activate: index===i}"
      @click="index = i"
      ></span>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch, onUnmounted } from 'vue'
export default defineComponent({
  name: 'Carousel',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const index = ref(0)
    let timer = null
    // 自动播放
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value += 1
        if (index.value >= props.list.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 鼠标进入停止，移出开启自动
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.list.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 轮播图左右按钮切换效果
    const toggle = (step) => {
      index.value += step
      // 确定右侧临界值
      if (index.value >= props.list.length) {
        index.value = 0
        return
      }
      // 左侧临界值
      if (index.value < 0) {
        index.value = props.list.length - 1
      }
    }
    watch(() => props.list, (newVal) => {
      if (newVal.length > 1 && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    // 清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      index,
      stop,
      start,
      toggle
    }
  }
})
</script>
<style scoped lang="less">
.carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  border: 1px solid #ccc;
  text-decoration: none;
  touch-action: manipulation;
  overflow: hidden;
  transition: all 0.25s ease 0s;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      list-style: none;
      transition: all 0.25s ease 0s;
      &.fade {
        opacity: 1;
        z-index: 1;
        img {
          transform: scale(1.1);
          width: 100%;
          -ms-transform: scale(1.1);
          transform: scale(1.1);
          -webkit-transition: all 5000ms linear;
          -moz-transition: all 5000ms linear;
          -ms-transition: all 5000ms linear;
          -o-transition: all 5000ms linear;
          transition: all 5000ms linear;
        }
        .content {
          h2, p {
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
            -webkit-transition-delay: 1000ms;
            -moz-transition-delay: 1000ms;
            -ms-transition-delay: 1000ms;
            -o-transition-delay: 1000ms;
            transition-delay: 1000ms;
            text-align: center;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: -1;
      }
      .content {
        position: absolute;
        z-index: 1;
        display: inline;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h2,p {
          text-align: center;
          font-size: 50px;
          color: #fff;
          text-transform: capitalize;
          font-weight: 700;
          margin-bottom: 20px;
          -webkit-transform: translateX(-200%);
          -moz-transform: translateX(-200%);
          -ms-transform: translateX(-200%);
          -o-transform: translateX(-200%);
          transform: translateX(-200%);
          -webkit-transition: all 500ms ease;
          -moz-transition: all 500ms ease;
          -ms-transition: all 500ms ease;
          -o-transition: all 500ms ease;
          transition: all 500ms ease;
        }
        p {
          color: #fff;
          font-size: 24px;
          line-height: 1.8;
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 70px;
      height: 70px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border: 2px solid #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 70px;
      opacity: 0;
      font-size: 50px;
      text-decoration: none;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
