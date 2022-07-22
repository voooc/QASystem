<template>
  <div class="count">
    <div class="container">
      <div class="single-counter" v-for="(item, index) in data" :key="index">
        <div class="count-number">
          <NumberGrow :value="item.number" :time='30'></NumberGrow>
          +
        </div>
        <div class="count-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import NumberGrow from './NumberGrow.vue'
export default defineComponent({
  name: 'Count',
  components: {
    NumberGrow
  },
  setup () {
    const data = reactive([
      {
        number: 4127378298,
        name: 'Entity'
      },
      {
        number: 434342346,
        name: 'Realation'
      }
    ])
    return {
      data
    }
  }
})
</script>
<style lang="less" scoped>
  .count {
    padding:70px 0;
    text-align: center;
    .container {
      display: flex;
      justify-content: space-evenly;
      .count-number {
        color: #090909;
        font-size: 30px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        .counter {
          word-break:break-all;
        }
      }
      .count-name {
        font-size: 20px;
        color: #090909;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
  }
</style>
