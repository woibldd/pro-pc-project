<template>
  <div
    class="modal-bg"
    ref="bg"
    :class="{open: open}"
    @click.self="clickBackdrop">
    <div
      class="modal-wrap BG0">
      <slot/>
      <div name="close"> 
        <a
          class="close-btn"
          @click.prevent="close">
          <img src="@/assets/img/components/nft/icon-close-light.svg" class="light_icon" alt="">
          <img src="@/assets/img/components/nft/icon-close-dark.svg" class="dark_icon" alt="">
        </a>
      </div> 
    </div>
    <div
      class="modal-mask"
      @click.prevent="close"
      v-show="open"/>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  props: {
    bgColor: {
      type: String,
      default: 'white'
    },
    open: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickBackdrop () {
      if (this.backdrop) {
        this.$emit('update:open', false)
        this.$emit('close')
      }
    },
    close () {
      this.$emit('update:open', false)
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="less">


.modal-bg {
  z-index: 1001;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background-color: fade-out(black, .5);
  transition: opacity 300ms, visibility 0s 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
  &.open {
    opacity: 1;
    visibility: visible;
    transition: opacity 300ms;
  }
  .modal-wrap {
    position: relative;
    border-radius: 5px;
    z-index: 10;
    border-radius: 12px;
    padding: 0 0 20px 0;
    // border: 1px solid;
    box-shadow: 0px 0px 0px 1px #F2F2F5;
  }
  .modal-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: rgba(14, 14, 14, 0.3);
  }
  .close-btn { 
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    filter: grayscale(100%);
    // opacity: .3;
    transition: opacity 300ms;
    z-index: 1000;
    &:hover {
      opacity: .7;
    }
  }
}
</style>
