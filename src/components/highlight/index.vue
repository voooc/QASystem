<template>
  <div class="paper">
    <div class="container">
      <div class="section-title">
        <h4>Q & A System</h4>
        <h3>WHY US?</h3>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="card"
          v-for="item in data"
          :key="item.id"
          @mouseenter="hover"
          @mouseover="move"
          @mouseleave="leave"
        >
          <div class="content">
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'highlight',
  setup () {
    const data = reactive([
      {
        id: 1,
        title: 'Highlights One',
        content: '利用neo4j图数据库进行数据存储构建了具有百万实体\n千万关系的知识图谱'
      },
      {
        id: 2,
        title: 'Highlights Two',
        content: '基于BERT-BiLSTM-CRF的NER模型\n基于BERT字向量单属性匹配模型\n基于DFA-词性过滤和字向量相似度'
      },
      {
        id: 3,
        title: 'Highlights Three',
        content: '对话形式的实时交互问答界面'
      }
    ])
    const move = (e) => {
      const tartget = e.currentTarget
      window.requestAnimationFrame(function () {
        const max = 15
        const box = tartget.getBoundingClientRect()
        let calcX = Math.min(Math.max((e.clientX - box.left) / box.width, 0), 1)
        let calcY = Math.min(Math.max((e.clientY - box.top) / box.height, 0), 1)
        calcX = (max - calcX * max * 2).toFixed(2)
        calcY = (calcY * max * 2 - max).toFixed(2)
        tartget.style.transform = 'perspective(1000px)' +
          ' rotateX(' + calcY + 'deg) ' +
          'rotateY(' + calcX + 'deg) ' +
          'scale3d(1, 1, 1)'
      })
    }
    const hover = (e) => {
      const element = e.currentTarget.firstElementChild
      element.style.opacity = 1
    }
    const leave = (e) => {
      const temp = e.currentTarget
      window.requestAnimationFrame(function () {
        temp.style.transform = 'rotateX(0) rotateY(0)'
      })
      const element = e.currentTarget.firstElementChild
      element.style.opacity = 0
    }
    return {
      data,
      move,
      leave,
      hover
    }
  }
})
</script>
<style lang="less" scoped>
.paper {
  padding-bottom: 70px;
  padding-top: 100px;
  background:#87CEFA;
  opacity: 0.7;
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin:0 auto;
    .section-title {
      display: inline-block;
      h4 {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 15px;
      }
      h3 {
        font-size: 50px;
        font-weight: 700;
        line-height: 49px;
        text-transform: uppercase;
      }

    }
    .row {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 1200px;
      z-index: 1;
      transform-style: preserve-3d;
      .card {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 30px;
        box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.7);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        transform-style: preserve-3d;
        transition: all .1s;
        .content {
          height: 80%;
          padding: 25px 20px;
          text-align: center;
          opacity: 0;
          transition: 0.5s;
          color: black;
          h3 {
            font-size: 1.2em;
            z-index: 1;
          }
          p {
            margin-top: 27px;
            font-size: 12px;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1170px;
    }
  }
</style>
