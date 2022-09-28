<template>
  <div class="icon-box BG0 lineBG2" :style="{'width':imgWidth,'height':imgWidth}" :title="toUpperCase(coinName)"> 
    <img v-show="this.isImage" class="icon" :style="{'width':imgWidth,'height':'auto'}" :src="icon" :alt="coinName" @error="onImgError" @load="onImgLoad">
    <span v-show="!this.isImage" :style="{'width':imgWidth,'height':imgWidth,'overflow': 'hidden','border-radius':' 50%'}" class="BG3 lineBG2 text4 icon">{{userInitial}}</span>
    <img v-show="isChainImage"  class="chain-icon BG2 lineBG2" :style="{'width':chaincionWidth,'height':chaincionWidth}" :src="chainImg" :alt="chainName" @onChainImgError="onChainImgError" @load="onChainImgLoad">  
  </div>
</template>

<script> 
export default {
  name: 'IconInfo',
  props: {
    icon: {
      type: String,
      default: '',
    },
    coinName: {
      type: String
    },
    chainIcon: {
      type: String,
      default: '',
    },
    chainName: {
      type: String,
      default: ''
    },
    imgWidth:{
      type:String,
      default:"28px"
    },
    showtext:{
      type:Number,
      default:3
    },
    chaincionWidth:{
      type:String,
      default:"16px"
    },
  },
  data() {
    return {
      imgError: true,
      imgChainError: true
    }
  },
  computed: {
    isImage() {
      return !this.imgError && Boolean(this.icon)
    },
    isChainImage() {
      return !this.imgChainError && Boolean(this.chainImg)
    },
    userInitial() {
      if (!this.isImage) {
        const initials = this.imgDefault(this.coinName)
        return initials
      }
      return ''
    },
    chainImg() {
      try { 
        return require('@/assets/img/components/Mainnet/' + this.chainName.toUpperCase() +'_GRAY.png')
      } catch {
        return ''
      }
    }
  },
  methods: {
    onImgError(event) {
      this.imgError = true
    },
    onImgLoad(event) {
      this.imgError = false
    },
    onChainImgError(event) {
      this.imgChainError = true
    },
    onChainImgLoad(event) {
      this.imgChainError=false
    },
    imgDefault(text='abcd') {
       //中文检测
      if (text.match(/[\u4e00-\u9fa5]/g)) {
        return text.trim().slice(0, 2)
      } else {
        return text.trim().slice(0, this.showtext).toUpperCase();
      }
    },
    toUpperCase(text='') {
      return text.toUpperCase()
    }
  }
}
</script>

<style lang="less" scoped>

.icon-box {
  position: relative;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    font-size: 12px;
  }
  .chain-icon {
    position:absolute;
    right: -6px;
    bottom: -4px;
    border: 1px solid #fff; 
    // background-color: #f2f2f5;
    border-radius: 50%;
  }
}
</style>
