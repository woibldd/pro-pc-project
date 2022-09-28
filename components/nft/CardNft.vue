<template>
  <div class="card-nft-wrap pointer" @click="handleChangeChecked" :class="[checked ? 'linePurple' : 'lineBG2']">
    <div class="nft-banner" :style="{backgroundImage: `url(${require('@/assets/img/components/nft/default-nft-card.png')})`}" > 
      <svg class="occupy-img" width="24" height="24" viewBox="0 0 24 24" fill="none">
      </svg>
      <div v-if="checkTv(info.nft_icon)" class="nft-img-box">
        <video :src="info.nft_icon"></video>
      </div>
      <div v-else-if="checkImg(info.nft_icon)" class="nft-img-box"> 
        <img class="nft-img" v-show="!imgBannerError" :src="info.nft_icon" alt=""  @error="onBannerImgError" @load="onBannerImgLoad">
      </div>
      <!-- <img class="nft-img" :src="info.nft_icon" alt=""> -->
      <!-- <img class="nft-img" v-show="!imgBannerError" :src="info.nft_icon" alt=""  @error="onBannerImgError" @load="onBannerImgLoad"> -->
      <!-- <img class="nft-img" v-show="imgBannerError" src="@/assets/img/components/nft/default-nft-card-bg.png" alt=""> -->
      <!-- <img class="nft-img2" v-show="imgBannerError" src="@/assets/img/components/nft/default-nft-card.png" alt=""> -->
      <div class="check-box" :class="{checked:checked}">
        <img v-if="checked" src="@/assets/img/components/nft/series/icon-checked.svg" alt="">
      </div>
    </div>
    <div class="nft-info">
      <div class="nft-info-row" flex="main:justify">
        <div class="nft-info-name text1">
          {{info.collection_name}} {{info.nft_name}}
        </div>
        <div class="nft-info-state Colorpurple Common_light_purple">
          <!-- {{statusDict[info.status] || statusDict[0]}} -->
          {{$t(`nft.orders.orderDict.${info.status || 0}`)}}
        </div>
      </div>
      <div class="nft-info-order-box"> 
        <div v-if="info.status == 1" class="nft-info-order price"   >
          <span class="text1">
            <CoinIcon :chain="info.chain"></CoinIcon>{{info.price}} 
          </span>
          <span class="fiat-price text3" >
            ~<fiatMoney  :base="info.symbol" :value="info.price"></fiatMoney>
          </span>
        </div>
        <div v-if="info.status == 1" class="nft-info-order date">
          <span class="text2">{{$t('nft.surplus')}}</span>
          <span class="text2"  v-if="countDown[0] <= 365">
            <!-- {{countDown[0]}} 天 {{countDown[1]}} 小时 -->
            {{$t('nft.format', {d: countDown[0],h: countDown[1]})}}
          </span>
          <span v-else>
            {{$t('nft.orders.toSold')}}
          </span>
        </div>
        <div v-if="info.status == 1" class="nft-info-order date"> 
          <span class="text2" v-if="countDown[0] <= 365">{{dateFormat(info.sale_end_time)}}</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {parseTime} from '@/utils/public' 
import CoinIcon from '@/components/nft/CoinIcon'
import fiatMoney from '@/components/nft/FiatMoney'
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checked: {
      type: Boolean,
      default: false,
    }
  },
  components: {fiatMoney, CoinIcon},
  data() {
    return {
      // checked: false, 
      imgBannerError: false,
      statusDict: {
        0: '待出售',
        1: '出售中',
        2: '已取消',
        3: '超出出售时间',
        4: '成功售出',
        5: '上架中',
      }
    }
  },
  computed: {
    countDown() { 
      let end = (new Date(this.info.sale_end_time || 0)).getTime()
      let now = (new Date()).getTime()
      let dist = end - now
      console.log({dist, now})
      if (dist > 0) {
        let day = Math.floor(dist / 1000 / 60 / 60 / 24) 
        let surplus = dist % ( 1000  * 60 * 60 * 24)
        let hour = Math.floor(surplus / 1000 / 60 / 60 ) 
        // let hour = Math.floor(dist / 60 / 60 % 24);//时
        return [day, hour]
      } else {
        return [0, 0]
      }
    },
  },
  methods: {
    parseTime,
    onBannerImgError(event) {  
      this.imgBannerError = true
    },
    onBannerImgLoad(event) { 
      this.imgBannerError=false
    },
    dateFormat(date) {
      if (!date) return '--'
      else {
        return parseTime(date)
      }
    },
    handleChangeChecked() {
      // this.checked = !this.checked
      this.$emit('checkdChange', !this.checked)
    },
    checkImg(url='') {
      var img_id = url; //根据id得到值
      var index= img_id.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
      img_id=img_id.substring(index); //截断"."之前的，得到后缀
      if (img_id!=".bmp"&&img_id!=".png"&&img_id!=".gif"&&img_id!=".jpg"&&img_id!=".jpeg"){  //根据后缀，判断是否符合图片格式
        // alert("不是指定图片格式,重新选择"); 
        // document.getElementById('movie_img').value="";  // 不符合，就清除，重新选择
        // console.log('checkImg false', img_id)
        return false 
      } else {
        // console.log('checkImg true', img_id)
        return true
      }
    },
    checkTv(url='') {
      var tv_id = url;//根据id得到值
      var index= tv_id.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
      tv_id=tv_id.substring(index); //截断"."之前的，得到后缀
      if(tv_id!=".mp4"&&tv_id!=".rmvb"&&tv_id!=".avi"&&tv_id!=".ts"){ //根据后缀，判断是否符合视频格式
        // alert("不是指定视频格式,重新选择"); 
        // document.getElementById('movie_tv').value="";   // 不符合，就清除，重新选择
        // console.log('checkTv false', tv_id)
        return false 
      } else {
        // console.log('checkImg true', tv_id)
        return true
      }
    } 
  }
}

</script>

<style lang="less"> 
.card-nft-wrap { 
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  .nft-banner {
    position: relative;
    // background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #F8F8F9;
    .occupy-img { 
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
    .nft-img-box {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width:100%;
    }
    .nft-img {
      width: 100%; 
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
    .check-box {
      position:absolute;
      top:10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border: 1px solid #ffffff;
      border-radius: 50%;
      img {
        width: 100%;
      }
      &.checked {
        border: none;
      }
    }
  }
  .nft-info {
    padding: 10px;
    .nft-info-name {
      width: 146px;
      height: 44px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      overflow: hidden;
    }
    .nft-info-state {
      padding: 4px 10px;
      height: 29px;
      white-space: nowrap;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      border-radius: 4px;
    }
    .nft-info-row {
      margin-bottom: 12px;
    }
    .nft-info-order-box { 
      height: 54px;
    }
    .nft-info-order {
      &.price {
        margin-top: 4px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 14px;
        .fiat-price {
          font-weight: 500;
        }
      }
      &.date {
        margin-top: 4px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    }

  }
}
</style>