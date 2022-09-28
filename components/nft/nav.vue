<template>
  <div class="main-nav-wrap" flex="main:justify cross:center">
    <div class="main-nav-left" flex="main:left cross:center">
      <div class="main-nav-item text1" v-for="item in list" :key='item.url'>
        <!-- {{ $t(item.name)}} -->
        <nuxt-link class="text3" :to="`/${locale}${item.url}`">
          {{$t(item.name)}}
        </nuxt-link>
      </div> 
    </div>
    <div class="main-nav-right">
      <slot></slot>
    </div>
  </div>
</template>

<script> 

export default {
  data() {
    return {
      list: [
        {
          name: 'royalties.title',// this.$t('royalties.nav.dataCenter'), //'数据中心',
          url: '/royalties'
        },
        {
          name: 'nft.title',// this.$t('royalties.nav.dataCenter'), //'数据中心',
          url: '/nft'
        }, 
      ]
    }
  },
  computed: {
    locale() {
      return  this.$store.state.locale;
    }
  }
}
</script>

<style lang="less" scoped>
.main-nav-wrap {
  margin-top: 80px;
  height: 80px;
  .main-nav-item { 
    margin-right: 40px;
    font-family: 'Inter'; 
    font-weight: 600;
    font-size: 28px;
    line-height: 150%; 
    a {
      padding: 6px 0;
      &:hover {
        color: #0E0E0E;
      }
    }
    .nuxt-link-active { 
      color: #0E0E0E;
    }
  }
}




@media screen and (min-width: 1568px) {
  .main-nav-wrap {
    width: 1528px;
    margin: 80px auto 0;
  }
}

@media screen and (max-width: 1577px) {
  .main-nav-wrap {
    min-width: 900px;
    // padding: 0 20px 0px;
  }
}
</style>



