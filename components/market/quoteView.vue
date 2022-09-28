<template>
  <div class="quote-view-content" :class="{ up: isUp, down: !isUp }" v-resize="domResize"
    :title="coinData.coin.toUpperCase()">
    <div @click="gotoTrade">
      <a class="quote-view-bd" :class="{ middle: size == 'm' }"
        :href='`/${params.language}/swap/${coinData.chain}/${coinData.contract ? coinData.contract : "bitkeep"}`'
        @click="preventDefault('', $event)">
        <div class="dr">
          <div class="dr-l">
            <label :title="coinData.coin" class="coin text1 ellipsis">{{ coinData.coin.toUpperCase() }}</label>
          </div>
          <div class="dr-r">
            <label :title="coinData.percent" class="percent ellipsis">{{ coinData.percent }}</label>
          </div>
        </div>
        <div class="dr" :class="{ middle: size == 'm', small: size == 's' }">
          <div class="dr-l view">
            <label>
              <canvas :class="{ vmiddle: vsize == 'm', vsmall: vsize == 's' }" class="myCanvas" ref="myCanvas" :width="width"
                :height="height" />
            </label>
          </div>
          <div class="dr-r">
            <label :title="coinData.priceText" class="price ellipsis">
              {{ coinData.priceText }}
            </label>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash' 
import { BigNumber } from "bignumber.js";
export default {
  props: {
    delta: {
      type: [Number, String],
      defalut: 0
    },
    coinData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      list: [],
      max: 0,
      min: 0,
      colors: {
        up: ['#1BC89E'],
        down: ['#F36464'],
      },
      size: 'm',
      vsize: 'm',
      width: 200,
      height: 56,
      params: this.$route.params
    }
  },
  computed: {
    isUp() {
      return this.delta > 0
    },
    curColor() {
      return this.isUp ? this.colors.up : this.colors.down
    },
  },
  watch: {
    curColor() {
      this.init()
    }
  },
  directives: { // 使⽤局部注册指令的⽅式
    resize: { // 指令的名称
      bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = '', height = '';
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value({ width: style.width, height: style.height }); // 关键
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
    init() {
      this.coinData.kline.list.map(item => {
        if (!item.buyVolume) {
          item.close = Number(item.close)
          item.high = Number(item.high)
          item.low = Number(item.low)
          item.open = Number(item.open)
        }
        return item
      })
      let canvas = this.$refs.myCanvas
      let ctx2 = canvas.getContext('2d');
      ctx2.clearRect(0, 0, this.width, this.height)
      if (canvas && this.coinData) {
        const list = []
        const kline = this.coinData.kline
        kline.list.map((item, index) => {
          list.push(+(item.high + item.low) / 2)
        })
        const max = kline.max // _.max(list) //最高价格
        const min = kline.min // _.min(list) //最低价格
        const diff = BigNumber(max).minus(min)  //价格差值
        const start = BigNumber(min).minus(BigNumber(diff).times(0.1)) //起点价格
        const end = BigNumber(max).plus(BigNumber(diff).times(0.1)) //终点价格  
        // const xstep = BigNumber(1).div(80).times(end.minus(start)) //价格1的步长
        const xstep = diff.gt(0) ? BigNumber(this.height).div(end.minus(start)) : 0
        const ystep = BigNumber(this.width).div(list.length) //一个时间点的步长 
        ctx2.beginPath();
        // console.log({max, min, diff:+diff, start:+start, end:+end, xstep:+xstep, ystep:+ystep, list})

        let first = [0, 0]
        let last = [this.width, 0]
        list.map((item, index) => {
          let y = +BigNumber(this.height).minus(BigNumber(item).minus(start).times(xstep || 1))
          let x = +BigNumber(index).times(ystep)
          ctx2.lineTo(x, y)
          if (index === 0) {
            first = [x, y]
          }
          if (index === list.length - 1) {
            last = [x, y]
          }
        })
        ctx2.strokeStyle = this.curColor[0]//'#3ac9a6' 
        ctx2.lineWidth = 4;
        ctx2.stroke()
        this.list = list
        this.max = max
        this.min = min
      }
    },
    gotoTrade() {
      this.$emit('gotoSwap', this.coinData)
    },
    domResize(data) {
      let { width, height } = data
      let nWidth = +width.replace('px', '')
      if (nWidth >= 237) {
        console.log('l', nWidth)
        this.size = 'l'
      } else if (nWidth < 237) {
        console.log('m', nWidth)
        this.size = 'm'
      }
      if (nWidth > 150) {
        this.vsize = 'l'
      } else {
        this.vsize = 'm'
      }
    },
    preventDefault(path, event) {
      if (event && event.preventDefault)
        event.preventDefault();
      else
        window.event.returnValue = false; //兼容IE8
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.quote-view-content {
  border-radius: 6px;
  box-sizing: border-box;

  label {
    cursor: pointer;
    display: inline-block;
  }

  .dr {
    display: flex;
    justify-content: space-between;

    &.middle {
      display: block;
      position: relative;
      padding-top: 33px;

      .dr-r {
        position: absolute;
        top: 0;
        right: 0;
      }

      .dr-l.view {
        margin-top: 0;
      }
    }

    .myCanvas {
      width: 98px;
      height: 28px;
    }

    .vmiddle.myCanvas {
      width: 85px;
      height: 20px;
    }

    .dr-r {
      text-align: right;
    }
  }

  .quote-view-bd {
    display: block;
    padding: 10px;
    box-sizing: border-box;
  }

  &.up {
    background: #1BC89E1A;
    color: #1BC89E;

    a {
      color: #1BC89E;
    }
  }

  &.down {
    background: #F364641A;
    color: #F36464;

    a {
      color: #F36464;
    }
  }

  .coin {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
  }

  .percent {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
  }

  .price {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 2px;
    letter-spacing: -1px;
  }

  .view {
    margin-top: 15px;
  }

  .ellipsis {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

}

@media screen and (min-width: 1568px) {

  .coin,
  .percent,
  .price {
    max-width: 95px;
  }

  .price {
    max-width: 121px;
  }
}

@media screen and (max-width: 1567px) and (min-width: 1221px) {

  .coin,
  .percent {
    max-width: 80px;
  }

  .price {
    max-width: 160px;
  }
}

@media screen and (max-width: 1220px) and (min-width: 1001px) {
  .quote-view-content {

    .coin,
    .percent {
      max-width: 60px;
      font-size: 14px;
    }

    .price {
      max-width: 120px;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 1000px) and (min-width: 831px) {
  .quote-view-content {

    .coin,
    .percent {
      max-width: 50px;
      font-size: 13px;
    }

    .price {
      max-width: 100px;
      font-size: 17px;
    }
  }
}



@media screen and (max-width: 830px) and (min-width: 421px) {
  .quote-view-content {
    .quote-view-bd.middle {
      .coin {
        font-size: 12px;
      }

      .percent {
        font-size: 12px;
      }

      .price {
        margin-top: 5px;
        font-size: 14px;
        font-weight: bold;
      }

      .dr {
        .myCanvas {
          width: 85px;
          height: 20px;
        }
      }

      .coin,
      .percent {
        max-width: 47px;
      }

      .price {
        max-width: 85px;
      }

    }

  }
}


@media screen and (max-width: 420px) {
  .quote-view-content {
    .quote-view-bd.middle {
      .coin {
        font-size: 10px;
      }

      .percent {
        font-size: 10px;
      }

      .price {
        margin-top: 5px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0px !important;
      }

      .dr {
        .myCanvas {
          width: 65px;
          height: 20px;
        }
      }

      .coin,
      .percent {
        max-width: 50px;
      }

      .middle {

        .dr-r {
          width: 100%;
        }
      }

      .price {
        width: 100%;
      }

    }

  }
}
</style>