<template>
  <span ref="number"
    :data-time="time"
    class="number-grow"
    :data-value="value"> 0
  </span>
</template>
<script>
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { debounce } from '@/utils/throttle'
export default defineComponent({
  name: 'NumberGrow',
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      dafault: 0
    }
  },
  setup (props) {
    const number = ref(null)
    let oldValue = 0
    let timer = null
    const numberGrow = () => {
      const value = props.value - oldValue
      const step = (value * 10) / (props.time * 100)
      let current = 0
      let start = oldValue
      timer = setInterval(function () {
        start += step
        if (start > props.value) {
          clearInterval(timer)
          start = props.value
          timer = null
        }
        if (start === current) {
          return ''
        }
        current = parseInt(start)
        oldValue = current
        number.value.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
      })
    }
    const handleScroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll >= number.value.offsetTop - 400) { // 当前滚动位置到达testref的时候，显示div（100作为调整用）
        numberGrow()
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', debounce(handleScroll, 300, false))
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', () => {})
      clearInterval(timer)
    })
    return {
      number
    }
  }
})
</script>
