<template>
  <span class="sort-label">
    <span>{{ label }}</span>
    <span
      v-if="sort"
      class="icons"
      :class="'state-' + state">
      
      <img v-if="state==1"  class="up" src="@/assets/img/components/market/icon-up-arrow-active.svg" />
      <img v-else class="up" src="@/assets/img/components/market/icon-up-arrow.svg" />
      <img v-if="state==2" class="down" src="@/assets/img/components/market/icon-up-arrow-active.svg" />
      <img v-else class="down" src="@/assets/img/components/market/icon-up-arrow.svg" />
       
    </span>
  </span>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    label: String,
    color: {
      default: 'white'
    },
    state: {
      default: 0
    },
    sort: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.sort-label { 
  font-family: 'PingFang SC';
  user-select: none;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  padding: 0 2px;
  font-weight: 500;
  font-size: 12px;
  .icons {
    opacity: 1;
  }
  &:hover {
    background-color: rgba(255,255,255, .1);
    border-radius: 2px;
    .icons {
      opacity: 1;
    }
  }
}
.icons {
  margin-left: 2px;
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  &.state-1 .down,
  &.state-2 .up {
    opacity: 1
  }
}
img {
  display: block;
  width: 100%;
  // height: 5px;
  opacity: .6;
  // box-sizing: border-box;
  // border-left-width: 1px;
  // border-top-width: 1px;
  // border-style: solid;
}
img.up {
  // transform: rotate(45deg);
}
img.down {
  transform: rotate(-180deg);
}
</style>
