<template>
  <!-- 交易记录 -->
  <div class="deal-record text1" ref='barparent'>
    <div class="nav-title">
      <h3 style="white-space:nowrap;" class="text2" v-for="(item, index) in dealRecordTitle" :key="'left' + index">
        {{ item }}
      </h3>
    </div>
    <div>
      <a class="table-li" v-for="(item, index) in tradesList" target="_blank" :href="item.transactionUrl"
        :key="index + item.contract" :class="{ 'BG1': index == bgActiveIndex }" @mouseleave="bgActiveIndex = -1"
        @mouseenter="bgActiveIndex = index">
        <p class="li-time">{{ item.time }}</p>
        <p class="li-time" :class="item.side === 'buy' ? 'li-buy' : 'li-sell'">{{ item.side == 'buy' ?
            $t('SwapDetail.buy') :
            $t('SwapDetail.sell')
        }}</p>
        <p class="li-time" :class="item.side === 'buy' ? 'li-buy' : 'li-sell'">{{ item.price }}</p>
        <p class="li-time">{{ item.amount }}</p>
        <p class="li-time">{{ item.value }}</p>
        <div class="li-count-link">
          <p class="text1">
            {{ item.txId.slice(0, 2) + "..." + item.txId.slice(-4) }}
          </p>
          <img class="light_icon" v-show="isImage" src="~assets/img/swap/address_to.svg" :alt="symbol" @error="onImgError" @load="onImgLoad">
          <img v-show="isImage" src="~assets/img/swap/address3_to.svg" :alt="symbol" class="address-to dark_icon" @error="onImgError" @load="onImgLoad">
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'DealRecord',
  data() {
    return {
      dealRecordTitle: this.$t('SwapDetail.dealRecordTitle'),
      bgActiveIndex: -1,
      imgError:true
    }
  },
  computed: mapState({
    tradesList: state => state.swap.tradesList && state.swap.tradesList,
    symbol: state => state.swap.coinInfo && state.swap.coinInfo.symbol,
    isImage() {
      return !this.imgError
    },
  }),
  mounted() {

  },
  methods: {
    hrefUrl(href) {
      let a = document.createElement('a');
      a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('id', 'startTelMedicine');
      // 防止反复添加
      if (document.getElementById('startTelMedicine')) {
        document.body.removeChild(document.getElementById('startTelMedicine'));
      }
      document.body.appendChild(a);
      a.click();
    },
    onImgError(event) {
      this.imgError = true
    },
    onImgLoad(event) {
      this.imgError = false
    }
  }
}
</script>
<style lang="less" scoped>
.deal-record {
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;

  .nav-title {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    h3 {
      line-height: 14px;
      font-size: 12px;
      font-weight: 500;
      height: 30px;
      line-height: 30px;
      flex: 1;
      text-align: right;
    }

    h3:nth-child(1) {
      text-align: left
    }

  }

  .table-li {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 20px;

    .li-time {
      flex: 1;
      font-weight: 500;
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-align: right;
    }

    .li-time:first-child {
      text-align: left;
    }

  }



  .li-sell {
    color: #F36464;
  }

  .li-buy {
    color: #1BC89E;
  }

  .li-count-link {
    display: flex;
    flex: 1;
    height: 40px;
    align-items: center;
    justify-content: flex-end;

    p {
      font-weight: 500;
      font-size: 12px
    }

    img {
      width: 14px;
      height: 14px;
      margin-left: 2px;
      display: block;
    }
  }
}

@media screen and (max-width: 950px) and (min-width: 820px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 80px;
    }

    .li-time:nth-child(2) {
      width: 80px;
    }

    h3:nth-child(1) {
      width: 80px;
    }

    h3:nth-child(2) {
      width: 80px;
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 950px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 150px;
    }

    .li-time:nth-child(2) {
      width: 150px;
    }

    h3:nth-child(1) {
      width: 150px;
    }

    h3:nth-child(2) {
      width: 150px;
    }
  }
}

@media screen and (max-width: 1350px) and (min-width: 1201px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 180px;
    }

    .li-time:nth-child(2) {
      width: 180px;
    }

    h3:nth-child(1) {
      width: 180px;
    }

    h3:nth-child(2) {
      width: 180px;
    }
  }
}

@media screen and (max-width: 1400px) and (min-width: 1301px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 200px;
    }

    .li-time:nth-child(2) {
      width: 200px;
    }

    h3:nth-child(1) {
      width: 200px;
    }

    h3:nth-child(2) {
      width: 200px;
    }
  }
}

@media screen and (max-width: 1500px) and (min-width: 1401px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 220px;
    }

    .li-time:nth-child(2) {
      width: 220px;
    }

    h3:nth-child(1) {
      width: 220px;
    }

    h3:nth-child(2) {
      width: 220px;
    }
  }
}

@media screen and (max-width: 1700px) and (min-width: 1501px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 250px;
    }

    .li-time:nth-child(2) {
      width: 250px;
    }

    h3:nth-child(1) {
      width: 250px;
    }

    h3:nth-child(2) {
      width: 250px;
    }
  }
}

@media screen and (min-width: 1701px) {
  .deal-record {
    .li-time:nth-child(1) {
      width: 300px;
    }

    .li-time:nth-child(2) {
      width: 300px;
    }

    h3:nth-child(1) {
      width: 280px;
    }

    h3:nth-child(2) {
      width: 280px;
    }
  }
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>
