<template>
  <div class="swapbox">
    <div v-if="isPC">
      <SwapKLineNav class="middle_SwapKLineNav"/>
      <div class="kline-detail-wrap BG0">
        <div class="contentleft">
          <!-- <SwapKLineNav class="big_SwapKLineNav" v-show="!Columndisplay" /> -->
          <swapKLineChart ref="swapKLineChart" :symbol-info-list="symbolInfoList" :price="coinInfo.price"
            :isSpecialty="Number(coinInfo.isSpecialty)"></swapKLineChart>
          <SwapDealNavSwitch ref="childEchart" :isSpecialty="Number(coinInfo.isSpecialty)" />
        </div>
        <div class="contentright">
          <SwapCaptialViewNav :isSpecialty="Number(coinInfo.isSpecialty)" />
        </div>
        <!-- <div class="kline-search-pos">
          <marketSearch :jumpTarget="false"></marketSearch>
        </div> -->
      </div>
    </div>
    <!-- 移动端 -->
    <div class="swap-container-small" v-if="!isPC">
      <!-- k line -->
      <SwapMobileSyInfoMobile />
      <swapKLineChart ref="swapKLineChart" :symbol-info-list="symbolInfoList" :price="coinInfo.price"
        :isSpecialty="Number(coinInfo.isSpecialty)"></swapKLineChart>
      <!-- 导航 -->
      <SwapMobileNavSwitch ref="childEchart" :isSpecialty="Number(coinInfo.isSpecialty)" />
    </div>
    <div class="checkswap BG0 lineBG3"
      v-if="Object.keys(coinInfo).length != 0 && (!isPC) && Number(coinInfo.isSpecialty) == 1">
       <div class="BGCommon_green swapBtn" @click="HandleSys(0)">
        {{ $t('SwapDetail.buy') }}
      </div>
      <div class="BGCommon_red swapBtn" @click="HandleSys(1)">
        {{ $t('SwapDetail.sell') }}
      </div>
      <div class="FavoriteBtn BG0 lineBG3">
        <img v-show='isFavorite && address' @click="handFavorite('unfollow')" class="kline-star"
          src="~/assets/img/swap/yellow_star_icon.svg" :alt="symbol">
        <img v-show='!isFavorite || !address' class="kline-star light_icon" @click="handFavorite('follow')"
          src="~/assets/img/swap/gray_star_icon.svg" :alt="symbol">
        <img v-show='!isFavorite || !address' class="kline-star dark_icon" @click="handFavorite('follow')"
          src="~/assets/img/swap/no-collect-dark.svg" :alt="symbol">
      </div>
    </div>
      <remote-js
            cdn="https://cdn2.bitkeep.vip/files/jquery.min.js"
        ></remote-js>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import cndMixins from "@/mixins/cnd.js";
import swapKLineChart from '@/components/swap/klinecharts.vue'
export default {
  name: 'SwapWrap',
  layout: 'swapLay',
  scrollToTop: true,
  mixins: [cndMixins],
  head() {
    let { language, chain, contract } = this.$route.params;
    let symbol = this.coinInfo.symbol ? this.coinInfo.symbol : this.iconIndroduce.chainName
    return {
      title: (this.coinInfo.price ? "$" + this.coinInfo.price : 'no Data') + ' | ' + this.$t('SwapDetail.title', { "name": this.iconIndroduce.name ? this.iconIndroduce.name : 'no Data', "chain": this.iconIndroduce.name ? this.iconIndroduce.name : 'no Data', "symbol": symbol ? symbol : "no Data" }),
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.$t('SwapDetail.keyWord', { "symbol": this.coinInfo.symbol }) },
        { hid: 'description', name: 'description', content: this.$t('SwapDetail.description', { "chain": chain.toLocaleUpperCase(), "symbol": this.coinInfo.symbol }) },
      ],
      link: [
        { rel: 'canonical', href: `https://bitkeep.com/${language}/swap/${chain}/${contract}` },
        { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/swap/${chain}/${contract}` },
        { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/swap/${chain}/${contract}` },
        { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/swap/${chain}/${contract}` },
        { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/swap/${chain}/${contract}` },
      ]
    }
  },
  // 获取K线，币信息，交易，资金池数据
  async asyncData({ req, app, params, store }) {
    let interval = app.$cookies.get('interval');
    const intervalSize = {
      '1min': 1440,
      '5min': 864,
      '15min': 600,
      '30min': 1440,
      '1hour': 1440,
      '4hour': 1080,
      '1day': 365,
      '1week': 104
    }
    if (!interval) {
      app.$cookies.set('interval', '1hour')
      interval = '1hour'
    }
    const chain = params.chain
    const contract = params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : params.contract
    // k线接口
    const symbolInfoList = await app.$api.swap.getKLineData({
      chain,
      contract,
      market: interval,
      size: intervalSize[interval]
    })
    return {
      symbolInfoList: symbolInfoList.data && symbolInfoList.data.list ? symbolInfoList.data.list : [],
      isPC: !store.state.isMobile
    }
  },
  data() {
    return {
      symbolInfoList: [],
      screenWidth: this.$store.state.isMobile ? 750 : 1200,
      // Columndisplay:false
    }
  },
  components: {
    swapKLineChart
  },
  computed: mapState({
    isFavorite: state => state.swap.iconIndroduce && state.swap.iconIndroduce.isFavorite,
    symbol: state => state.swap.coinInfo && state.swap.coinInfo.symbol,
    coinInfo: state => state.swap.coinInfo && state.swap.coinInfo,
    iconIndroduce: state => state.swap.iconIndroduce,
    outClick: state => state.swap.iconIndroduce,
    address: state => state.address
  }),
  async fetch({ app, store, params }) {
    await store.dispatch('swap/CRYCLE_REQUEST', {
      chain: params.chain,
      contract: params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : params.contract
    })
  },
  beforeMount(){
    this.$Ta.track({name:'Bitkeep__Swap_Page',data:{
      Page_Enter:'1'
    }})
  },
  async mounted() {
    // 刷收藏
    const favParams = {
      chain: this.$route.params.chain,
      contract: this.$route.params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : this.$route.params.contract
    }
    const data = await this.$api.swap.getIconIndroduce(favParams)
    this.screenWidth = document.body.clientWidth;
    // const big_SwapWidth=$(".big_SwapKLineNav section").width();
    // this.Columndisplay=$(".big_SwapKLineNav .operatebox").offset().left<=Number(big_SwapWidth)+40;
    this.$store.commit('swap/setIconIndroduce', data.data)
    window.onresize = () => {
      return (() => {
        // if(this.isPC){
        //   if(this.Columndisplay==false){
        //     this.Columndisplay=$(".big_SwapKLineNav .operatebox").offset().left<=Number(big_SwapWidth)+40;
        //   }else{
        //     this.Columndisplay=$(".middle_SwapKLineNav .operatebox").offset().left<=Number(big_SwapWidth)+440;
        //   }
        // }
        this.screenWidth = document.body.clientWidth
        if(this.screenWidth>1000){
            const bodycontent=document.getElementsByClassName("swapbox")[0];
     		    bodycontent.classList.remove("overflowbody")
          }
        if (Number(this.coinInfo.isSpecialty) == 1) {
          this.$refs.swapKLineChart.kLineChart.resize()
        }
      })()
    }
  },
  methods: {
    ...mapMutations(['changeIsPC']),
    closeH5Search() {
      this.h5searchshow = false
    },
    showSearch() {
      this.h5searchshow = true
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
      }
    },
    HandleSys(type) {
      const { language } = this.$route.params;
      const bitkepp_lang = language == 'en' ? '' : '/' + language;
      let isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod'),
        isAndroid = navigator.userAgent.match('Android');
      this.$Ta.track({
        name: 'Swap_Sell_Buy', data: {
          swap_type: type==0?'buy':'sell'
        }
      })
      if (isiOS) {
        location.href = bitkepp_lang + "/download?type=1"
      } else if (isAndroid) {
        location.href = bitkepp_lang + "/download?type=0"
      } else {
        this.checkswap(type)
      }
    },
    async checkswap(type) {
      // 先判断是否链接钱包
      if (!this.$store.state.WalletID) {
        this.$message.warning(this.$t('SwapDetail.walletTip'))
        return false
      }
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
          contract: swaptype.swap.symbol1.contract,
          chainName: swaptype.swap.symbol1.chainName,
          icon: swaptype.swap.symbol1.icon,
          name: this.iconIndroduce.name,
          symbol: String(swaptype.swap.symbol1.symbol).toLocaleUpperCase()
        }
      })
    },
  },
  watch: {
    screenWidth: {
      handler(val) {
        if (val != 0) {
          this.changeIsPC(val > 1000)
          this.isPC = val > 1000;
        }
      },
      immediate: true
    },
  },
}
</script>
<style lang="less" scoped>
.overflowbody{
  height: 100vh !important;
  overflow: hidden !important;
}
// @media screen and (min-width: 1251px) {
//   .big_SwapKLineNav {
//     display: flex;
//   }

//   .middle_SwapKLineNav {
//     display: none !important;
//   }
// }
// @media screen and (max-width: 1250px) {
//   .big_SwapKLineNav {
//     display: none !important;
//   }

//   .middle_SwapKLineNav {
//     display: flex;
//   }
// }
@media screen and (min-width: 751px) {
  .swapbox {
    padding-top: 64px;
    // min-width: 1280px;
    min-height: 100vh;

    .kline-detail-wrap {
      width: 100%;
      min-height: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;

      .contentleft {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
      }

      .contentright {
        width: 390px;
      }
    }

    // 搜索框展示
    // .kline-search-pos {
    //   position: fixed;
    //   left: 200px;
    //   top: 10px;
    //   z-index: 999;
    //   width: 500px;
    //   display: block;
    // }
  }
}

@media screen and (max-width: 750px) {
  .swapbox {
    padding-top: 44px;
    min-height: 100vh;

    .swap-container-small {
      padding-bottom: 120px;
    }

    .checkswap {
      width: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      backdrop-filter: blur(20px);
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      z-index: 999;
      border-top: 1px solid;

      .swapBtn {
        flex: 1;
        margin-right: 10px;
        height: 44px;
        border-radius: 6px;
        text-align: center;
        line-height: 44px;
        font-weight: 600;
        font-size: 14px;
        color: #FFFFFF;
      }
      .FavoriteBtn {
        width: 44px;
        height: 44px;
        border: 1px solid;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>