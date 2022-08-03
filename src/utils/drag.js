const drag = (app, options) => {
  app.directive('drag', {
    onMounted (el, binding) {
      el.onmousedown = (event) => {
        // 记录鼠标按下的位置
        const mouseXStart = event.clientX
        const mouseYStart = event.clientY
        // 当前元素的位置
        const rectLeft = el.offsetLeft
        const rectTop = el.offsetTop
        // 鼠标移动
        document.onmousemove = (e) => {
          // 记录鼠标移动
          const mouseXEnd = e.clientX
          const mouseYEnd = e.clientY
          // 元素移动位置=元素初始位置+光标移动后的位置-光标点击时的初始位置
          let moveX = mouseXEnd - mouseXStart + rectLeft
          let moveY = mouseYEnd - mouseYStart + rectTop
          moveX = moveX <= 0 ? 0 : moveX >= innerWidth - el.offsetWidth ? innerWidth - el.offsetWidth : moveX
          moveY = moveY <= 0 ? 0 : moveY >= innerHeight - el.offsetHeight ? innerHeight - el.offsetHeight : moveY
          el.style.top = moveY + 'px'
          el.style.left = moveX + 'px'
        }
        // 鼠标抬起
        document.onmouseup = () => {
          // 取消事件
          document.onmousemove = null
        }
      }
    }
  })
}
export default drag
