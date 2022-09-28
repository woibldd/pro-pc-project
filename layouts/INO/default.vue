<template>
  <div class="BG0 body_box">
    <Header />
      <div class="bodycontent">
        <Nuxt />
      </div>
    <Footer :class="!isPC && (pathName == $route.path) ?  'footerBox' : ''"></Footer>
  </div>
</template>
<script>
import {mapMutations } from 'vuex'
import Header from '../header.vue'
import Footer from '../footer.vue'
export default {
  name: 'SwapLayout',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isPC:this.$store.state.isPC,
      screenWidth:0,
      pathName:'/' + this.$store.state.locale + '/INO/INODeatil'
    }
  },
  watch: {
      screenWidth: {
        handler(val) {
            this.changeIsPC(val > 830)
            this.isPC =  val > 830;
        },
        immediate: true
      },
  },
  mounted(){
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
          // this.initswiper()
    }
  },
  methods: {
     ...mapMutations(['changeIsPC']),
    switchLang() {
      this.locale = this.locale ? 'zh-cn' : null
    }
  }
}
</script>
<style lang="less" scoped>
.body_box{
  min-height: 100vh;
}
.bodycontent {
    width: 100%;
    min-height: 100vh;
    padding: 64px 0px;
}
@media screen and (max-width: 820px) {
    .bodycontent {
        padding: 64px 0px;
    }
}
.footerBox{
  padding: 20px 0 126px 0 !important;
}
</style>
