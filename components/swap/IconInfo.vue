<template>
  <div class="icon-box">
    <div v-show="!imgError" class="icon-img">
       <img  class="icon" :src="icon" :alt="name" @error="onImgError" @load="onImgLoad">
    </div> 
    <div v-show="imgError" class="error-img BG3">{{name&&name.toLocaleUpperCase().slice(0,1) }}
    </div>
  </div>
</template>

<script> 
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      imgError:true
    }
  },
  methods: {
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

.icon-box {
  .icon-img {
    width:16px;
    height:16px;
    border-radius: 50%;
    margin-right:4px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .error-img {
    width:20px;
    height:20px;
    border-radius: 50%;
    position: relative;
    text-align: center;
    line-height: 20px;
    color:#919899;
    margin-right:4px;
    img{
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
    }
  }
}
</style>
