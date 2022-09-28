<template>
  <div class="icon-box" :style="{'width':imgWidth}" :title="toUpperCase(coinName)"> 
    <img v-show="this.isImage" class="icon" :style="{'width':imgWidth,'height':imgWidth}" :src="icon" :alt="coinName" @error="onImgError" @load="onImgLoad">
    <span v-show="!this.isImage" style="width: 28px;height: 28px;overflow: hidden;border-radius: 50%;" class="BG3 lineBG2 text4 icon">{{userInitial}}</span>
    <img v-show="isChainImage"  class="chain-icon BG2 lineBG2" :src="chainImg" :alt="chainName" @onChainImgError="onChainImgError" @load="onChainImgLoad">  
    <!-- <img v-if="chainName" :src='"@/assets/img/components/Mainnet/" + chainName.toUpperCase() + "_GRAY.png"' :alt="item" /> -->
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
    }
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
        return text.trim().slice(0, 3).toUpperCase();
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
    width: 16px;
    border: 1px solid #fff; 
    // background-color: #f2f2f5;
    border-radius: 50%;
  }
}
</style>
