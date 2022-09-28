<template>
  <div class="BG0"> 
    <Header></Header> 
    <Nav></Nav>
      <div class="bodycontent"> 
        <div class="wrap">
          <Nuxt /> 
        </div>
      </div>
    <Footer></Footer>
  </div>

</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import Nav from './nav.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      screenWidth: 0
    }
  },
  components: {
    Header,Footer,Nav
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
  min-width: 900px;
  min-height: 100vh;
  padding: 0 0 50px 0;
  /deep/ .ant-table-placeholder {
    border: none;
  }
}



@media screen and (min-width: 1568px) {
  .wrap {
    width: 1528px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1577px)  {
  .bodycontent {
    min-width: 900px;
    padding: 0 20px 20px;
  }
}
</style>
