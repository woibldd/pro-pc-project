<template>
  <div class="BG0">
    <Header/>
      <div>
        <Nuxt />
      </div>
  </div>
</template>
<script>
import Header from './header.vue'
export default {
  name: 'SwapLayout',
  components: {
    Header
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>

</style>
