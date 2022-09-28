<template>
  <div class="optional-header BG0blur">
    <div class="vertical-scroll-wrap">
      <div class="next-icon-wrap leftwrap BG4 lineBG2" v-if="showIcon||dataLength>(verticaispc?15:6)"  @click="prevItem">   
        <img class="slide-arrow-left pointer light_icon"
                    src="@/assets/img/components/h5/dappStore/light/arrow_left.svg" alt="arrow_left">
        <img class="slide-arrow-left pointer dark_icon"  
            src="@/assets/img/components/h5/dappStore/dark/arrow_left.svg" alt="arrow_left">
      </div>
      <div class="vertical-scroll"
            ref="verticalScroll"
           :style="`height:${height}`">
        <div class="content vertical-item-market" style="display: flex;" ref="verticalItemMarket" >
          <!-- 可滑动内容 -->
          <slot name="content"></slot>
        </div>
      </div>
      <div class="next-icon-wrap rightwrap BG4 lineBG2" v-if="showIcon||dataLength>(verticaispc?15:6)" @click="nextItem"> 
          <img class="slide-arrow-right pointer light_icon"
              src="@/assets/img/components/h5/dappStore/light/arrow_right.svg" alt="arrow_right">
          <img class="slide-arrow-right pointer dark_icon"  
                    src="@/assets/img/components/h5/dappStore/dark/arrow_right.svg" alt="arrow_right">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  data () {
    return {
      showOptionalHeader: true,
      showNextIcon: true,
      clickNum: 0,
      lastLeft: 0,
      maxClickNum: 0, // 最大点击次数 
      showIcon: false,
      timer: null,
    }
  },
  props: {
    //高度
    height: {
      type: String,
      default: '60px'
    },
    //prev颜色
    preIconColor: {
      type: String,
      default: '#000'
    },
    // next 颜色
    nextIconColor: {
      type: String,
      default: '#000'
    },
    //   数据条数
    dataLength: {
      type: Number,
      default: 0,
      required: true
    }, 
    verticaispc:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    showPrevIcon () {
      return this.clickNum > 0
    },
    clientWidth() {
      return this.$refs?.verticalItemMarket?.clientWidth || 0
    }, 
  }, 
  directives: { // 使⽤局部注册指令的⽅式
    resize: { // 指令的名称
      bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = '', height = '';
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value({width:style.width, height: style.height}); // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 600);
        },
        unbind(el) { 
        clearInterval(el.__vueSetInterval__);
      }
    }
  },
  methods: {
    nextItem () { 
      // 如果点击次数小于数组长度-1时，执行左滑动效果。
 
        // this.$refs.verticalScroll.scrollLeft += 80
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.scrollAnimation(this.$refs.verticalScroll, this.$refs.verticalScroll.scrollLeft, this.$refs.verticalScroll.scrollLeft + 100)
    },
    prevItem () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.scrollAnimation(this.$refs.verticalScroll, this.$refs.verticalScroll.scrollLeft, this.$refs.verticalScroll.scrollLeft - 100)
    },
    scrollAnimation(el, currentY, targetY) {
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      this.timer = setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist 
        el.scrollTo(_currentY, currentY)
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(el, _currentY, targetY)
        } else { 
          el.scrollTo(_currentY, targetY)
        }
      }, 10)
    },
    async setNextIcon () {
      //获取当前元素宽度
      let lastItemOffsetLeft = document.querySelectorAll('.item-label')[this.optionalArr.length - 1]?.offsetLeft
      let lookWidth = document.querySelector('.vertical-scroll')?.clientWidth
      this.showNextIcon = lastItemOffsetLeft > lookWidth
    }, 
    domResize(data) {
      if (this.$refs.verticalScroll && this.$refs.verticalItemMarket) { 
          this.showIcon = this.$refs.verticalScroll.clientWidth <= this.$refs.verticalItemMarket.clientWidth  
      }
    }, 
  }, 
}
</script>
<style lang='less' scoped >
.optional-header {
  width: 100%; 
}
.optional-header::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  z-index: -1;
  backdrop-filter: blur(20px);
}
.vertical-scroll-wrap {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  .label-value {
    line-height: 16px;
    margin-top: 3px;
    font-size: 13px;
    font-style: bold;
  }
  .slide-arrow-left {
    margin-right: 6px;
  }

  .label {
    line-height: 16px;
  }

    .next-icon-wrap {
       width: 32px;
       height: 32px;
       display: flex;
       justify-content: center;
       border-radius:100px;
       align-items: center;
       border: 1px solid;
       position: relative;
    }
    .leftwrap{
        left: 0;
    }
    .rightwrap{
        right: 0;
    }
  .vertical-scroll {
    overflow: scroll;
    flex: 1;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }
    .item {
      flex-shrink: 0;
    }
    .vertical-item,
    .vertical-item-market {
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      cursor: pointer;
      #item {
        margin-right: 30px;
      }
    }
  }
  .left-prev {
    padding-right: 10px;
  }
  .right-next {
    padding-left: 10px;
  }
  .left-prev,
  .right-next {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
}


.theme-light {
  .arrow {
    color: @theme-light-arrow;
  }
}

.theme-dark {
  .arrow {
    color: @theme-dark-arrow;
  }
}
</style>