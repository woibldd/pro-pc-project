<template>
  <div class="BG0" id="indexBox">
    <Header></Header>
    <div class="bodycontent">
      <Nuxt />
    </div>
    <Footer class="indexFooter"></Footer>
  </div>

</template>
<script>
import Header from '../header.vue'
import Footer from '../footer.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'IndexPageLayout',
  data() {
    return {
      screenWidth: 0,
    }
  },
  components: {
    Header, Footer
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
#indexBox{
  min-height: 100vh;
}
.body_box,.bodycontent {
  width: 100%;
  min-height: 85vh;
}

@media screen and(max-width: 750px) {
  .indexFooter {
    padding-bottom: 120px !important;
  }
}
</style>
