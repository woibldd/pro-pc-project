<template>
  <div class="deal-data">
    <nav class="text3 lineBG2">
      <h2 :class="flag ? 'text1 activedeal' : 'text3'" @click="wsitch(true)">
        {{ $t('SwapDetail.dealNav1') }}
      </h2>
      <h2 :class="!flag ? 'text1 activedeal' : 'text3'" @click="wsitch(false)">
        {{ $t('SwapDetail.dealNav2') }}
      </h2>
    </nav>
    <!-- 交易记录 -->
    <div v-show="flag">
      <SwapDealRecord v-if='isSpecialty == 1' />
      <div class="notDataBox" v-else>
        <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
        <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
        <div class="text3 notData" :title='$t("SwapHome.noData")'>{{ $t("SwapHome.noData") }}
        </div>
      </div>
    </div>
    <!-- 交易数据 -->
    <div v-show="!flag">
      <SwapDealData ref="swapDealData" v-if='isSpecialty == 1&&!flag' />
      <div class="notDataBox" v-else>
        <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
        <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
        <div class="text3 notData" :title='$t("SwapHome.noData")'>{{ $t("SwapHome.noData") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'DealNavSwitch',
  data() {
    return {
      flag: true
    }
  },
  props: {
    isSpecialty: {
      type: Number,
      default: 1
    }
  },
  methods: {
    ...mapMutations({
          setdealdatanav: 'swap/setdealdatanav',
    }),
    wsitch(flag) {
      this.flag = flag
      this.setdealdatanav(flag?'dealNav1':'dealNav2')
      if (flag==false) {
        setTimeout(() => {
          this.$refs.swapDealData.init()
        }, 700)
      }
    },
    resizeEchart() {
      this.$refs.swapDealData.rangeEchart()
    }
  }
}
</script>
<style lang="less" scoped>
.deal-data {
  width: 100%;

  .activedeal {
    border-bottom: 2px solid;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
  }

  nav {
    display: flex;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #F2F2F5;
    border-top: 1px solid #F2F2F5;
    box-sizing: border-box;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;

    h2 {
      margin-right: 20px;
    }

  }

  .notDataBox {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
    }

    .notData {
      font-weight: 500;
      font-size: 12px;
      line-height: 1.5;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
