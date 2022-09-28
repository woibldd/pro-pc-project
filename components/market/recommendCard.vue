<template>
  <div class="recommend-cord-content lineBG5" v-resize="domResize" >
    <h2 class="handle text2 " :title="title">
      {{title}}
    </h2>
    <div class="list">
      <div 
        v-for="(item, index) in list" 
        v-show="index<3" 
        :key="index"
         @click="gotoTrade(item)">
        <a class="list-row coin-content"  :href='`/${params.language}/swap/${item.chain}/${item.contract?item.contract:"bitkeep"}` ' @click="preventDefault('', $event)">
          <div class="list-col">
            <div class="icon-box"> 
              <coinIcon  :icon="item.icon" :chainIcon="item.chainIcon" :coinName="item.coin.toUpperCase()" :chainName="item.chain" imgWidth="28px"/>
            </div>
            <label class="text1 coin-name" :title="item.coin.toUpperCase()">{{item.coin.toUpperCase()}}</label>
          </div>
          <div class="list-col" v-if="size=='l'">
            <label :title="item.priceText" class="text1 ellipsis">{{item.priceText}}</label> 
          </div>
          <div class="list-col">
            <label :title="item.percent" :class="['price', 'ellipsis', {up:item.percentNum > 0, down: item.percentNum <= 0}]">{{item.percent}}</label>  
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import coinIcon from '@/components/market/coinIcon.vue'
export default {
  components: {
      coinIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    Type:{
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      size: 'm',
      params: this.$route.params
    }
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
  } ,   
  methods: { 
    gotoTrade(item) {
      this.$emit('gotoSwap', item,this.Type)
    },
    domResize(data) {
      let {width, height} = data
      let nWidth = +width.replace('px', '')
      if (nWidth >= 301) {
        console.log('l', nWidth)
        this.size = 'l'
      } else if (nWidth <300 ) {
        console.log('m', nWidth)
        this.size = 'm'
      }  
    },
    preventDefault(path, event) {
        if (event && event.preventDefault)
            event.preventDefault();
        else
            window.event.returnValue = false; //兼容IE8
    }
           
  },
}
</script>

<style lang="less" >
.recommend-cord-content {
  margin-top: 20px;
  border: 1px solid ; 
  border-radius: 6px;
  font-size: 12px; 
  .handle {
    padding: 11px 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .list {
    .list-row {
      display: flex;
      padding: 10px 20px;
      .list-col {
        display: flex;
        flex: 1;
        line-height: 28px;
        white-space: nowrap;
        font-weight: 500;
        font-size: 14px;
        &:first-child {
          text-align: left;

        }
        &:not(:first-child) {
          text-align: right;
          justify-content: end;
        }
        .icon-box {
          position: relative;
          margin-right: 3px;
          width: 28px; 
          .icon {
            width: 28px; 
          }
          // .chain-icon {
          //   position:absolute;
          //   right: -2px;
          //   bottom: -2px;
          //   width: 12px;
          //   border: 1px solid #fff;
          //   background-color: #f2f2f5;
          //   border-radius: 50%;
          // }
        }
        .price {
          &.up {
            color: #1BC89E;
          }
          &.down {
            color: #F36464;
          }
        }
        .coin-name {
          white-space: nowrap;
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
          font-size: 14px;
          margin-left: 5px;
        }
        .ellipsis {
          display: block;
          white-space: nowrap;
          max-width: 85px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -1px;
        }
      }
    }
  }

}

.theme-light {
  .coin-content:hover {
    cursor: pointer;
    background-color: @theme-light-bg1;
  }
}
.theme-dark {
  .coin-content:hover {
    cursor: pointer;
    background-color: @theme-dark-bg1;
  }
}
</style>