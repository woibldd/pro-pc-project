<template>
  <div class="nft-wrap"> 
    <Nav>
      <div></div>
    </Nav>
    <div class="nft-main">
      <div >
        <!-- <h1 class="title text1" >我的资产</h1> -->
        <div class="nft-connect">
          <div class="label-box text3">
            Connact You Wallet
          </div>
          <div >
            <div class="border-box lineBG2" flex="main:justify cross:center">
              <a :href="'/' + $store.state.locale + '/index'"
                  title="BitKeep,  a best crypto wallet" class="seo_href">
                <img src="@/assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_light light_icon">
                <img src="@/assets/img/header/BK logo_dark.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_dark dark_icon">
              </a>
              <button @click="handleConnectClick" class="round BGpurple">Popular</button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>


<script>
import { mapMutations } from 'vuex'
import { wallet } from '@/utils/wallet'
import Nav from '@/components/nft/nav'
export default {
  layout: 'nft/assets',
  name: 'NftIndexPage',
  components: {Nav},
  computed: { 
    WalletID() {
      return this.$store.state.WalletID
    }
  },
  watch: { 
    "$store.state.WalletID": function (newVal, oldVal) {  
      const { language } = this.$route.params
      this.$router.push('/'+ language +'/nft/assets')
    },  
  },
  beforeRouteEnter(to, from, next) { 
    // console.log('beforeRouteEnter', from.matched[0], from)
    const { language } = from.params 
    next(`/${language}/nft/assets`) 
  },
  methods: {
    ...mapMutations([ 'changeAddress', 'changeChainId', 'changeWalletID']),
    async handleConnectClick() {
       try {
          const bitkeepaddress = await wallet.connect("bitkeep");
          this.chainId = await wallet.getChainId("bitkeep");
          const [address] = await wallet.getAccounts("bitkeep");
          //先这样实现功能 后续优化
          const walletID = await wallet.getWalletID("bitkeep");
          if (walletID) {
              this.changeWalletID(walletID)
          } else {
              window.BitKeepInvoke.getHeader(async (err, data) => {
                  if (data) {
                      const walletID = data.TOKEN;
                      this.changeWalletID(walletID)
                  }
              })
          }
          this.address = address;
          this.changeAddress(this.address)
          this.changeChainId(this.chainId)
          localStorage.setItem('connectorId', "injected") 
      } catch (error) {
          if(typeof error == 'object'&&error.code!=-32002){
            console.log(error)
            this.$message.error(typeof error == 'object' ? error.message : error);
          }
      }
    }
  }  
}
</script>


<style lang="less">
.nft-wrap {
  width: 100%;
  .nft-main {
    .title {
      margin-top: 140px;
      text-align: center;
      font-size: 32px;
      font-weight: 600;
      line-height: 150%;
    }
    .nft-connect {
      margin: 151px auto 35.5px;
      width: 755px;
      .label-box {
        font-size: 14px;
        line-height: 21px;
        font-weight: 600;
      }
      .border-box {
        margin-top: 11.5px;
        padding: 0 20px;
        height: 90px;
        border: 1px solid;
        border-radius: 8px;
        img {
          width: 122.77px;
        }
        button {
          padding: 10px 30px;
          color: #ffffff;
          &.round {
            border-radius: 100px;
          }
        }
      }
    }
  }
}

.theme-light {
  .dark {
    display: none!important;;
  }
}
.theme-dark {
  .light {
    display: none!important;
  }
}


</style> 