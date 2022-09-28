<template>
  <div> 
    <div class="nft-connect">
      <div class="label-box text3">
        Connect You Wallet
      </div>
      <div >
        <div class="border-box lineBG2" flex="main:justify cross:center">
          <a :href="'/' + $store.state.locale + '/index'"
              title="BitKeep,  a best crypto wallet" class="seo_href">
            <img src="@/assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_light light_icon">
            <img src="@/assets/img/header/BK logo_dark.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_dark dark_icon">
          </a>
          <button @click="handleConnectClick" class="round BGpurple pointer">Popular</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { wallet } from '@/utils/wallet'
export default {
  computed: { 
    WalletID() {
      return this.$store.state.WalletID
    }
  },
  methods: {
    ...mapMutations([ 'changeAddress', 'changeChainId', 'changeWalletID']),
    async handleConnectClick() { 
      this.$nuxt.$emit('connectWallet')
      //  try { 
      //     const bitkeepaddress = await wallet.connect("bitkeep");
      //     this.chainId = await wallet.getChainId("bitkeep");
      //     const [address] = await wallet.getAccounts("bitkeep");
      //     //先这样实现功能 后续优化
      //     const walletID = await wallet.getWalletID("bitkeep");
      //     if (walletID) {
      //         this.changeWalletID(walletID)
      //     } else {
      //         window.BitKeepInvoke.getHeader(async (err, data) => {
      //             if (data) {
      //                 const walletID = data.TOKEN;
      //                 this.changeWalletID(walletID)
      //             }
      //         })
      //     }
      //     this.address = address;
      //     this.changeAddress(this.address)
      //     this.changeChainId(this.chainId)
      //     localStorage.setItem('connectorId', "injected") 
      // } catch (error) {
      //     this.$message.error(typeof error == 'object' ? error.message : error);
      // }
    }
  }
}
</script>


<style lang="less" scoped>

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
</style>