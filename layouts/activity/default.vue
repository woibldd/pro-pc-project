<template>
  <div class="BG0"> 
    <Header></Header>   
    <div class="line bold"></div>
      <div class="bodycontent"> 
        <div class="wrap">
          <Nuxt /> 
        </div>
      </div>
    <div class="line bold"></div>
    <Footer></Footer>
  </div>

</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue' 
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      screenWidth: 0
    }
  },
  components: {
    Header,Footer
  },
  mounted() {
      this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
          return (() => {
              this.screenWidth = document.body.clientWidth
          })()
      }
  },
  methods: {
    ...mapMutations(['changeIsPC'])
  },
  watch: {
      screenWidth: {
          handler(val) {
              this.changeIsPC(val > 830)
          },
          immediate: true
      }
  }
}
</script>
<style lang="less" scoped>
.bodycontent{
  width: 100%;
  min-height: 100vh;
  background: #17171A;
  color: #fff;
  :deep(.ant-table-placeholder) {
    border: none;
  }
}
  .line {
    height: 1px;
    &.bold {
      height: 2px;
    }
    background: linear-gradient(87.9deg, #9C60FF 1.71%, #00E1FF 36.85%, #00DDA7 54.75%, #ECE4CC 76.06%, #FFEA2E 96.88%);
  }

@media screen and (min-width: 1568px) {
  .wrap {
    // width: 1528px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1577px)  {
  .bodycontent {
    // min-width: 900px;
    // padding: 0 20px 20px;
  }
}
</style>
