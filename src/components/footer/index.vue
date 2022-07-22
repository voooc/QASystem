<template>
  <footer>
    <div class="container">
      <div class="desc">
        <div class="title-desig">
          <h3>Xiaojuan Wang</h3>
          <h4>developer</h4>
        </div>
        <div class="testimonial-content">
          <p>Responsible for entity recognition based on Bert,
            entity linking and entity disambiguation,
            extracting relational words,
            design of Q&A system interface
          </p>
        </div>
        <div class="testimonial-img">
          <img src="@/assets/wxj.png" class="img-fluid" alt="testi-img" >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Footer'
})
</script>
<style lang="less" scoped>
footer {
  padding: 10px 40px;
  background-color: #87CEFA;
  text-align: center;
  .container {
    padding: 0 20px;
    margin: 0 auto;
    .desc {
      padding: 0 225px;
      .title-desig {
        margin-top: 10px;
      }
      .testimonial-content {
        margin-top: 10px;
        position: relative;
        top: 7px;
        p {
          font-size: 12px;
          word-wrap: break-word;
        }
      }
      .testimonial-img {
        width: 100px;
        height: auto;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
