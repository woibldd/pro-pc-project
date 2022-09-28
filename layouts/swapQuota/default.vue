<template>
  <div class="BG0">
    <Header></Header>
      <div class="bodycontent">
        <div class="wrap">
          <Nuxt /> 
        </div>
      </div>
    <Footer></Footer>
  </div>

</template>
<script>
import Header from '../header.vue'
import Footer from '../footer.vue'
import {mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      screenWidth: 0,
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
  padding-top: 64px;
  width: 100%;
  min-height: 100vh; 
}
.overflowbody{
  height: 100vh !important;
  overflow: hidden !important;
}

@media screen and (min-width: 1568px) {
  .wrap {
    width: 1528px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1576px) and (min-width: 821px) {
  .bodycontent {
    padding: 80px 20px 20px;
  }
}

@media screen and (max-width: 820px) and (min-width: 691px){
  .bodycontent {
    padding: 80px 20px 10px;
  }
}
@media screen and (max-width: 690px) {
  .bodycontent {
    padding: 45px 0 10px;
  }
}
 
</style>
