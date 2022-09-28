<template>
  <div class="nft-wrap">
    <Nav>
      <div class="assets-top-right">
        <button @click="handleClickMyOrder" class="nav-btn text1 pointer">{{$t('nft.myOrder')}}</button>
      </div>
    </Nav>
    <div class="nft-assets-wrap">
      <div v-if="!WalletID && !loading">
        <Connect ref="myconnect"></Connect>
      </div>
      <div v-else>
        <div class="assets-top" flex="main:justify">
          <div class="assets-top-left" flex="main:left cross:top"> 
            <label class="text2">{{$t('nft.assets.total')}} {{list.length}}</label>
          </div>
          <div class="assets-top-right" flex="cross:bottom"> 
          </div>
        </div>
        <div > 
          <div v-if="loading" class="loading-box">
            <a-spin size="large"></a-spin>
          </div>
          <div v-else class="assets-list" >
            <div class="nft-series-item" v-for="item in list" :key="item.contract">
              <card-assets :info="item" @click="handleCardClick(item)"/>
            </div>  
          </div> 
        </div> 
      </div>
    </div> 
  </div>
</template>

<script>
import CardAssets from '@/components/nft/CardAssets'
import Nav from '@/components/nft/nav'
import Connect from '@/components/nft/connect'
import { Spin } from 'ant-design-vue' 
import Vue from 'vue'   

Vue.use(Spin)
export default {
  layout: 'nft/assets', 
  components: {
    CardAssets,
    Connect,
    Nav
  },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: { 
    WalletID() {
      return this.$store.state.WalletID
    },
    addressx() {
      return this.$store.state.address
    },

  },
  watch: {
    "$store.state.WalletID": function (newVal, oldVal) { 
      this.getList()
    },
    "$store.state.chainId": function (newVal, oldVal) { 
      this.getList()
    }
  },
  methods: {
    handleClickMyOrder() {
      if (this.WalletID) {
        this.goPath('/nft/orders')
      } else {
        // this.$refs.myconnect.handleConnectClick()
        this.$message.warn(this.$t('nft.linkWallet'))
      }
    },
    goPath(path) {
      const { language } = this.$route.params
      this.$router.push({
        path: '/'+ language + path  
      })
    },
    handleCardClick(item){  
      this.goPath(`/nft/series?chain=${item.chain}&contract=${item.contract}`)

    },
    getChainName(chinid) { 
      switch (chinid) {
        case "0x80":
          return "HT";
        case "0x42":
          return "OKT";
        case "0x38":
          return "BNB";
        case "0x89":
          return "MATIC";
        case "0xa86a":
          return "AVAX";
        case "0xfa":
          return "FTM";
        case "0xa4b1":
          return "ARBITRUM";
        case "0x141":
          return "KCC";
        case "0x7a":
          return "FUSE";
        case "0x1":
          return "ETH";
        case "0x2019":
          return "KLAY";
        case "0xa":
          return "OP";
        case "0x120":
          return "BOBA";
        case "0xc7":
          return "BTT";
        default:
          return "ETH";
      }
    },
    async getList() {  
      // console.log('getList')
      const { chainId, address } = this.$store.state
      // console.log({ chainId, address })
      if (!chainId || !address || this.loading) {
        return
      }
      this.loading = true 
      let chainName = this.getChainName(chainId).toLowerCase()
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bnb'
      // } else if (chainId == '0x89') {
      //   chainName='matic'
      // }   

      const params = {
        address,  
        chain: chainName 
      } 
      //测试数据
      //chain=matic&address=0xe2A2669ae5819bBfA2bd4022a7DCC9f16ba3086d
      // params.address = '0xe2A2669ae5819bBfA2bd4022a7DCC9f16ba3086d'
      // params.chain='matic'
      try {  
        const {data, status} = await this.$api.nft.getMyCollections(params)  
        if (status==0) { 
          this.list = data.list || []
        } else {
          this.list = []
        }
        this.loading = false
      } catch (error){ 
        console.error(error) 
        this.list = []
        this.loading = false
      }
    },
    setTheme(theme) {
      this.$cookies.set('bitkeep_theme', theme)
      const theme_Local = theme == 'dark' ? 'theme-dark' : 'theme-light'
      document.getElementsByTagName("body")[0].setAttribute("class", theme_Local);
    },
  },
  created() {
    // console.log('asdf')
  },
  mounted() { 
    this.$nextTick(() => { 
      this.setTheme('light') 
    })   
    this.getList() 
  }
}

</script>

<style lang="less">
.nft-assets-wrap {
  .assets-top {
    .assets-top-left {
      .title {
        font-size: 40px;
        font-weight: 600;
        line-height: 150%;
        label {
          margin-left: 15px;
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
        }
      }
    }
    .assets-top-right {
      padding-bottom: 11px;
      button {
        
      }
    }
  }
  .loading-box {
    margin-top: 180px;
    text-align: center;
  }
  .assets-list {
    display: grid;
    margin-top: 20px;
    margin-bottom: 163px;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    // gap: 20px;
  }
}

.nft-wrap {
  .nav-btn {
    padding: 6.5px 14px;
    border: 1px solid #F2F2F5;
    border-radius: 8px;
  }
}

@media screen and (min-width: 1500px) { 
  .nft-assets-wrap {
    .assets-list { 
      grid-template-columns: 24.1% 24.1% 24.1% 24.1%;
      grid-column-gap: 1.2%; 
      .nft-series-item {
        margin-bottom: 20px;
        // flex-basis: 33%;
      }

    }
  }
}

@media screen and (max-width: 1499px)  {
  .nft-assets-wrap {
    .assets-list { 
      grid-template-columns: 32.5% 32.5% 32.5%;
      grid-column-gap: 1.25%;
      .nft-series-item {
        margin-bottom: 20px;
        // flex-basis: 33%;
      }
    }
  }
}

</style>

<style lang="less">

</style>