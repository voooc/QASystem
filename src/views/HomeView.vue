<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="home-banner">
      <carousel :list="list" :duration="5000" :autoPlay="true"/>
    </div>
    <chat
    :title="chatTitle"
    :subTitle="chatSubTitle"
    ></chat>
    <highlight></highlight>
    <Number></Number>
    <Footer></Footer>
  </div>
</template>

<script>
import chat from '@/components/chat/chat.vue'
import carousel from '@/components/carousel/carousel.vue'
import highlight from '@/components/highlight/index.vue'
import Navbar from '@/components/navbar/index.vue'
import Number from '@/components/count/index.vue'
import Footer from '@/components/footer/index.vue'
export default {
  name: 'home',
  components: {
    carousel,
    chat,
    highlight,
    Navbar,
    Number,
    Footer
  },
  setup () {
    const list = [
      {
        id: 1,
        imgUrl: require('@/assets/1.jpg'),
        headline: 'The following services are provided free of charge',
        para: ['Streamline Q&A', 'Knowledge map visualization']
      },
      {
        id: 2,
        imgUrl: require('@/assets/1.jpg'),
        headline: 'Welcome to Q&A system',
        para: ['Committed to more rapid and accurate identification and more effective problem solving']
      }
    ]
    const chatTitle = '小智'
    const chatSubTitle = '我是您的专属问答机器人'
    return {
      list,
      chatTitle,
      chatSubTitle
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  overflow: hidden;
}
.home-banner {
  width: 100%;
  height: 430px;
}
</style>
