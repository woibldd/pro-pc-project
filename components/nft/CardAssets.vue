<template>
  <div class="card-series-wrap lineBG2 pointer" @click="handleClick">
    <!-- 系列卡片 --> 
    <div class="series-top">
      <div class="series-bg-img " :style="{backgroundImage: 'url('+info.banner_image+')' }"  alt="">
          <img class="lineBG0 BG0" v-show="!imgBannerError" :src="info.banner_image" alt=""  @error="onBannerImgError" @load="onBannerImgLoad">
          <img class="lineBG0 BG0" v-show="imgBannerError" src="@/assets/img/components/nft/default-assets.png" alt="">
      </div>
      <div class="series-icon-box">
        <div class="series-icon lineBG0 BG0"> 
          <!-- <img class="lineBG0 BG0" :src="info.icon" alt=""  >  --> 
          <img class="lineBG0 BG0" v-show="!imgHeaderError" :src="info.icon" alt=""  @error="onHeaderImgError" @load="onHeaderImgLoad">
          <img class="lineBG0 BG0" v-show="imgHeaderError" src="@/assets/img/components/nft/default-nft-header.png" alt="default">
          <!-- <img class="lineBG0 BG0" v-show="imgBannerError" src="@/assets/img/components/nft/default-assets.png" alt=""> -->
          <img v-show="isChainImage"  class="chain-icon BG2 lineBG2" :src="chainImg"  @error="onChainImgError" @load="onChainImgLoad">  
        </div> 
      </div>
    </div>
    <div class="series-info">
      <h3 class="info-name text1" flex="main:center" :title="info.name">
        <span>{{info.name}}</span>  
        <img v-if="info.auth==1" style="width:20px; " src="@/assets/img/components/nft/orders/icon-cert-blue.svg" alt="">
        <img v-if="info.auth==2" style="width:20px; " src="@/assets/img/components/nft/orders/icon-cert-pink.svg" alt="">
      </h3>
      <div class="info-address text3" flex="main:center" @click.stop="handleCopy(info.contract)">
        <span> {{ sx(info.contract) }}</span>  
        <img src="@/assets/img/components/nft/icon-copy.svg" alt="">
      </div>
      <div class="nft-status" flex="box:mean">
        <div class="hold nft-status-field">
          <div class="value text1">{{info.total}}</div>
          <div class="label text2">{{$t('nft.holdTotal')}}</div>
        </div>
        <div class="pending nft-status-field">
          <div class="value text1">{{info.total - info.saleTotal}}</div>
          <div class="label text2">{{$t('nft.forSale')}}</div>
        </div>
        <div class="ordering nft-status-field">
          <div class="value Colorpurple">{{info.saleTotal}}</div>
          <div class="label text2">{{$t('nft.onSale')}}</div>
        </div>
      </div>
      <div class="line BG2"></div>
      <div class="order-status">
        <div flex="main:justify">
          <div class="label text3">{{$t('nft.minPrice')}}</div>
          <div class="price text1">  
            <span v-if="info.minPrice">
              <CoinIcon :chain="info.chain"></CoinIcon>
              {{info.minPrice}}
            </span>
            <span v-else>-</span> 
          </div>
        </div>
        <div flex="main:justify">
          <div class="label text3">{{$t('nft.maxPrice')}}</div>
          <div class="price text1">
            <span v-if="info.maxPrice">
              <CoinIcon :chain="info.chain"></CoinIcon>
              {{info.maxPrice}}
            </span>
            <span v-else>-</span> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';
import CoinIcon from '@/components/nft/CoinIcon'
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {CoinIcon},
  data() {
    return {
      tokenid: '0xlkajsdflheiqfoiwenvlaksjdlkfjsalgnlasdjf', 
      imgBannerError: false,
      imgHeaderError: false,
      imgChainError: true,
    }
  },
  computed: {
    isChainImage() {
      return !this.imgChainError && Boolean(this.chainImg)
    },
    chainImg() {
      try { 
        return require('@/assets/img/components/Mainnet/' + this.info?.chain?.toUpperCase() +'_GRAY.png')
      } catch {
        return ''
      }
    }

  },
  methods: { 
    onChainImgError(event) {
      this.imgChainError = true
    },
    onChainImgLoad(event) {
      this.imgChainError=false
    },
    onBannerImgError(event) { 
      this.imgBannerError = true
    },
    onBannerImgLoad(event) { 
      this.imgBannerError=false
    },
    onHeaderImgError(event) { 
      // console.log('onHeaderImgError')
      this.imgHeaderError = true
    },
    onHeaderImgLoad(event) { 
      // console.log('onHeaderImgLoad')
      this.imgHeaderError=false
    },
    sx(address='') {
      if (address.length > 10) {
        return address.substr(0, 6) + '...' + address.slice(-4)
      } else {
        return address
      }
    },
    handleClick() {
      this.$emit('click', 'abcd')
      // console.log('handleClick')
    },
    handleCopy(data) {
        if (!data) {
          this.$message.warning(this.$t('header.Nocopy'))
          return
        }
        copy(data)
        this.$message.success(this.$t('header.copySuccess'))
    },
  }
}
</script>

<style lang="less">
.card-series-wrap {
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  .series-top {
    position: relative;
    height: 133.14px;
    min-width: 300px;
    // width: 367px; 
    .series-bg-img {
      width: 100%;
      height: 100%; 
      overflow: hidden;
      background-position: center;
      background-size: cover;
      img {
        width: 100%;
        height: 100%; 
        object-fit: cover;
      }
    }
    .series-icon-box {
      position:absolute;
      bottom: -28px; 
      width: 100%;
      .series-icon-border {
        margin: 0 auto; 
        height: 56px;
        width: 56px;
        overflow:hidden;
        border-radius: 50%;
      }
      .series-icon { 
        margin: 0 auto; 
        height: 56px;
        width: 56px; 
        border-radius: 50%;
        // border: 2px solid;
        // overflow:hidden;
        position: relative;
        img {
          height: 56px;
          width: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          border: 2px solid;
          overflow:hidden;
        }
        .chain-icon {
          position:absolute;
          right: -2px;
          bottom: -2px;
          width: 16px;
          height: 16px;
          border: 1px solid #fff; 
          background-color: #f2f2f5;
          border-radius: 50%;
        }
      }
    }
  }
  .series-info {
    padding: 20px;
    margin-top:16px;
    .info-name {
      font-size: 18px;
      line-height: 21.6px;
      height:21.6px;
      font-weight: 600;
      span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      }
    }
    .info-address {
      margin-top: 6px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      img {
        width: 16px;
        margin-left: 5px;
      }
    }
    .nft-status {
      margin-top: 16px;
      .nft-status-field {
        text-align: center;
        .value {
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
        }
      }
    }
    .order-status {

    }
    .line {
      margin: 16px 0 12px;
      height: 1px;
    }
  }
}
</style>