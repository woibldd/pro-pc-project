<template>
  <div class="card-order-wrap lineBG2">
    <div class="order-top pointer" flex="main:justify cross:center" @click="handleClickBody">
      <div class="order-top-left" flex="main:left cross:center"> 
        <div class="nft-header-img" >
          <!-- <img src="@/assets/img/components/nft/orders/header-icon.png" alt="">  -->
          <img :src="info.collection_icon" alt=""> 
        </div>
        <div class="nft-series">
          <div class="series-name">
            <span class="text1">{{info.collection_name}}</span> 
            <img v-if="info.auth==1" style="width:12.44px; " src="@/assets/img/components/nft/orders/icon-cert-blue.svg" alt="">
            <img v-if="info.auth==2" style="width:12.44px; " src="@/assets/img/components/nft/orders/icon-cert-pink.svg" alt="">
          </div>
          <div class="series-chain">
            <span class="text3">{{upcase(info.chain)}}</span>
            <span class="text3">· {{info.standard}}</span>
          </div>
        </div>
      </div>
      <div class="order-top-right" v-if="info">
        <label v-if="info.status==1" class="state Colorpurple Common_light_purple">{{$t('nft.orders.orderDict.1')}}</label>
        <label v-if="info.status==5" class="state Colorpurple Common_light_purple">{{$t('nft.orders.orderDict.5')}}</label>
        <label v-if="info.status==2" class="state text3 BG2">{{$t('nft.orders.orderDict.2')}}</label>
        <label v-if="info.status==3"  class="state Common_red Common_light_red">{{$t('nft.orders.orderDict.3')}}</label>
        <label v-if="info.status==4" class="state Common_cyan_blue Common_light_cyan_blue">{{$t('nft.orders.orderDict.4')}}</label>
        <label v-if="info.status==6" class="state Common_red Common_light_red">{{$t('nft.orders.orderDict.6')}}</label>
        <!-- <label class="state Common_red Common_light_red">{{stateDict[info.status]}}</label> -->
      </div>
    </div>
    <div class="order-main">
      <div class="order-row pointer" flex="main:left" @click="handleClickBody">
        <div class="order-nft-img"> 
          <img :src="info.nft_icon" alt="">
        </div>
        <div class="order-nft-info">
          <h3 class="nft-name text1">{{info.nft_name}} </h3>
          <div class="nft-id">
            <label class="text3">Token ID: </label>
            <span class="text3">{{info.token_id}}</span>
          </div>
        </div>
      </div>
      <div v-if="ableEdit" class="order-info pointer" flex="main:justify" @click="handleClickBody">
        <div class="order-info-date">
          <div class="label text3">
            <span v-if="info.status==4">{{$t('nft.orders.time1')}}</span>
            <span v-else>{{$t('nft.orders.time2')}} 
              <span v-if="info.status==1 || info.status==5"> 
                <span  v-if="calcDay(info.sale_end_time) < 365 ">
                  <!-- (剩 {{calcDay(info.sale_end_time)}}天) -->
                  ({{$t('nft.orders.surplus', {d: calcDay(info.sale_end_time)})}})
                </span> 
              </span>
            </span>  
          </div>
          <div v-if="info.status==4" class="date text1 order-info-value">    
            <span>{{ parseTime(info.time, 'y-M-d h:m')}}</span> 
          </div>
          <div v-else class="date text1 order-info-value">
            <!-- 22-02-21 18:21 --> 
            <span v-if="calcDay(info.sale_end_time) > 365">{{$t('nft.orders.toSold')}}</span>
            <span v-else>{{ parseTime(info.sale_end_time, 'y-M-d h:m')}}</span> 
          </div>
        </div>
        <div class="order-info-price">
          <div class="label text3"  flex="main:right">
            {{$t('nft.orders.text7')}}
          </div>
          <div class="price order-info-value" flex="main:right">
            <div class="digital-price text1" :title="info.price + upcase(info.symbol)">
              <!-- 1.12 ETH -->
              <img class="icon-symbol" v-if="info.symbol=='eth'" src="@/assets/img/components/Mainnet/ETH.png" alt="">
              <img class="icon-symbol" v-if="info.symbol=='bnb'" src="@/assets/img/components/Mainnet/BNB.png" alt="">
              <img class="icon-symbol" v-if="info.symbol=='matic'" src="@/assets/img/components/Mainnet/MATIC.png" alt="">
              {{info.price}} {{upcase(info.symbol)}}
             </div>
            <div class="fiat-price text3" flex="main:right">
              ~<fiatMoney class="fm" :base="info.symbol" :value="info.price"></fiatMoney>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="order-info">
        <div class="order-info-price" flex="main:right">
          <div class="label text3 order-info-value"  flex="main:right cross:center">
            {{$t('nft.orders.text7')}}
            <!-- 挂单币种 & 价格 -->
          </div>
          <div class="price order-info-value" flex="cross:center">
            <div class="digital-price text1">  
              {{info.price}} {{upcase(info.symbol)}}
             </div>
            <div class="fiat-price text3" flex="cross:center">
              ~<fiatMoney :base="info.symbol" :value="info.price"></fiatMoney>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ableEdit" class="order-option" flex="main:right"> 
        <button v-if="info.status==1 && calcDay(info.sale_end_time) < 365 && is721" @click="handleClickExtendOrder" class="text1 lineBG3 pointer"> 
            {{$t('nft.orders.btn1')}}
        </button>
        <button v-if="info.status==1 && is721" @click="handleClickEditOrder" class="text1 lineBG3 pointer">{{$t('nft.orders.btn2')}}</button>
        <button v-if="info.status==1" @click="handleClickCancelOrder" class="Common_red lineBG3 pointer">{{$t('nft.orders.btn3')}}</button>
        <!-- <button v-if="info.status==3 || info.status==6 || info.status==2" @click="handleClickReopenOrder"  class="text1 lineBG3">重新出售</button> -->
      </div>
    </div>

  </div>
</template>


<script>
import {parseTime} from '@/utils/public'
import fiatMoney from '@/components/nft/FiatMoney'
export default {
  components: {fiatMoney},
  data() {
    return {
      //1出售中，2已取消出售，3超出出售时间，4成功出售，5上架中，6上架失败
      stateDict:[
        '',
        '出售中',
        '已取消',
        '出售超时',
        '出售成功',
        '上架中',
        '上架失败',
      ], 

    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ableEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    parseTime,
    upcase(str) {
      if (str) {
        return str.toUpperCase()
      }
    },
    handleClickCancelOrder() {
      this.$emit('clickCancel')
    },
    handleClickEditOrder() {
      this.$emit('clickEdit') 
    },
    handleClickExtendOrder() {
      this.$emit('clickExtend') 
    },
    handleClickReopenOrder() {
      this.$emit('clickReopen') 
    },
    handleClickBody() {
      this.$emit('click')
    },
    calcDay(end_time) {
      const end = new Date(end_time).getTime()
      const now = new Date().getTime()
      const distance =  Math.floor((end - now) / 60 / 60 / 24 / 1000) 
      return distance
    }
  },
  computed: {
    is721() {
      return this.info.standard.indexOf('721') > -1
    }
  }
}
</script>

<style lang="less" scoped>
.card-order-wrap {
  padding: 20px 20px 15px; 
  border: 1px solid;
  border-radius: 8px;
  .order-top {
    .order-top-left {
      .nft-header-img {
        img {
          width: 24px;
        }
      }
      .nft-series {
        margin-left: 10px;
        .series-name {
          font-size: 12px;
          line-height: 16px;
          font-weight: 500;
          img {
            width: 12.44px;
          }
        }
        .series-chain {
          font-size: 10px;
          line-height: 14px;
          font-weight: 500;
        }
      }
    }
    .order-top-right {
      font-size: 12px;
      .state {
        display: block;
        padding: 4px 10px;
        white-space: nowrap;
        border-radius: 4px;
        font-size: 14px;
        line-height: 150%;
        font-weight: 600;
        font-style: normal;
        font-family: 'PingFang SC';
        text-align: center;
       
      }
    }
  }
  .order-main {
    margin-top: 16px;
    .order-row {
      .order-nft-img {
        img {
          width: 64px;
          height: 64px;
        }
      }
      .order-nft-info {
        margin-left: 10px;
        .nft-name {
          font-size: 14px;
          line-height: 120%;
          font-weight: 600;
        }
        .nft-id {
          margin-top: 2px;
          font-size: 10px;
          line-height: 14px;
          font-weight: 500;
        }
      }
    }
    .order-info {
      margin-top: 20px;
      font-size: 12px;
      .label {
        font-family: 'PingFang SC';
        font-weight: 400;
        line-height: 16px;
      }
      .order-info-date {
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
      }
      .order-info-value {
        margin-top: 4px;
        .digital-price {
          font-size: 14px;
          margin-right: 4px;
          font-weight: 600;
          line-height: 120%;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          .icon-symbol {
            height: 18px;
            width: 18px;
          }
        }
        .fiat-price {
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
          .fm { 
            max-width: 70px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .order-info-price {
        // .label {
        //   margin-right: 10px;
        // }
      }
    }
    .order-option {
      margin-top: 5px;
      height: 34px;
      button {
        padding: 8px 14px;
        margin-left: 10px;
        border: 1px solid;
        border-radius: 100px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 500;
        font-style: normal;
        font-family: 'PingFang SC';
      }
    }

  }
}
</style>