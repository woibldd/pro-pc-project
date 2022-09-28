<template>
  <div class="kline-nav lineBG2">
    <section>
      <div class="kline-nav-left">
        <coinIcon :icon="coinInfo.icon && coinInfo.icon" :chainIcon="coinInfo.chain" :coinName="coinInfo.name"
          imgWidth="32px" :chainName="contract != 'bitkeep' ? coinInfo.chain : ''" />
        <div class="currency-name">
          <h1 class="big-p text1">
            <a-tooltip placement="top" v-if="symbol">
              <template slot="title">{{ symbol && symbol.toLocaleUpperCase() }}</template>
              <span class="big-p-name">{{ symbol && symbol.toLocaleUpperCase() }}</span>
            </a-tooltip>
            <a-tooltip placement="top" v-else>
              <template slot="title">{{ coinInfo.coin && coinInfo.coin.toLocaleUpperCase() }}</template>
              <span class="big-p-name">{{ coinInfo.coin && coinInfo.coin.toLocaleUpperCase() }}</span>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">{{ iconIndroduce.name }}</template>
              <span class="line-space text1 big-p-over" :title="iconIndroduce.name">{{ iconIndroduce.name }}</span>
            </a-tooltip>
          </h1>
          <p class="small-p text3 big-p-over" v-if="contract != 'bitkeep'" @click="handleCopy(contract)">
            {{ contract | blurredDisplay }}
            <img src="~/assets/img/swap/copy_icon.svg" alt="copy" />
          </p>
          <a-tooltip placement="top" v-else>
            <template slot="title">{{ iconIndroduce.chainName }}</template>
            <p class="small-p text3 big-p-over">
              {{ iconIndroduce.chainName }}
            </p>
          </a-tooltip>
        </div>
        <img v-show='isFavorite && address' @click="handFavorite('unfollow')" class="kline-star"
          src="~/assets/img/swap/yellow_star_icon.svg" :alt="symbol">
        <img v-show='!isFavorite || !address' class="kline-star light_icon" @click="handFavorite('follow')"
          src="~/assets/img/swap/gray_star_icon.svg" :alt="symbol">
        <img v-show='!isFavorite || !address' class="kline-star dark_icon" @click="handFavorite('follow')"
          src="~/assets/img/swap/no-collect-dark.svg" :alt="symbol">
      </div>
      <div class="k-line BG2" />
      <div class="kline-nav-center">
        <div>
          <p class="total-price text1 big-p-over" :title="coinInfo.price">
            ${{ coinInfo.price }}
          </p>
          <p :class="['range big-p-over', { 'red-down': parseFloat(coinInfo.percent) < 0 }]">
            {{ parseFloat(coinInfo.percent) > 0 ? '+' + coinInfo.percent : coinInfo.percent }}
          </p>
        </div>
        <ul>
          <li>
            <p class="text3 big-p-over">
              {{ $t('SwapDetail.kLineNav.highPrice') }}
            </p>
            <p class="text1 big-p-over" v-if="coinInfo.high24">
              ${{ coinInfo.high24 }}
            </p>
            <p class="text1 big-p-over" v-else>
              {{ $t("SwapHome.noData") }}
            </p>
          </li>
          <li>
            <p class="text3 big-p-over">
              {{ $t('SwapDetail.kLineNav.lowPrice') }}
            </p>
            <p class="text1 big-p-over" v-if="coinInfo.low24">
              ${{ coinInfo.low24 }}
            </p>
            <p class="text1 big-p-over" v-else>
              {{ $t("SwapHome.noData") }}
            </p>
          </li>
          <li>
            <p class="text3 big-p-over">
              {{ $t('SwapDetail.kLineNav.volUni') }}(<span v-if="symbol && symbol.toLocaleUpperCase()">{{ symbol &&
                  symbol.toLocaleUpperCase()
              }}</span>
              <span v-else>{{ $t("SwapHome.noData") }}</span>)
            </p>
            <p class="text1 big-p-over" v-if="coinInfo.vol24">
              {{ coinInfo.vol24 }}
            </p>
            <p class="text1 big-p-over" v-else>
              {{ $t("SwapHome.noData") }}
            </p>
          </li>
          <li>
            <p class="text3 big-p-over">
              {{ $t('SwapDetail.kLineNav.volUni') }}(USDT)
            </p>
            <p class="text1 big-p-over" v-if="coinInfo.usdtVol24">
              {{ coinInfo.usdtVol24 }}
            </p>
            <p class="text1 big-p-over" v-else>
              {{ $t("SwapHome.noData") }}
            </p>
          </li>
        </ul>
      </div>
    </section>
    <div class="operatebox">
      <div class="BGCommon_green swapBtn" v-if="Object.keys(coinInfo).length != 0 && Number(coinInfo.isSpecialty) == 1"
        @click="connectWallet('click',0)">
        {{ $t('SwapDetail.buy') }}
      </div>
      <div class="BGCommon_red swapBtn" v-if="Object.keys(coinInfo).length != 0 && Number(coinInfo.isSpecialty) == 1"
        @click="connectWallet('click',1)">
        {{ $t('SwapDetail.sell') }}
      </div>
      <a v-if="infoList && infoList.contractCheckUrl" class="check-btn" :href="infoList.contractCheckUrl"
        target="_blank">
        <img src="~/assets/img/swap/contract_icon.svg" :alt="symbol">
        <div class="heyue-text">
          <span>{{ $t('SwapDetail.kLineNav.contractCheck') }}</span> <img src="~/assets/img/swap/token_check.svg"
            :alt="symbol">
        </div>
      </a>
    </div>
    <NotInstalled :InstalledShow="InstalledShow" @closeInstalledShow="closeInstalledShow" source="swap"></NotInstalled>
    <AlreadyInstalled :AlreadyInstalledShow="AlreadyInstalledShow" @closeAlreadystalledShow="closeAlreadystalledShow" source="swap">
    </AlreadyInstalled>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import copy from 'copy-to-clipboard';
import coinIcon from '../market/coinIcon.vue'
import { wallet } from '@/utils/wallet'
import NotInstalled from '@/components/isInstallModel/notInstalled.vue'
import AlreadyInstalled from '@/components/isInstallModel/alreadyInstalled.vue'
export default {
  name: 'KLineNav',
  data() {
    return {
      contract: this.$route.params.contract,
      InstalledShow: false,
      AlreadyInstalledShow: false,
    }
  },
  computed: mapState({
    isFavorite: state => state.swap.iconIndroduce && state.swap.iconIndroduce.isFavorite,
    coinInfo: state => state.swap.coinInfo && state.swap.coinInfo,
    symbol: state => state.swap.coinInfo && state.swap.coinInfo.symbol,
    iconIndroduce: state => state.swap.iconIndroduce,
    infoList: (state) => {
      return state.swap.iconIndroduce.others && state.swap.iconIndroduce.others.find(item => item.type === 'info')
    },
    address: state => state.address
  }),
  mounted() {

  },
  components: { NotInstalled, AlreadyInstalled, coinIcon },
  methods: {
    ...mapMutations(['changeAddress', 'changeChainId', 'changeWalletID']),
    init() {
      this.changeWalletID("")
      this.changeAddress("")
      this.changeChainId("")
      if (window.bitkeep) {
        window.bitkeep.ethereum.removeAllListeners && window.bitkeep.ethereum.removeAllListeners()
      }
    },
    handleCopy(data) {
      if (!data) {
        this.$message.warning(this.$t('header.Nocopy'))
        return
      }
      copy(data)
      this.$message.success(this.$t('header.copySuccess'))
    },
    async connectWallet(click,type) {
      this.$Ta.track({
        name: 'Swap_Sell_Buy', data: {
          swap_type: type==0?'buy':'sell'
        }
      })
      // 是否有 bitkeep 处理
      if (!wallet.isInstall()) {
        if (click) {
          this.InstalledShow = true
        } else {
          if (sessionStorage.getItem("bitkeep_installed") && sessionStorage.getItem("bitkeep_installed") == "true") {
            this.InstalledShow = false
          } else {
            this.InstalledShow = true
          }
        }
        sessionStorage.setItem('bitkeep_installed', 'true');
        this.init()
        return false
      }
      if(this.$store.state.WalletID){
          this.checkswap(type)
          return false
      }
      try {
        if (!wallet.selectedAddress("bitkeep")) {
          this.init()
        }
        const bitkeepaddress = await wallet.connect("bitkeep");
        let chainId = await wallet.getChainId("bitkeep");
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
        this.changeAddress(address)
        this.changeChainId(chainId)
        localStorage.setItem('connectorId', "injected")
        this.checkswap(type)
        wallet.on("chainChanged", async () => {
          let chainId = await wallet.getChainId()
          this.changeChainId(chainId)
        })
        wallet.on("accountsChanged", async () => {
          const [address] = await wallet.getAccounts("bitkeep");
          if(!address){
            this.init()
            return false
          }
          this.changeAddress(address)
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
        })
      } catch (error) {
        if(typeof error == 'object'&&error.code!=-32002){
          console.log(error)
          this.init()
          this.$message.error(typeof error == 'object' ? error.message : error);
        }
      }
    },
    async handFavorite(type) {
      // 先判断是否链接钱包
      if (!this.$store.state.WalletID) {
        this.$t('SwapDetail.dealData.walletTip')
        this.$message.warning(this.$t('SwapDetail.walletTip'))
        return false
      }
      const res = await this.$api.swap.quoteFavorite({
        status: type,
        chain: this.$route.params.chain,
        coin: this.symbol ? this.symbol : this.coinInfo.coin,
        contract: this.$route.params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : this.$route.params.contract
      })
      if (res.status == 0) {
        if (type == "follow") {
          let data = JSON.parse(JSON.stringify(this.$store.state.swap.iconIndroduce))
          data.isFavorite = true
          this.$store.commit('swap/setIconIndroduce', data)
          this.$message.success(this.$t("DappStore.collect.collectSuccess"));
        } else {
          let data = JSON.parse(JSON.stringify(this.$store.state.swap.iconIndroduce))
          data.isFavorite = false
          this.$store.commit('swap/setIconIndroduce', data)
          this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
        }
        //刷接口
        // const params = {
        //   chain: this.$route.params.chain,
        //   contract: this.$route.params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : this.$route.params.contract
        // }
        // const data = await this.$api.swap.getIconIndroduce(params)
        // this.$store.commit('swap/setIconIndroduce', data.data)

      }
    },
    async checkswap(type) {
      // 先判断是否链接钱包
      // if (!this.$store.state.WalletID) {
      //   this.$message.warning(this.$t('SwapDetail.walletTip'))
      //   return false
      // }
      if (!window.bitkeep.navigateTo) {
        this.$message.warning(this.$t('SwapDetail.latestwallet'))
        return false
      }
      const [buy, sell] = this.iconIndroduce.actions
      const swaptype = type == 0 ? buy : sell;
      window.bitkeep.navigateTo('swap', {
        fromCoin: {
          chain: swaptype.swap.symbol0.chain,
          chainName: swaptype.swap.symbol0.chainName,
          contract: swaptype.swap.symbol0.contract,
          icon: swaptype.swap.symbol0.icon,
          name: this.iconIndroduce.name,
          symbol: String(swaptype.swap.symbol0.symbol).toLocaleUpperCase()
        }, toCoin: {
          chain: swaptype.swap.symbol1.chain,
          chainName: swaptype.swap.symbol1.chainName,
          contract: swaptype.swap.symbol1.contract,
          icon: swaptype.swap.symbol1.icon,
          name: this.iconIndroduce.name,
          symbol: String(swaptype.swap.symbol1.symbol).toLocaleUpperCase()
        }
      })
    },
    closeInstalledShow(data) {
      this.InstalledShow = false
      if (data) {
        this.AlreadyInstalledShow = true
      }
    },
    closeAlreadystalledShow() {
      this.AlreadyInstalledShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.theme-light {
  .checkswap {
    background: rgba(117, 36, 249, 0.1);
  }
}

.theme-dark {
  .checkswap {
    background: rgba(160, 65, 255, 0.1);
  }
}

.kline-nav {
  width: 100%;
  height: 68px;
  padding-left: 20px;
  border-bottom: 1px solid #F2F2F5;
  border-top: 1px solid #F2F2F5;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    display: flex;
    align-items: center;

    .kline-nav-left {
      display: flex;
      align-items: center;
      // max-width: 188px;

      .symbol-img {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }

      .error-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: relative;
        text-align: center;
        line-height: 40px;

        img {
          position: absolute;
          bottom: -4px;
          right: -9px;
          width: 22px;
          height: 22px;
        }
      }

      .kline-star {
        width: 16px;
        height: 16px;
        margin-left: 22px;
        cursor: pointer;
      }

      .currency-name {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

        .big-p {
          width: 100%;
          display: flex;
          align-items: flex-end;

          span {
            display: block;
            font-weight: 500;
            font-size: 14px;
            //padding-left:4px;
          }

          .big-p-name {
            display: block;
            font-weight: 600;
            font-size: 18px;
            line-height: 24px;
            max-width: 100px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 3px;
          }

          .line-space {
            display: block;
            max-width: 80px;
            line-height: 20px;
          }
        }

        .small-p {
          max-width: 180px;
          font-weight: 500;
          font-size: 12px;
        }
      }
    }

    .k-line {
      margin-left: 22px;
      height: 64px;
      width: 1px;
    }

    .kline-nav-center {
      display: flex;
      align-items: center;
      padding-left: 20px;
      letter-spacing: 0;

      .total-price {
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
      }

      .range {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #1BC89E;
        margin-top: 2px;
      }

      .red-down {
        color: #F36464;
      }

      ul {
        display: flex;
        align-items: center;

        li {
          margin-left: 30px;

          p:first-child {
            font-weight: 500 !important;
            font-size: 11px;
            line-height: 14px;
            max-width: 130px;
          }

          p:last-child {
            font-weight: 500 !important;
            font-size: 12px;
            line-height: 16px;
            margin-top: 2px;
            letter-spacing: 0;
            max-width: 110px;
          }
        }
      }
    }
  }

  .operatebox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .checkswap {
      min-width: 90px;
      font-weight: 500;
      font-size: 14px;
      padding: 12px 13px;
      height: 40px;
      display: flex;
      align-items: center;
      border-radius: 100px;
      justify-content: center;
      box-sizing: border-box;
      cursor: pointer;
      margin-right: 10px;
    }

    .swapBtn {
      width: 90px;
      margin-right: 10px;
      height: 40px;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      font-weight: 600;
      font-size: 14px;
      color: #FFFFFF;
      cursor: pointer;
    }

    .check-btn {
      font-weight: 500;
      height: 40px;
      // max-width:150px;
      padding: 12px 15px;
      //padding-left:5px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #1BC89E;
      cursor: pointer;
      background: rgba(27, 200, 158, 0.1);
      border-radius: 100px 0px 0px 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 4px;
      }

      .heyue-text {
        white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        display: flex;
        align-items: center;

        span {
          margin-right: 6px;
          font-weight: 500 !important;
        }
      }
    }
  }
}

@media only screen and (max-width: 1400px) {
  .kline-nav {

    // .check-btn{
    //   width:150px;
    // }
    section {
      .k-line {
        margin-left: 17px;
      }

      .kline-nav-left .kline-star {
        margin-left: 17px;
      }

      .kline-nav-center {
        padding-left: 20px;

        ul li {
          margin-left: 30px;
        }
      }
    }
  }
}

.big-p-over {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

@media only screen and (max-width: 1350px) {
  .kline-nav {

    // .check-btn{
    //   width:140px;
    // }
    section {
      .k-line {
        margin-left: 12px;
      }

      .kline-nav-left .kline-star {
        margin-left: 12px;
      }

      .kline-nav-center {
        padding-left: 20px;

        ul li {
          margin-left: 30px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1300px) {
  .kline-nav {

    // .check-btn{
    //   width:130px;
    //   min-width:130px;
    // }
    section {
      .k-line {
        margin-left: 8px;
      }

      .kline-nav-left .kline-star {
        margin-left: 8px;
      }

      .kline-nav-center {
        padding-left: 20px;

        ul li {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
