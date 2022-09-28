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
      <span>
        <span class="text1">{{$t('nft.text7')}}</span> 
        <a class="pointer activity-link" :href="link">
          {{$t('nft.text7-1')}}
        </a>
      </span>
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
    },
    link() {
      switch (this.locale) {
        case 'zh':
          return 'https://blog.bitkeep.io/zh/?p=1233' 
        case 'en':
          return 'https://blog.bitkeep.com/en/?p=1625' 
        case 'kr':
          return 'https://blog.bitkeep.com/kr/?p=1170'  
        default:
          return 'https://blog.bitkeep.com/en/?p=1625' 
      } 
    }
  },
  methods: {
    handleClick(url) {
      if (url == '/nft') {
        this.$Ta.track( {
            name:"My_Assets_Click", 
        })
      } 
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
  .activity-link {
    color: #974dff;
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
    padding: 0 20px 0px;
  }
}
</style>



