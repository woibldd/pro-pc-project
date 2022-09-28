<template>
  <div class="BG0 body_box">
    <Header />
      <div class="bodycontent">
        <Nuxt />
      </div>
    <Footer></Footer>
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
  beforeMount(){

    this.screenWidth = document.body.clientWidth;
  },
  mounted(){
    this.screenWidth = document.body.clientWidth;
    this.$nextTick(() => {
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth;
        }
    })
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
.bodycontent {
    width: 100%;
    min-height: 100vh;
    padding: 0px 0px 0px 0px;
}
  @media only screen  and (min-width: 830px) and (max-width: 1000px) {
    .body_box{
      width: 1000px;
    }
    .bodycontent{
      width: 1000px;
      min-width: 830px;
    }
  }
</style>
