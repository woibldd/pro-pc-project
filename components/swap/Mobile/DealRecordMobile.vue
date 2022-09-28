<template>
  <!-- 交易记录 -->
  <div class="text3">
    <a :href="item.transactionUrl" class="deal-record" target="_blank" v-for="(item, index) in tradesList"
      :key="index + item.time">
      <div class="deal-record-coloum">
        <h3 class="text3 lineBG2 padding-space-left" v-if="index==0">
          {{ dealRecordTitle[0] }}
        </h3>
        <div class="li-item lineBG2 padding-space-left">
          <p  :class="item.side === 'buy' ? 'li-buy' : 'li-sell'">{{ item.side == 'buy' ?
            $t('SwapDetail.buy') :
            $t('SwapDetail.sell')
        }}</p>
          <p class="text3">{{ item.time }}</p>
        </div>
      </div>
      <div class="deal-record-coloum" style="flex:1;text-align:right;">
        <h3 class="text3 lineBG2" v-if="index==0">
          {{ dealRecordTitle[3] }}
        </h3>
        <div class="li-item lineBG2">
          <p :class="item.side === 'buy' ? 'li-buy' : 'li-sell'">{{ item.amount }}</p>
          <p class="text3">{{ symbol }}</p>
        </div>
      </div>
      <div class="deal-record-coloum" style="flex:1;text-align:right;">
        <h3 class="text3 li-text-item lineBG2" v-if="index==0">
          {{ dealRecordTitle[4]+"/"+dealRecordTitle[2] }}
        </h3>
        <div class="li-item li-text-item lineBG2">
          <p style="font-size:12px;" class="text1">{{ item.value }}</p>
          <p class="text3" >{{ item.price }}</p>
        </div>
      </div>
      <div class="deal-record-contract li-text-item lineBG2">
        <h3 class="text3 lineBG2 padding-space-right" v-if="index==0">
          {{ dealRecordTitle[5] }}
        </h3>
        <div class="li-account lineBG2 padding-space-right">
          <div class="li-count-link">
            <p class="text3">
              {{ item.txId.slice(0, 2) + "..." + item.txId.slice(-4) }}
            </p>
            <img  class="light_icon"  src="~assets/img/swap/address_to.svg">
            <img  src="~assets/img/swap/address3_to.svg" alt="account" class="address-to dark_icon">
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'DealRecordMobile',
  data() {
    return {
      dealRecordTitle: this.$t('SwapDetail.dealRecordTitle')
    }
  },
  computed: mapState({
    tradesList: state => state.swap.tradesList && state.swap.tradesList,
    symbol: state => state.swap.coinInfo && state.swap.coinInfo.symbol,
  })
}
</script>
<style lang="less" scoped>
.deal-record {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  h3 {
    font-size: 10px;
    font-weight: 500;
    height: 30px;
    line-height: 30px;
    ;
    border-bottom: 1px solid #F5F5F5;
  }

  .li-item {
    font-weight: 500;
    border-bottom: 1px solid #F5F5F5;
    box-sizing: border-box;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .padding-space-left {
    padding-left: 15px;
    box-sizing: border-box;
  }

  .padding-space-right {
    padding-right: 15px;
    box-sizing: border-box;
  }

  .li-text-item {
    text-align: right;
  }

  .li-sell {
    color: #F36464;
    font-size: 12px;
    font-weight: 500;
  }

  .li-buy {
    color: #1BC89E;
    font-size: 12px;
    font-weight: 500;
  }

  .li-account {
    width: 100px;
    border-bottom: 1px solid #F5F5F5;
    height: 60px;
    box-sizing: border-box;

    .li-count-link {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: flex-end;
      p{
        font-weight: 500;
      }
    }

    img {
      width: 14px;
      height: 14px;
      margin-left: 2px;
      display: block;
    }
  }
}
</style>
