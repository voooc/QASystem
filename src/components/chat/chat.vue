<template>
  <div class="chat-wrapper">
    <div class="chat-support-btn"
      v-drag
      draggable="true"
      v-show="openChat"
      @click="onCancel"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
      >
      <img src="@/assets/robotHead.png" style="background-color: white;">
    </div>
    <div class="chat-main"
      v-drag
      v-show="!openChat"
      draggable="true"
      style="background-color: white;">
      <div class="chat-header">
        <i class="chat-close" @click="onCancel">|</i>
        <div class="chat-service-info">
          <a class="chat-service-img"></a>
          <div class="chat-service-title">
            <p class="chat-service-name">{{title}}</p>
            <p class="chat-service-detail">{{subTitle}}</p>
          </div>
        </div>
      </div>
      <div class="chat-contain"
      ref="chatContainer">
      </div>
      <div class="chat-submit">
        <div @mouseenter="isMouseOnSerchBox = true"
            @mouseleave="isMouseOnSerchBox = false">
           <div v-show="isFocus && !isEmpty" class="suggest-history-box">
            <div class="suggestions" v-for="(list,index) in suggestionList.lists.slice(0, 6)"
              :key="index"
              @click="checkToSearch(list)"
            >
              <div class="suggestion-item" >{{list}}</div>
            </div>
          </div>
          <div v-show="isFocus && isEmpty" class="suggest-history-box">
            <div class="history-suggestion-title">
              <div>搜索历史</div>
              <div class="history-clear">
                <div style="width: 80px;" @click="clearHistory()">清空</div>
              </div>
            </div>
            <div class="suggestions history-suggestion"
            v-for="(historyList,index) in historyLists.value.slice(0, 6)"
            :key="index" ref="historyList"
            @click="checkToSearch(historyList)">
              <div class="suggestion-item">{{historyList}}</div>
            </div>
          </div>
        </div>
        <p class="chat-hint" v-show="emptyShow">
          <span class="chat-hint-icon">!</span>
          <span class="chat-hint-text">发送内容不能为空</span>
        </p>
        <input
          @focus="focusShow"
          @blur="blurShow"
          @keyup.enter="submit"
          class="chat-input-text"
          type="text"
          placeholder="请输入您的疑问，然后按Enter键发送。"
          v-model="searchQuery"
        />
        <div class="chat-input-tools">
          <button class="chat-input-button" @click="submit" style="right: 75px;">发送</button>
          <button class="chat-close-button" @click="onCancel">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { defineComponent, ref, watchEffect, reactive, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/throttle'
import { getSearchResult, getSearchSuggest } from '@/api'
import store from '@/store'
export default defineComponent({
  name: 'chat',
  props: {
    title: {
      type: String,
      default: '小智'
    },
    subTitle: {
      type: String,
      default: '我是您的专属问答机器人'
    }
  },
  setup () {
    const openChat = ref(true)
    const openPropmpt = ref(false)
    const emptyShow = ref(false)
    const isMouseOnSerchBox = ref(false)
    const searchQuery = ref('')
    const isFocus = ref(false)
    const chatContainer = ref(null)
    // 搜索建议为空
    const isEmpty = ref(true)
    const suggestionList = reactive({
      lists: []
    })
    // 历史记录
    const historyLists = reactive({
      value: []
    })
    // 检测输入值，确定建议搜索
    watchEffect(async () => {
      if (searchQuery.value !== '') {
        const suggest = await getSearchSuggest(searchQuery.value)
        suggestionList.lists = suggest.filter((item) => {
          return item.toString().indexOf(searchQuery.value) !== -1
        })
      } else {
        suggestionList.lists = []
      }
      if (suggestionList.lists.length !== 0) {
        isEmpty.value = false
      } else {
        isEmpty.value = true
      }
    })
    // 创建发送信息框
    const createInfo = (name, value) => {
      let chatTime = new Date()
      chatTime = chatTime.toLocaleTimeString()
      const nodeP = document.createElement('p')
      const nodeSpan = document.createElement('span')
      const nodeTime = document.createElement('p')
      nodeP.classList.add('chat-' + name + '-contain')
      nodeSpan.classList.add('chat-' + name + '-text', 'chat-text')
      nodeTime.classList.add('chat-time')
      nodeSpan.innerHTML = value
      nodeTime.innerHTML = chatTime
      nodeP.appendChild(nodeTime)
      nodeP.appendChild(nodeSpan)
      chatContainer.value.appendChild(nodeP)
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
    // 发送信息
    let timer = null
    const sendMessage = async () => {
      if (searchQuery.value !== '') {
        createInfo('you', searchQuery.value)
        const response = await getSearchResult(searchQuery.value)
        createInfo('service', response.data.answer)
        store.commit('SetSearchValue', searchQuery.value)
        searchQuery.value = null
        blurShow()
      } else {
        emptyShow.value = true
        timer = setTimeout(function () {
          emptyShow.value = false
        }, 1000)
      }
    }
    // 清除历史记录
    const clearHistory = () => {
      historyLists.value = []
      localStorage.removeItem('historyList')
    }
    // 发送
    const submit = () => {
      sendMessage()
    }
    const checkToSearch = (value) => {
      searchQuery.value = value
      submit()
    }
    // 关闭聊天框
    const onCancel = () => {
      openChat.value = !openChat.value
    }
    // 鼠标移入：打开消息提示
    const mouseOver = debounce(() => {
      openPropmpt.value = true
    }, 1000, true)
    // 鼠标移出：关闭消息提示
    const mouseLeave = debounce(() => {
      openPropmpt.value = false
    }, 1000, true)
    // 焦点
    const focusShow = () => {
      isFocus.value = true
    }
    // 失焦 一个重点：判断此时鼠标此时在搜索建议框内，如果移走，则点击消失，否则就点击就触发对应的事件
    const blurShow = () => {
      if (!isMouseOnSerchBox.value) {
        isFocus.value = false
      } else {
        isMouseOnSerchBox.value = false
      }
    }
    onMounted(() => {
      createInfo('service', '您好,请说出您的疑问')
      // 如果本地存储的数据historyList有值，直接赋值给data中的historyList
      if (JSON.parse(localStorage.getItem('historyList'))) {
        historyLists.value = JSON.parse(localStorage.getItem('historyList'))
      }
    })
    onUnmounted(() => {
      clearTimeout(timer)
    })
    return {
      openChat,
      openPropmpt,
      onCancel,
      mouseOver,
      mouseLeave,
      emptyShow,
      searchQuery,
      isFocus,
      focusShow,
      isEmpty,
      blurShow,
      suggestionList,
      historyLists,
      submit,
      checkToSearch,
      chatContainer,
      clearHistory,
      isMouseOnSerchBox
    }
  }
})
</script>
<style lang="less">
.chat-support-btn {
  position: fixed;
  display: inline-block;
  top: 85%;
  right: 5%;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  cursor:pointer;
  z-index: 30;
  &:active {
    cursor: grabbing;
  }
  .header-info-div{
    width:200px;
    height:77px;
    position: absolute;
    left: -210px;
    border-radius:4px;
    background-color: white;
    padding: 10px;
    .header-info-span{
      margin-top: 15px;
    }
  }
  img {
    position:absolute;
    border-radius:50%;
    width: 100%;
    height: 100%;
  }
}
/* 对话框*/
.chat-main {
  position: fixed;
  right: 100px;
  top: 30px;
  width: 500px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  z-index: 11;
  text-align: left;
  font-size: 14px;
  color: #fff;
  .chat-header {
    position: relative;
    padding: 10px;
    height: 60px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    background: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);;
    .chat-close {
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 2px;
      font-size: 22px;
      transform: rotate(90deg);
      cursor: pointer;
      z-index: 11;
    }
    .chat-service-info {
      position: relative;
      top: 50%;
      margin-top: -20px;
      height: 40px;
      .chat-service-img {
        display: inline-block;
        margin: 0 10px 0 20px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        vertical-align: middle;
        background-color: rgb(252, 247, 247);
        border-radius: 50%;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
        background-image: url("@/assets/robotHead.png");
        background-size:100% 100%;
      }
      .chat-service-title {
        display: inline-block;
        vertical-align: middle;
        .chat-service-detail {
          font-size: 12px;
        }
      }
    }
    a:hover {
      cursor: pointer;
    }
  }
  .chat-contain {
    overflow-y: auto;
    height: 260px;
    word-wrap: break-word;
    background-color: #f9f9f9;
    color: #000;
    padding-top: 5px;
    .chat-time{
      color:#939393;
      font-size:12px;
    }
    .chat-text {
      display: inline-block;
      position: relative;
      padding: 7px;
      max-width: 450px;
      color:black;
      white-space: pre-wrap;
      border: 1px solid rgb(211,211,208,0.3);
      border-radius: 4px;
      background-color: rgb(211,211,208,0.3);
      box-sizing: border-box;
    }
    .chat-service-contain {
      margin-bottom: 10px;
      text-align: left;
      .chat-time{
        margin:0 0 0 37px;
      }
      .chat-service-text {
        margin-left:40px;
        font: 12px;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left:-40px;
          width:35px;
          height:36px;
          border:1px solid transparent;
          background-image: url("@/assets/robotHead.png");
          background-size:100% 100%;
          border-radius:50%;
          -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }
      }
    }
    .chat-you-contain {
      margin-bottom: 10px;
      text-align: right;
      .chat-time{
        margin:0 20px 0 0;
      }
      .chat-you-text {
        margin-right: 20px;
        text-align:left;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          right: -10px;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid rgb(211,211,208,0.3);
          -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }
      }
    }
  }
  /*客服对话框底部与输入*/
  .chat-submit {
    position: relative;
    height: 100px;
    color: #000;
    word-wrap: break-word;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    background-color: #f9f9f9;
    .suggest-history-box {
      position: absolute;
      background-color: #fff;
      bottom: 101px;
      left: 3%;
      right: 0;
      width: 80%;
    }
    .suggestions{
      width: 86%;
      margin: 0 auto;
      border-bottom: 0.5px solid #dddddd;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: .6rem 1rem;
      color: #666666;
      font-size: .8rem;
      &:last-child {
          border: none;
        }
    }
    .history-suggestion-title {
      font-size: .8rem;
      color: #aaaaaa;
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin: 1rem 1.5rem;
      position: relative;
      justify-content: space-between;
      .history-clear {
        font-size: .68rem;
        display: flex;
        flex-direction: row;
      }
    }
    .history_suggestion {
      font-size: 1rem;
    }

    /*空输入提示*/
    .chat-hint {
      position:absolute;
      top: -15px;
      left: 20px;
      padding: 2px;
      width: 140px;
      height: 18px;
      font-size: 12px;
      text-align: center;
      line-height: 18px;
      border: 1px solid #ddd;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, .4);
      background-color: #fff;
      .chat-hint-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        font-size: 14px;
        font-style: italic;
        font-weight: 700;
        vertical-align: middle;
        line-height: 18px;
        color: #fff;
        border-radius: 50%;
        background-color: #5d94f3
      }
      .chat-hint-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
    /*输入框*/
    .chat-input-text {
      overflow-y: auto;
      display: inline-block;
      padding: 5px 10px;
      width: 100%;
      height: 80%;
      vertical-align: middle;
      white-space: pre-wrap;
      word-wrap: break-word;
      resize: none;
      box-sizing: border-box;
      background-color: #f9f9f9;
    }
    .chat-input-tools {
      width: 100%;
      height: 20%;
      vertical-align: middle;
      text-align: right;
      background-color: #f9f9f9;
      position: relative;
      button{
        position: absolute;
        bottom: 0;
        right: 0;
        width:62px;
        height:28px;
        border-radius:4px;
        background-color: #9c9898;
        margin:5px 2px;
        border: none;
        &:hover{
          cursor:pointer;
        }
      }
    }
  }
}

</style>
