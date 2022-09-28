<template>
  <div class="captial-view lineBG2">
    <!-- 资金池不同平台资金信息 -->
    <div>
      <div v-for="(item, index) in poolList" :key="index" class="current-info-list lineBG2">
        <div class="part-range lineBG2">
          <p class="current-price text1">
            {{ item.totalUsd }}
          </p>
          <div class="uni-swap text3">
            <SwapIconInfo :icon='item.protocolIcon' :name="item.protocol" />
            {{ item.protocol }}
          </div>
        </div>
        <div class="part-coin text1 lineBG2">
          <div class="left lineBG2">
            <div class="left-img">
              <SwapIconInfo :icon='item.token0Icon' :name="item.token0Symbol" />
              <p class="left-text">
                {{ item.token0Symbol }}
              </p>
            </div>
            <p class="left-num">
              {{ item.reserve0 }}
            </p>
          </div>
          <div class="left right">
            <div class="left-img">
              <SwapIconInfo :icon='item.token1Icon' :name="item.token1Symbol" />
              <p class="left-text">
                {{ item.token1Symbol }}
              </p>
            </div>
            <p class="left-num">
              {{ item.reserve1 }}
            </p>
          </div>
        </div>
        <div class="part-price">
          <p class="price text3">
            {{ item.priceRateText }}
          </p>
          <p class="trans text1">
            {{ item.priceRate }}
            <!-- <span>{{ -2 }}%</span> -->
          </p>
        </div>
      </div>
    </div>
    <!-- 买卖记录资金池变化 -->
    <div class="deal-record">
      <div class="nav-text lineBG2">
        <h2 class="text-one text1">
          {{ $t('SwapDetail.captial.poolRange') }}
        </h2>
        <div class="right-text text3">
          <h2 v-for="(item, index) in textArr" :key="index" :class="recordFlag === index ? 'text1 activedeal' : 'text3'"
            @click="switchBtn(index)">
            {{ item }}
          </h2>
        </div>
      </div>
      <div class="table-header lineBG2 text2">
        <h3 class="text2">{{ $t('SwapDetail.captial.p1') }}</h3>
        <h3 class="text2">{{ $t('SwapDetail.captial.p2') }}/{{ $t('SwapDetail.captial.p3') }}</h3>
        <h3 class="text2">{{ $t('SwapDetail.captial.p4') }}</h3>
      </div>
      <div class="nav-tabs-scroll" :style="{ height: isPC?hi + 'px':'auto'}" v-if="activityList.length > 0">
        <a :href="item.transactionUrl" target="_blank" v-for="(item, index) in activityList" :key="index"
          class="table-li lineBG2" :class="{ 'BG1': bgActiveIndex == index }" @mouseleave="bgActiveIndex = -1"
          @mouseenter="bgActiveIndex = index">
          <div :style='{ width: "70px", "text-align": "left" }'>
            <p :class="['', item.side === 'add' ? 'green-color' : 'red-color']">
              {{ item.side === 'add' ? $t('SwapDetail.captial.padd') : $t('SwapDetail.captial.premove') }}
            </p>
            <p class="li-left-im text1">
              {{ item.time }}
            </p>
          </div>
          <div style="width:150px;padding-right:60px;box-sizing:border-box;">
            <div>
              <p :class="['text-right-view', item.side === 'add' ? 'green-color' : 'red-color']">
                <span class="text-overbig">{{ item.amount0 }}</span>
                <span class="pos-left-align text3">{{ item.token0Symbol }}</span>
              </p>
              <p class="text-right-view" :class="item.side === 'add' ? 'green-color' : 'red-color'">
                <span class="text-overbig">{{ item.amount1 }}</span>
                <span class="pos-left-align text3">{{ item.token1Symbol }}</span>
              </p>
            </div>
          </div>
          <div style="width:70px;margin-right:2px;">
            <div class="space-bottom">
              <img v-if="item.side === 'add'" src="~assets/img/swap/address_up.svg" alt="bitkeep">
              <img v-else src="~assets/img/swap/address_down.svg" alt="bitkeep">
            </div>
            <div class="address-link">
              <p class="li-center-unit text3">
                {{ item.txId.slice(0, 2) + "..." + item.txId.slice(-4) }}
              </p>
              <img src="~assets/img/swap/address2_to.svg" v-show="isImage" alt="btikeep" @error="onImgError" @load="onImgLoad">
            </div>
          </div>
        </a>
      </div>
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
import { mapState } from 'vuex'
export default {
  name: 'CaptialPool',
  data() {
    return {
      flag: true,
      recordFlag: 0,
      textArr: this.$t('SwapDetail.captial.textArr'),
      poolData1: null,
      activityList: [],
      bgActiveIndex: -1,
      imgError:true,
      isPC: this.$store.state.isPC,
    }
  },
  computed: mapState({
    poolList: state => state.swap.poolList,
    activity: state => state.swap.poolActivityList,
    hi: state => {
      if(state.swap.dealdatanav=="dealNav2"){
        return 840
      }else{
        return state.swap.tradesList && state.swap.tradesList.length > 0 ? state.swap.tradesList.length * 40 + (4 - state.swap.poolList.length) * 149 : 0
      } 
    },
    isImage() {
      return !this.imgError
    },
  }),
  watch: {
    activity: {
      handler() {
        this.switchBtn(this.recordFlag)
      },
      deep: true,
      immediate: true
    },
    "$store.state.isPC": function (newVal, oldVal) {
      this.isPC = newVal
    },
  },
  methods: {
    switchBtn(index) {
      this.recordFlag = index
      if (this.recordFlag === 1) {
        this.activityList = this.activity.filter(item => item.side === 'add')
      } else if (this.recordFlag === 2) {
        this.activityList = this.activity.filter(item => item.side === 'remove')
      } else {
        this.activityList = this.activity
      }
    },
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
.captial-view {
  width: 100%;
  border-bottom: 0;

  .current-info-list {
    box-sizing: border-box;
    border-bottom: 5px solid #f2f2f5;

    .part-range {
      display: flex;
      padding: 0px 20px;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      border-bottom: 1px solid #f2f2f5;

      .current-price {
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;

        span {
          font-weight: 500;
          font-size: 12px;
          color: #F36464;
          padding-left: 4px;
          vertical-align: middle;
          line-height: 15px;
        }
      }

      .uni-swap {
        display: flex;
        font-size: 12px;
        font-weight: 500 !important;
        align-items: center;

        img {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 4px;
        }
      }
    }

    .part-coin {
      display: flex;
      border-bottom: 1px solid #f2f2f5;
      padding: 7px 20px;
      box-sizing: border-box;
      height: 50px;
      font-size: 12px;
      font-weight: 500;

      .left {
        flex: 1;
        max-width: 50%;
        border-right: 1px solid #f2f2f5;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        .left-img {
          display: flex;
          align-items: center;

          .left-text {
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        .left-num {
          width: 100%;
          font-weight: 600;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .right {
        flex: 1;
        max-width: 50%;
        margin-left: 20px;
        border: 0;
      }
    }

    .part-price {
      padding: 8px 20px;
      box-sizing: border-box;

      .price {
        font-size: 12px;
        font-weight: 500 !important;
        line-height: 16px;
        margin-bottom: 2px;
      }

      .trans {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;

        span {
          color: #F36464;
          font-size: 12px;
          vertical-align: top;
          padding-left: 4px;
        }
      }
    }
  }

  .deal-record {
    .nav-text {
      padding: 0 20px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f2f2f5;

      .text-one {
        font-weight: 600;
        width: 100px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .right-text {
        font-size: 14px;
        height: 100%;
        font-weight: 600;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: flex-end;

        .activedeal {
          border-bottom: 2px solid;
          padding-top: 2px;
        }

        h2 {
          display: flex;
          align-items: center;
          height: 100%;
          line-height: 100%;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 20px;
        }
      }
    }

    .table-header {
      display: flex;
      border-bottom: 1px solid #F2F2F5;
      padding: 8px 20px;
      justify-content: space-between;
      line-height: 14px;
      font-size: 12px;
      font-weight: 500;

      h3 {
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
      }
    }

    .table-li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F2F2F5;
      padding: 9px 20px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;

      .li-left-im {
        font-size: 11px;
      }

      .li-center-unit {
        margin-left: 3px;
      }

      .space-bottom {
        text-align: center;
        // margin-bottom:3px;
      }

      .space-bottom-left {
        text-align: left;
        //margin-bottom:3px;
      }

      .green-color {
        color: #1BC89E;
      }

      .red-color {
        color: #F36464;
      }

      .text-right-view {
        text-align: right;
        position: relative;
      }

      .pos-left-align {
        position: absolute;
        right: -55px;
        top: 0px;
        text-align: left;
        width: 45px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }

      .text-overbig {
        display: block;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .flex-inline {
        display: flex;
      }
    }

    .address-link {
      display: flex;
      align-items: center;
    }
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

.nav-tabs-scroll {
  overflow: auto;
}

.nav-tabs-scroll::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.nav-tabs-scroll::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #c1c1c1;
}

.nav-tabs-scroll::-webkit-scrollbar-button {
  // width: 1px;
  // border-radius: 50%;
  // background: black;
  display: none;
}

.nav-tabs-scroll::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 2px #333;
  // border-radius: 5px;
  // background: blue;
}

.nav-tabs-scroll::-webkit-scrollbar-corner {
  // background: springgreen;
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
