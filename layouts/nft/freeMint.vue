<template>
  <div class="BG0">
    <Header></Header>
      <div class="bodycontent">
        <Nuxt />
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
    ...mapMutations(['changeIsPC']),
    switchLang() {
      this.locale = this.locale ? 'zh-cn' : null
    }
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
  padding: 64px 0;
}
@media screen and (max-width: 1600px) {
    .bodycontent {
      padding: 64px 0px;
    }
}
</style>
