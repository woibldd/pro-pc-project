<template>
  <!-- 交易数据 -->
  <div class="echars-wrap">
    <div class="left lineBG2">
      <section>
        <h3 class="text1">
          {{ $t('SwapDetail.dealData.title1') }}
        </h3>
        <div class="tip-text">
          <p><span class="dot bugdot" /><span class="text3"> {{ $t('SwapDetail.dealData.title2')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statAddressList && statAddressList.allBuy }}</span></p>
          <p><span class="dot selldot" /><span class="text3">{{ $t('SwapDetail.dealData.title3')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statAddressList && statAddressList.allSell }}</span></p>
        </div>
        <div class="chart-part" />
      </section>
      <section v-if="isPC">
        <div class="title-nav-liu">
          <h3 class="text1">
            {{ $t('SwapDetail.dealData.title11') }}
          </h3>
          <h3 class="text1" />
        </div>
        <div class="tip-text">
          <p><span class="dot bugdot" /><span class="text3"> {{ $t('SwapDetail.dealData.title5')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statLineData && statLineData.allBuyVol }}</span></p>
          <p><span class="dot selldot" /><span class="text3">{{ $t('SwapDetail.dealData.title6')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statLineData && statLineData.allSellVol }}</span></p>
        </div>
        <div class="chart-part" />
      </section>
    </div>
    <div class="right">
      <section>
        <h3 class="text1">
          {{ $t('SwapDetail.dealData.title4') }}
        </h3>
        <div class="tip-text">
          <p><span class="dot bugdot" /><span class="text3"> {{ $t('SwapDetail.dealData.title7')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statTrade && statTrade.allBuy }}</span></p>
          <p><span class="dot selldot" /><span class="text3">{{ $t('SwapDetail.dealData.title8')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statTrade && statTrade.allSell }}</span></p>
        </div>
        <div class="chart-bing" />
      </section>
      <section class="text-summer" style="margin-top:40px;">
        <ul class="captial-view lineBG2">
          <li class="text3">
            <p>{{ textList[0] }}</p>
            <p style="color:#1BC89E;font-weight: 500;position:relative;">
              {{ statTrade && statTrade.allBuyLarge }}
              <span class="text3" style="position:absolute;right:0;top:-35px;">{{ $t('SwapDetail.dealData.title9')
              }}</span>
            </p>
            <p style="color:#F36464;font-weight: 500;position:relative;">
              {{ statTrade && statTrade.allSellLarge }}
              <span class="text3" style="position:absolute;right:0;top:-35px;">{{ $t('SwapDetail.dealData.title10')
              }}</span>
            </p>
          </li>
          <li class="text3">
            <p>{{ textList[1] }}</p>
            <p style="color:#1BC89E;font-weight: 500;">
              {{ statTrade && statTrade.allBuyMiddle }}
            </p>
            <p style="color:#F36464;font-weight: 500;">
              {{ statTrade && statTrade.allSellMiddle }}
            </p>
          </li>
          <li class="text3">
            <p>{{ textList[2] }}</p>
            <p style="color:#1BC89E;font-weight: 500;">
              {{ statTrade && statTrade.allBuySmall }}
            </p>
            <p style="color:#F36464;font-weight: 500;">
              {{ statTrade && statTrade.allSellSmall }}
            </p>
          </li>
        </ul>
      </section>
    </div>
    <div class="left lineBG2" style="padding-top:20px" v-if="!isPC">
      <section>
        <div class="title-nav-liu">
          <h3 class="text1">
            {{ $t('SwapDetail.dealData.title11') }}
          </h3>
          <h3 class="text1" />
        </div>
        <div class="tip-text">
          <p><span class="dot bugdot" /><span class="text3"> {{ $t('SwapDetail.dealData.title5')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statLineData && statLineData.allBuyVol }}</span></p>
          <p><span class="dot selldot" /><span class="text3">{{ $t('SwapDetail.dealData.title6')
          }}</span>&nbsp;:&nbsp;<span class="text1">{{ statLineData && statLineData.allSellVol }}</span></p>
        </div>
        <div class="chart-part" />
      </section>
    </div>
  </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'DealData',
  data() {
    return {
      textList: this.$t('SwapDetail.dealData.textList'),
      dotData: [],
      drawPieEchart: null,
      drawEcharsDom: null,
      drawEcharsDom2: null,
      echarts: null
    }
  },
  computed: mapState({
    statAddressList: state => state.swap.statAddressList && state.swap.statAddressList,
    statTrade: state => state.swap.statTrade && state.swap.statTrade,
    statLineData: state => state.swap.statLineData && state.swap.statLineData,
    isPC: state => state.isPC
  }),
  mounted() {
    this.echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/grid');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    require('echarts/lib/chart/pie');
    this.pieData()
  },
  watch: {
    "$route"(res, old) {
      const { language } = res.params;
      if (language != old.params.language) {
        this.init()
      }
    },
    "$store.state.theme"(res, old){
      this.init()
    }    
  },
  methods: {
    ...mapGetters(['GetTheme']),
    init() {
      // 数据处理
      let time1 = []
      let buy1 = []
      let sell1 = []
      let time2 = []
      let buy2 = []
      let sell2 = []
      this.statAddressList.list.forEach((item) => {
        time1.push(item.time.slice(-8, -3))
        buy1.push(item.buy)
        sell1.push(item.sell)
      })
      this.statLineData.list.forEach((item) => {
        time2.push(item.time.slice(-8, -3))
        buy2.push(item.buyVolume)
        sell2.push(item.sellVolume)
      })
      // 判断获取正确dom
      let chartDoms = document.querySelectorAll('.chart-part')
      let chartPie = document.querySelector('.chart-bing')
      let chartArrInfo = [
        {
          time: time1,
          buy: buy1,
          sell: sell1
        },
        {
          time: time2,
          buy: buy2,
          sell: sell2
        }
      ]
      this.drawEchars(chartDoms[0], chartArrInfo[0])
      this.drawEchars2(chartDoms[1], chartArrInfo[1])
      this.drawPie(chartPie)
    },
    drawEchars(dom, data) {
      this.drawEcharsDom = this.echarts.init(dom)
      const  theme  = this.GetTheme()
      this.drawEcharsDom.setOption({
        grid: {
          top: 50,
          bottom: 50,
          left: 30,
          right: 0
        },
        xAxis: {
          type: 'category',
          data: data.time,
          axisLine: {
            lineStyle: {
              color: theme === 'light' ? '#F2F2F5' : '#2A292E'
            }
          },
          axisLabel: {
            color: theme === 'light' ? '#919899' : '#707076',
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: theme === 'light' ? '#919899' : '#707076',
          },
          splitLine: {
            lineStyle: {
              color: theme === 'light' ? '#F2F2F5' : '#2A292E'
            }
          }
        },
        series: [
          {
            data: data.buy,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#1BC89E',
              width: 2
            },
            symbol: 'none'
          },
          {
            data: data.sell,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#F36464',
              width: 2
            },
            symbol: 'none'
          }
        ]
      })
    },
    drawEchars2(dom, data) {
      const maxNum=(data.buy.concat(data.sell)).sort((a,b)=>{
        return b-a
      })
      this.drawEcharsDom2 = this.echarts.init(dom)
      const  theme  = this.GetTheme()
      this.drawEcharsDom2.setOption({
        grid: {
          top: 30,
          bottom: 30,
          left: maxNum?String(parseInt(maxNum[0])).length*9.3:"10%",
          right:0
        },
        xAxis: {
          type: 'category',
          data: data.time,
          axisLine: {
            lineStyle: {
              color: theme === 'light' ? '#F2F2F5' : '#2A292E'
            }
          },
          axisLabel: {
            color: theme === 'light' ? '#919899' : '#707076',
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 6,
          axisLabel: {
            padding: 0,
            color: theme === 'light' ? '#919899' : '#707076',
            overflow: "truncate",
            ellipsis: "...",
            //考虑是否做格式处理
            // formatter: function (value, index) {
            //   if(String(value).length>6){
            //     return String(value).slice(0,6)+"{"+(String(value).length-6)+"}"
            //   }else{
            //     return value;
            //   }
            // }
          },
          splitLine: {
            lineStyle: {
              color: theme === 'light' ? '#F2F2F5' : '#2A292E'
            }
          }
        },
        series: [
          {
            data: data.buy,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#1BC89E',
              width: 2
            },
            symbol: 'none'
          },
          {
            data: data.sell,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#F36464',
              width: 2
            },
            symbol: 'none'
          }
        ]
      }, true)
    },
    drawPie(obj) {
      this.drawPieEchart = this.echarts.init(obj)
      this.updateEchars()
    },
    updateEchars() {//
      this.drawPieEchart && this.drawPieEchart.setOption({
        series: [
          {
            name: 'BitKeep',
            type: 'pie',
            radius: ['27%', '50%'],
            left: "0%",
            right: "0%",
            top: "0%",
            bottom: "0%",
            label: {
              show: true,
              position: 'outside',
              //formatter: '{d}%\n{b}',
              formatter: function (params) {
                return Number(params.value).toFixed(2) + "%" + '\n' + params.name
              },
              color:  this.GetTheme() === 'light' ? '#0E0E0E' : '#E5E5E5',
              width: 80
            },
            labelLine: {
              show: true
            },
            data: this.dotData
          }
        ]
      }, true)
      console.log(this.drawPieEchart)
    },
    rangeEchart() {
      this.drawPieEchart && this.drawPieEchart.resize()
      this.drawEcharsDom && this.drawEcharsDom.resize()
      this.drawEcharsDom2 && this.drawEcharsDom2.resize()
    },
    pieData() {
      this.dotData = [
        { value: this.$store.state.swap.statTrade.buyLargeRate, id: '1', name: this.$t('SwapDetail.dealData.text1'), itemStyle: { color: 'rgba(27, 200, 158, 1)' } },
        { value: this.$store.state.swap.statTrade.buyMiddleRate, id: '2', name: this.$t('SwapDetail.dealData.text2'), itemStyle: { color: 'rgba(27, 200, 158, 0.7)' } },
        { value: this.$store.state.swap.statTrade.buySmallRate, id: '3', name: this.$t('SwapDetail.dealData.text3'), itemStyle: { color: 'rgba(27, 200, 158, 0.3)' } },
        { value: this.$store.state.swap.statTrade.sellLargeRate, id: '4', name: this.$t('SwapDetail.dealData.text4'), itemStyle: { color: 'rgba(243,100,100,1)' } },
        { value: this.$store.state.swap.statTrade.sellMiddleRate, id: '5', name: this.$t('SwapDetail.dealData.text5'), itemStyle: { color: 'rgba(243,100,100,0.7)' } },
        { value: this.$store.state.swap.statTrade.sellSmallRate, id: '6', name: this.$t('SwapDetail.dealData.text6'), itemStyle: { color: 'rgba(243,100,100,0.3)' } }
      ]
      this.dotData = this.dotData.filter((item) => item.value > 0)
    }
  }
}
</script>
<style lang="less" scoped>
.echars-wrap {
  width: 100%;
  padding-top: 12px;
  padding-left: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;

  h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .tip-text {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 12px;
    padding-right: 20px;
    box-sizing: border-box;

    p {
      display: flex;
      align-items: center;

      //white-space: nowrap;
      span {
        display: block;
      }
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #1BC89E;
      margin-right: 5px;
    }

    .bugdot {
      background-color: #1BC89E;
    }

    .selldot {
      background-color: #F36464;
    }
  }

  .left {
    flex: 1;
    // padding-right:20px;
    box-sizing: border-box;
    border-right: 1px solid#F2F2F5;

    .chart-part {
      height: 300px;
      width: 100%;
      margin-left: -15px;
      padding-left: 20px;
    }

    .title-nav-liu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 50px;
      box-sizing: border-box;
    }

  }

  .right {
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .tip-text {
      padding-right: 0;
    }

    .chart-bing {
      width: 100%;
      height: 300px;
    }

    .captial-view-title {
      width: 100%;
      display: flex;
      max-width: 396px;
      //justify-content: space-between;
      padding: 4px 13px;
      box-sizing: border-box;
      font-size: 12px;
      font-weight: 500;

      span {
        flex: 1;
        text-align: right;
      }
    }

    .captial-view {
      width: 100%;
      max-width: 396px;
      margin: 0 auto;
      border: 1px solid #F2F2F5;
      border-radius: 6px;
      padding: 5px 20px 0px;
      box-sizing: border-box;

      li {
        display: flex;
        //justify-content: space-between;
        font-size: 12px;
        font-weight: 500;
        margin: 5px 0px 10px;

        p {
          flex: 1;
        }

        p:nth-child(2) {
          flex: 1;
          text-align: right;
        }

        p:nth-child(3) {
          flex: 1;
          text-align: right;
        }

        p:first-child {
          // width:40px;
          text-align: left;
        }
      }
    }
  }
}

@media only screen and (max-width: 820px) {
  .echars-wrap {
    display: block;
    padding-top: 12px;
    box-sizing: border-box;
    padding-right: 0px;

    .left {
      .chart-part {
        width: 100%;
        padding-right: 0px;
      }
    }

    .right {
      padding-left: 0px !important;
    }
  }
}
</style>
