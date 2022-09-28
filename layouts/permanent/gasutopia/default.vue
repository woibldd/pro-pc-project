<template>
  <div class="TimesFont">
    <Header></Header>
      <div class="bodycontent">
        <Nuxt />
      </div>
    <Footer></Footer>
  </div>

</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
export default {
  name: 'GASUtopiaLayout',
  components: {
    Header,Footer
  },
  mounted() {
     
  },
  methods: {
   
  },
}
</script>
<style lang="less" scoped>
.bodycontent{
  width: 100%;
  min-height: 100vh;
  background-color: #f6f2ef;
}
</style>
