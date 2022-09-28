<template>
  <!-- 有专业版标示的 分专业版、基础版  专业版使用蜡烛图 基础版就是曲线版(曲线版其实就是k线的另一种展现形式) -->
  <div class="k-line-chart-container BG0" v-if="isSpecialty == 1">
    <div class="chart-top-bar">
      <div class="left">
        <span class="period text4" v-for='(item, index) in $t("SwapDetail.kLineTime")'
          :class="Chartcycle == index ? 'activeTime' : ''" @click="setTimeKine(index)">{{
              item
          }}</span>
      </div>
      <div class="right">
        <span class="period text4" v-for='(item, index) in $t("SwapDetail.KlineType")'
          :class="ChartType == index ? 'activeType' : ''" @click="setChartType(index)">{{
              item
          }}</span>
      </div>
    </div>
    <div id="custom-theme-k-line" class="k-line-chart" v-show="klineShow" />
    <div class="nokline-img" v-show="!klineShow">
      <img src="~/assets/img/swap/light/kline_noData.svg" alt="Bitkeep">
      <p class="text4">{{ $t('SwapDetail.klinenoData') }}</p>
    </div>
    <div class="loading-css" v-if="loadingFlag">
      <a-spin :spinning="true">
        <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
      </a-spin>
    </div>
    <div class="logo-img">
      <img class="light_icon" src="~/assets/img/swap/swap_kline_logo.svg" alt="Bitkeep">
      <img class="dark_icon" src="~/assets/img/swap/swap_kline_dark_logo.svg" alt="Bitkeep">
    </div>
  </div>
  <div class="k-line-chart-container BG0" v-else>
    <div class="notDataBox">
      <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
      <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
      <div class="text3 notData" :title='$t("SwapHome.noData")'>{{ $t("SwapHome.noData") }}
      </div>
    </div>
  </div>
</template>
<script>
import 'core.js';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { dispose, init } from "klinecharts"
import {mapGetters} from 'vuex'
const textColorDark = '#707076'
const gridColorDark = '#2A292E'
const crossTextBackgroundColorDark = '#373a40'
const crossLineColorDark = "#9E9DA6"

const crossLineColorLight = "#515556"
const textColorLight = '#919899'
const gridColorLight = '#F8F8F9'
const crossTextBackgroundColorLight = '#686d76'
function transferToNumber(inputNumber) {
  if (isNaN(inputNumber)) {
    return inputNumber
  }
  inputNumber = '' + inputNumber
  inputNumber = parseFloat(inputNumber)
  const eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  const number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
  return number
}
function getThemeOptions(theme, interval, language,isPC) {
  const textColor = theme === 'dark' ? textColorDark : textColorLight
  const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
  const axisLineColor = theme === 'dark' ? gridColorDark : gridColorLight
  const crossLineColor = theme === 'dark' ? crossLineColorDark : crossLineColorLight
  const crossTextBackgroundColor = theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
  return {
    grid: {
      // 网格水平线
      horizontal: {
        style: 'solid',
        color: gridColor
      },
      // 网格垂直线
      vertical: {
        style: 'solid',
        color: gridColor
      }
    },
    //蜡烛图
    candle: {
      //蜡烛图
      bar: {
        upColor: '#1BC89E',
        downColor: '#F36464',
        noChangeColor: '#1BC89E'
      },
      //面积图
      area: {
        lineSize: 2,
        lineColor: '#0075ff',
        value: 'close',
        backgroundColor: [{
          offset: 0,
          color: 'rgba(0,117,255, 0.01)'
        }, {
          offset: 1,
          color: 'rgba(0,117,255, 0.2)'
        }]
      },
      //开、收、高、低提示
      tooltip: {
        showRule: isPC?'always':'follow_cross',
        showType: isPC?'standard':'rect',
        rect: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 6,
          offsetLeft: 8,
          offsetTop: 8,
          offsetRight: 8,
          borderRadius: 4,
          borderSize: 1,
          borderColor: theme=="light"?'#F2F2F5':"#252529",
          backgroundColor:theme=="light"?"#F8F8F9":"#202024"
        },
        labels: language === 'zh'
          ? ['时间：', '开：', '收：', '高：', '低：', '涨跌幅：']
          : language === 'ko'
            ? ['시각：', '오픈：', '클로즈：', '고가：', '저가：', '변화：']
            : ['Time: ', 'Open: ', 'Close: ', 'High: ', 'Low: ', 'Change: '],
        values: kLineData => {
          const change = ((kLineData.close - kLineData.open) / kLineData.open * 100).toFixed(2)
          return [
            { value: interval == '1day' || interval == '1week' ? kLineData.time.slice(0, 10) : kLineData.time },
            {
              value: transferToNumber(kLineData.open),
              color: change < 0 ? '#F36464' : '#1BC89E'
            },
            {
              value: transferToNumber(kLineData.close),
              color: change < 0 ? '#F36464' : '#1BC89E'
            },
            {
              value: transferToNumber(kLineData.high),
              color: change < 0 ? '#F36464' : '#1BC89E'
            },
            {
              value: transferToNumber(kLineData.low),
              color: change < 0 ? '#F36464' : '#1BC89E'
            },
            {
              value: change > 0 ? `+${change}%` : `${change}%`,
              color: change < 0 ? '#F36464' : '#1BC89E'
            }
          ]
        },
        text: {
          size: 12,
          family: 'Inter',
          weight: 'normal',
          color: '#76808F',
          marginLeft: 8,
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0
        }
      },
      priceMark: {
        show: true,
        // 最高价标记
        high: {
          show: true,
          color: '#1BC89E',
          textMargin: 5,
          textSize: 10,
          textFamily: 'Inter',
          textWeight: 'normal'
        },
        // 最低价标记
        low: {
          show: true,
          color: '#F36464',
          textMargin: 5,
          textSize: 10,
          textFamily: 'Inter',
          textWeight: 'normal',
        },
        // 最新价标记
        last: {
          show: true,
          upColor: '#1BC89E',
          downColor: '#F36464',
          noChangeColor: '#1BC89E',
          line: {
            show: true,
            // 'solid'|'dash'
            style: 'dash',
            dashValue: [4, 4],
            size: 1
          },
          text: {
            show: true,
            size: 12,
            paddingLeft: 2,
            paddingTop: 4,
            paddingRight: 2,
            paddingBottom: 4,
            color: '#FFFFFF',
            family: 'Inter',
            weight: 'normal',
            borderRadius: 2,
          }
        }
      },
    },
    // 技术指标(MA、VOL这类的)
    technicalIndicator: {
      bar: {
        upColor: theme == 'dark' ? '#184c42' : '#bbefe2',
        downColor: theme == 'dark' ? '#592e30' : '#fcd1d1',
        noChangeColor: theme == 'dark' ? '#184c42' : '#bbefe2'
      },
      line: {
        size: 1,
        colors: ['#FF9600', '#9D65C9', '#2196F3', '#E11D74', '#01C5C4']
      },
      tooltip: {
        showRule: 'always',
        showType: 'standard',
        showName: true,
        showParams: true,
        text: {
          size: 12,
          family: 'Inter',
          weight: 'normal',
          color: '#76808F',
          marginLeft: 8,
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0
        }
      }
    },
    // x轴
    xAxis: {
      axisLine: {
        style: 'solid',
        color: axisLineColor
      },
      tickLine: {
        style: 'solid',
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    // y轴
    yAxis: {
      axisLine: {
        style: 'solid',
        color: axisLineColor
      },
      tickLine: {
        style: 'solid',
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    separator: {
      color: axisLineColor,
    },
    //十字光标
    crosshair: {
      horizontal: {
        line: {
          color: crossLineColor,
          dashValue: [6, 3],
          size: 1,
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        },
      },
      vertical: {
        line: {
          color: crossLineColor,
          dashValue: [6, 3],
          size: 1,
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      }
    }
    // 十字光标垂直线及文字(开启可自定义化设置)
    //   vertical: {
    //     show: true,
    //     line: {
    //       show: true,
    //       // 'solid'|'dash'
    //       style: 'solid',
    //       dashValue: [4, 2],
    //       size: 1,
    //       color: '#888888'
    //     },
    //     text: {
    //       show: true,
    //       color: '#D9D9D9',
    //       size: 12,
    //       family: 'Helvetica Neue',
    //       weight: 'normal',
    //       paddingLeft: 2,
    //       paddingRight: 2,
    //       paddingTop: 2,
    //       paddingBottom: 2,
    //       borderSize: 1,
    //       borderColor: '#505050',
    //       borderRadius: 2,
    //       backgroundColor: '#505050'
    //     }
    //   }
    // },
  }
}

export default {
  name: 'CustomThemeKLineChart',
  data() {
    let interval = this.$cookies.get('interval');
    if (!interval) {
      this.$cookies.set('interval', '1hour')
      interval = '1hour'
    }
    return {
      interval: interval,
      intervalSize: {
        '1min': 1440,
        '5min': 864,
        '15min': 600,
        '30min': 1440,
        '1hour': 1440,
        '4hour': 1080,
        '1day': 365,
        '1week': 104
      },
      klineData: this.symbolInfoList.map(item => {
        item.timestamp = Number(item.ts) * 1000
        // 收盘价，必要字段
        item.close = Number(item.close)
        // 开盘价，必要字段
        item.open = Number(item.open)
        // 最高价，必要字段
        item.high = Number(item.high)
        // 最低价，必要字段
        item.low = Number(item.low)
        // 成交量，非必须字段
        item.volume = Number(item.vol)
        // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
        // item.turnover = (Number(item.open) + Number(item.close) + Number(item.high) + Number(item.low)) / 4 * Number(item.vol)
        return item
      }),
      loadingFlag: true,
      kLineChart: null,
      ChartType: 1,
      timerinfo: null,
      timer: null,
      isPC: this.$store.state.isPC,
    }
  },
  props: {
    symbolInfoList: {
      type: Array,
      default: () => []
    },
    price: {
      type: String,
      default: 0
    },
    isSpecialty: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    if (this.isSpecialty == 1) {
      this.initkLineChart()
    }
  },
  methods: {
     ...mapGetters(['GetTheme']),
    //初始化k线
    initkLineChart() {
      const theme = this.GetTheme()
      const { language } = this.$route.params;
      this.kLineChart = init('custom-theme-k-line', getThemeOptions(theme, this.interval, language,this.isPC))
      //k线添加新数据
      this.kLineChart.applyNewData(this.klineData)
      //单条数据所占的空间 即单根蜡烛柱的宽度
      this.kLineChart.setDataSpace(8)
      //getDataSpace 获取图表一条数据所占用的空间
      //getBarSpace 获取图表一条数据绘制所占用的空间
      // if(this.interval=='1min'){
      //一分钟线处理默认展示一个小时内的k线(兼容一些币的波动区间不明显,因为60个会有些误差,蜡烛图之间有间距啥的 目前按照68个蜡烛图计算)
      //setOffsetRightSpace 图表右边可以空出来的间隙
      //scrollByDistance  滚动一定的距离(也可以实现)
      // this.kLineChart.setOffsetRightSpace((this.kLineChart.getWidth().total-68*this.kLineChart.getDataSpace()))
      // }else{
      //setOffsetRightSpace 初始化设置图表右边可以空出来的间隙
      this.kLineChart.setOffsetRightSpace(30)
      // }
      //创建一个技术指标 MA
      this.kLineChart.createTechnicalIndicator('MA', false, {
        id: 'candle_pane',
        height: 100,
        minHeihgt: 50,
        dragEnabled: true
      })
      //创建一个技术指标 VOL
      this.kLineChart.createTechnicalIndicator('VOL', false, {
        id: 'candle_pane2',
        height: 100,
        minHeihgt: 50,
        dragEnabled: true,
      })
      this.setPricePrecision(this.price)
      this.klineUpdata()
      this.loadingFlag = false;
    },
    //更新k线
    klineUpdata() {
      clearInterval(this.timer)
      clearInterval(this.timerinfo)
      this.timer = setInterval(async () => {
        if (window.navigator.onLine) {
          console.log("网络连接")
          try {
            this.kLineData = await this.pollKline()
            //末尾五条数据更新
            let updatelist = this.kLineData.slice(this.kLineData.length - 5, this.kLineData.length)
            updatelist.map(item => {
              item.timestamp = Number(item.ts) * 1000
              // 收盘价，必要字段
              item.close = Number(item.close)
              // 开盘价，必要字段
              item.open = Number(item.open)
              // 最高价，必要字段
              item.high = Number(item.high)
              // 最低价，必要字段
              item.low = Number(item.low)
              // 成交量，非必须字段
              item.volume = Number(item.vol)
              // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
              // item.turnover = (Number(item.open) + Number(item.close) + Number(item.high) + Number(item.low)) / 4 * Number(item.vol)
              this.kLineChart.updateData(item)
              return item
            })
            if(updatelist.length>0){
              this.setPricePrecision(String(updatelist[updatelist.length-1].close))
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("网络中断")
        }
      }, 20000)
      this.timerinfo = setInterval(() => {
        if (window.navigator.onLine) {
          console.log("网络连接")
          this.$store.dispatch('swap/CRYCLE_REQUEST', {
            chain: this.$route.params.chain,
            contract: this.$route.params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : this.$route.params.contract
          })
        } else {
          console.log("网络中断")
        }
      }, 20000)
    },
    async pollKline() {
      const KlineParams = {
        chain: this.$route.params.chain,
        contract: this.$route.params.contract.toLocaleUpperCase() === 'BITKEEP' ? '' : this.$route.params.contract,
        market: this.interval,// 默认
        size: this.intervalSize[this.interval] ? this.intervalSize[this.interval] : 800 // 动态
      }
      const data = await this.$api.swap.getKLineData(KlineParams)
      return data && data.data && data.data.list ? data.data.list : []
    },
    //k线周期切换
    async setTimeKine(index) {
      const theme = this.GetTheme()
      const { language } = this.$route.params;
      if (index == 0) {
        return false
      } else {
        this.loadingFlag = true
      }
      this.kLineChart.setScrollEnabled(false)
      this.kLineChart.setZoomEnabled(false)
      switch (index) {
        case 0:
          break;
        case 1:
          if (this.interval == '1min') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '1min')
          this.interval = '1min'
          break;
        case 2:
          if (this.interval == '5min') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '5min')
          this.interval = '5min'
          break;
        case 3:
          if (this.interval == '15min') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '15min')
          this.interval = '15min'
          break;
        case 4:
          if (this.interval == '30min') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '30min')
          this.interval = '30min'
          break;
        case 5:
          if (this.interval == '1hour') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '1hour')
          this.interval = '1hour'
          break;
        case 6:
          if (this.interval == '4hour') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '4hour')
          this.interval = '4hour'
          break;
        case 7:
          if (this.interval == '1day') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '1day')
          this.interval = '1day'
          break;
        case 8:
          if (this.interval == '1week') {
            this.loadingFlag = false;
            return false
          }
          this.$cookies.set('interval', '1week')
          this.interval = '1week'
          break;
      }
      this.klineData = await this.pollKline()
      if (this.klineData.length == 0) {
        this.loadingFlag = false;
        return false
      }
      this.setPricePrecision(String(this.klineData[this.klineData.length-1].close))
      // if (oldkLineChart.length == 0) {
      //   this.kLineChart.removeTechnicalIndicator("candle_pane2", 'VOL')
      //   this.initkLineChart()
      // }
      this.kLineChart.setStyleOptions(getThemeOptions(theme, this.interval, language,this.isPC))
      this.kLineChart.applyNewData(this.klineData.map(item => {
        item.timestamp = Number(item.ts) * 1000
        // 收盘价，必要字段
        item.close = Number(item.close)
        // 开盘价，必要字段
        item.open = Number(item.open)
        // 最高价，必要字段
        item.high = Number(item.high)
        // 最低价，必要字段
        item.low = Number(item.low)
        // 成交量，非必须字段
        item.volume = Number(item.vol)
        // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
        // item.turnover = (Number(item.open) + Number(item.close) + Number(item.high) + Number(item.low)) / 4 * Number(item.vol)
        return item
      }), true)
      this.kLineChart.setDataSpace(8)
      this.kLineChart.setScrollEnabled(true)
      this.kLineChart.setZoomEnabled(true)
      //getDataSpace 获取图表一条数据所占用的空间
      //getBarSpace 获取图表一条数据绘制所占用的空间
      // if(this.interval=='1min'){
      //   //一分钟线处理默认展示一个小时内的k线(兼容一些币的波动区间不明显,因为60个会有些误差,蜡烛图之间有间距啥的 目前按照68个蜡烛图计算)
      //   //setOffsetRightSpace 图表右边可以空出来的间隙
      //   //scrollByDistance  滚动一定的距离(也可以实现)
      //   this.kLineChart.setOffsetRightSpace((this.kLineChart.getWidth().total-60*3*this.kLineChart.getDataSpace()))
      // }else{
      //   this.kLineChart.setOffsetRightSpace(30)
      // }
      this.klineUpdata()
      this.loadingFlag = false
    },
    // 设置k线类型专业版、基础版
    setChartType(index) {
      this.ChartType = index
      //k线类型(1.专业版版是蜡烛图 2.基础版是面积图)
      const chartTypes = [
        { key: 'area', text: '面积图' },
        { key: 'candle_solid', text: '蜡烛实心' },
      ]
      const type = chartTypes[index].key;
      this.kLineChart.setStyleOptions({
        candle: {
          type
        }
      })
    },
    //设置价格精度、Volume精度
    setPricePrecision(value) {
      const Price=transferToNumber(value)
      if (Price.indexOf('.') != -1) {
        let precision;
        if (Price.split(".")[1].indexOf("{") != -1) {
          const precisionArr = Price.split("{")[1].split("}")
          precision = Number(precisionArr[0]) + precisionArr[1].length
        } else {
          precision = Price.split(".")[1].length
        }
        console.log("精度:" + precision)
        this.kLineChart.setPriceVolumePrecision(precision, precision)
      }
    },
    setChartcycle(cycle) {
      const cycleObject = {
        '1min': 1,
        '5min': 2,
        '15min': 3,
        '30min': 4,
        '1hour': 5,
        '4hour': 6,
        '1day': 7,
        '1week': 8
      }
      return cycleObject[cycle]
    }
  },
  computed: {
    Chartcycle() {
      return this.setChartcycle(this.interval)
    },
    klineShow() {
      return this.klineData.length > 0
    }
  },
  watch: {
    // "klineShow"(nval, oval) {
    //   if (!oval && nval) {
    //     this.initkLineChart()
    //   }
    // },
    '$route'(res, old) {
      const { language } = res.params;
      const theme =this.GetTheme()
      //k线主题、多语言切换
      if (this.isSpecialty == 1) {
        this.kLineChart.setStyleOptions(getThemeOptions(theme, this.interval, language,this.isPC))
      }
    },
    "$store.state.theme"(res, old){
      const { language } = this.$route.params;
      if (this.isSpecialty == 1) {
        this.kLineChart.setStyleOptions(getThemeOptions(res, this.interval, language,this.isPC))
      }
    } , 
    "$store.state.locale"(nval, oval) {
      this.loadingFlag = true;
    },
    "$store.state.isPC": function (newVal, oldVal) {
      this.isPC = newVal
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timerinfo)
    dispose('custom-theme-k-line')
  }
}
</script>
<style scoped lang="less">
.k-line-chart-container {
  display: flex;
  flex-direction: column;
  // margin: 15px;
  border-radius: 2px;
  background-color: #FFFFFF;
  width: 100%;
  min-height: 440px;
  margin-bottom: 15px;
  // height: 500px;
  // padding-right: 20px;
  // padding: 16px 6px 16px 16px;
  box-sizing: border-box;
  position: relative;

  .notDataBox {
    width: 100%;
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
    }

    .notData {
      font-weight: 500;
      font-size: 12px;
      line-height: 1.5;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  .chart-top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: flex-start;

      .period {
        display: block;
        padding: 15px 10px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
      }

      .activeTime {
        color: #7524F9 !important;
        font-weight: 600;
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;

      .period {
        display: block;
        padding: 15px 10px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
      }

      .activeType {
        color: #7524F9 !important;
        font-weight: 600;
      }
    }
  }

  .k-line-chart {
    display: flex;
    flex: 1;
    //logo也可以k线背景图
    // background-image: url("~/assets/img/swap/swap_kline_logo.svg");
    // background-repeat: no-repeat;
    // background-position: center;
  }

  // .positionchart{
  //   flex: 1;
  //   display: flex;
  //   position: absolute;
  //   left: -10000px;
  //   top: -10000px;
  //   z-index: -999;
  // }

  .nokline-img {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading-css {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .logo-img {
    position: absolute;
    left: 10px;
    bottom: 65px;
    width: 125px;
  }
}

@media screen and (max-width: 750px) {
  .chart-top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: scroll;

    .left {
      display: flex;
      justify-content: flex-start;

      .period {
        display: block;
        padding: 15px 10px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
      }

      :first-child {
        display: none !important;
      }


      .activeTime {
        color: #7524F9 !important;
        font-weight: 600;
      }
    }

    .right {
      display: none !important;
    }
  }

  .logo-img {
    position: absolute;
    left: 10px !important;
    bottom: 130px !important;
    width: 85px !important;
  }
}
</style>
