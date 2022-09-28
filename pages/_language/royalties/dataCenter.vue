<template>
  <div class="royalties-data-wrap">
    <div class="nav">
      <TopNav></TopNav>
    </div>
    <div class="data-main">
      <div v-show="projectList.length > 0" class="chart-box">
        <div class="chart-header">
          <h3 class="title">{{myLang.dataCenter.title}}</h3>
          <div class="chart-nav" flex="main:justify">
            <div class="chart-nav-left">
              <a-select @change="handleChangeCantract" v-model="selectItem" class="myselect"  style="width: 140px;">  
                <img slot="suffixIcon" src="@/assets/img/components/royalties/icon-arrow-down.svg" alt="">
                <!-- <a-select-option class="my-select-option" value="">{{myLang.dataCenter.allProject}}</a-select-option> -->
                <a-select-option class="my-select-option" v-for="(item, index) in projectList" :key='index' :value="item.collection_contract">{{item.name}}</a-select-option> 
              </a-select>
            </div>
            <div class="chart-nav-right" flex="main:right">
              <!-- <div @click="handleChangeTimeTab(1)" class="btn-time text2" :class="{active: timeTab==1}">{{myLang.dataCenter.today}}</div> -->
              <div @click="handleChangeTimeTab(2)" class="btn-time text2" :class="{active: timeTab==2}">{{myLang.dataCenter.week}}</div>
              <div @click="handleChangeTimeTab(3)" class="btn-time text2" :class="{active: timeTab==3}">{{myLang.dataCenter.month}}</div>
              <a-range-picker 
                :open='pickerOpen'
                @openChange="onOpenChange"
                ref="mytest"
                class="my-date-picker"  
                :format="dateFormat"
                @change="onChange">
                <span slot="suffixIcon"/>
              </a-range-picker>
              <div @click="handleChangeTimeTab(4)" class="btn-time text2" :class="{active: timeTab==4}">{{myLang.dataCenter.custom}}</div>  
            </div>
          </div> 
        </div>
        <div id="chart-part" ref="chartPart" /> 
      </div> 
      <div v-show="projectList.length==0 && loading==false" class="empty-box"> 
        <div class="empty-icon">
          <img src="@/assets/img/components/royalties/icon-empty2.png" alt="">
        </div>
        <div class="empty-text1 text1">{{myLang.dataCenter.nodata}}</div>
        <!-- <div class="empty-text2 text1">{{myLang.dataCenter.text1}}</div> -->
        <div class="empty-btn">
          <button v-if="WalletID"  @click="handleClickAdd" class="route-btn">{{myLang.dataCenter.text2}}</button>
          <button v-else  @click="connectWallet" class="route-btn">{{myLang.dataCenter.connect}}</button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
 
import TopNav from '@/components/royalties/topNav.vue';
import {parseTime} from '@/utils/public'  
import {DatePicker, Select} from 'ant-design-vue'  
import { wallet } from '@/utils/wallet'
import { mapMutations } from 'vuex'
import Vue from 'vue' 

Vue.use(DatePicker)
Vue.use(Select)
export default {
    layout: "nft/default",
    name: "NftDataCenter", 
    data() {
        return {
            echarts: null,
            mychart: null,
            timeTab: 1,
            chartParams: {
              type: 'day',//X轴时间间隔，hour每小时，day每天
            },
            dayType: 'day', 
            selectItem: null,
            selectContract: null,
            selectChain: null,
            projectList: [], 
            dateFormat: 'YYYY/MM/DD',
            pickerOpen: false,
            loading: true,
        };
    },
    watch: { 
      "$store.state.WalletID": function (newVal, oldVal) { 
        this.getAllProjectList()
        this.handleChangeTimeTab(2) 
      },
    },
    computed: {
      WalletID() {
        return this.$store.state.WalletID
      },
      myLang() {
        return this.$t('royalties')
      }
    },
    async mounted() { 
      this.echarts = require('echarts/lib/echarts');
      require('echarts/lib/component/grid');
      require("echarts/lib/chart/bar"); 
      require("echarts/lib/component/tooltip")
      require('echarts/lib/chart/line'); 
      await this.getAllProjectList()
      this.init(); 
    },
    created() { 
      if (process.client) {  
      }
    }, 
    methods: {   
        handleClickAdd() {  
          const locale = this.$store.state.locale
          this.$router.push({
            path: `/${locale}/royalties/project/edit`, 
          })  
        },
        onOpenChange(e) { 
          this.pickerOpen = false
        },
        onChange(date, dateString) {  
            this.timeTab = 4 
            this.chartParams.start_time = dateString[0] + ' 00:00:00';
            this.chartParams.end_time = dateString[1] + ' 23:59:59';
            this.chartParams.type = 'day'
            this.getChartList()
        }, 
        init() { 
            this.mychart = this.echarts.init(this.$refs.chartPart);
            this.handleChangeTimeTab(2) 
        },
        handleChangeTimeTab(type) {
          if (type==1) {
            this.timeTab = type
            this.chartParams.type = 'hour'
            const ta = this.getDateRange(type)
            // console.log(ta)
            this.chartParams.start_time = ta[0]
            this.chartParams.end_time = ta[1]
            // console.log(this.chartParams)
            this.getChartList()
          } else if (type==2 || type==3){
            this.timeTab = type
            this.chartParams.type = 'day'
            const ta = this.getDateRange(type)
            // console.log(ta)
            this.chartParams.start_time = ta[0]
            this.chartParams.end_time = ta[1]
            this.getChartList()
          } else if (type==4) {
            this.pickerOpen = true
          }
        },
        //柱状图列表
        async getChartList() { 
          // const {address} = wallet.getWalletInfo()
          const address = this.$store.state.address
          if (!address) { return }
          this.loading = true
          this.chartParams.address = address
          this.chartParams.contract = this.selectContract?.collection_contract
          this.chartParams.chain = this.selectContract?.chain
          const {data, status} = await this.$api.royalties.getRoyaltyChart(this.chartParams)
          this.loading = false
          // console.log({data, status})
          if (status==0) {
            this.chartList = data.data || {}
          }  
          const xdata = []
          const ydata = []
          Object.keys(this.chartList).map(key => {
            // console.log(key)
            if (this.chartParams.type == 'hour') {
              xdata.push(parseTime(key+':00', 'h:m'))
            } else {
              xdata.push(parseTime(key, 'y-M-d'))
            }
            ydata.push(this.chartList[key])
          })
          // console.log({xdata, ydata}) 
          let option = {
              chart: {
                type: 'spline'
              },
              color: '#7524F9',  
              tooltip: {
                trigger: 'axis',
                // axisPointer: {
                //   type: 'cross'
                // }
              },
              textStyle: {
                color: "#919899" //设置文字颜色
              },
              xAxis: {
                  type: "category",
                  data: xdata,   
                  axisTick: {
                    show:false,
                    lineStyle: {
                      color: "#F2F2F5"
                    }
                  },
                  axisLine:{
                    lineStyle:{
                        color:'#F2F2F5',
                        width:1,//这里是为了突出显示加上的
                    }
                  } 
              },
              yAxis: {
                  type: "value", 
                  splitLine: {
                    lineStyle: {
                      color: "#F2F2F5"
                    }
                  },
              },
              series: [
                  {
                      name: 'Royalties',
                      barWidth: 24,
                      data: ydata, 
                      smooth: true,
                      // data: [120, 200, 150, 80, 70, 110, 130],
                      type: "line"
                  }
              ],
              grid: {
                top: '10px',
                left: '40px',
                right: '10px',
                bottom: '20px'
              }
          }; 

          this.mychart.setOption(option); 
        },
        getDateStr(now) {
          var year = now.getFullYear(); // 年
          var month = now.getMonth() + 1; // 月
          var day = now.getDate(); // 日
          if(day < 10) {
            day = '0' + day;
          } 
          if(month < 10) {
            month = '0' + month;
          }		
          return year + "-" + month + "-" + day;
        },
        getDateRange(type) {
          var now = new Date();
          if (type==1) {
            var startTime = this.getDateStr(now) + ' 00:00:00';
            var endTime = this.getDateStr(now) + ' 23:59:59';
            return [startTime, endTime]
          } else if (type==2) {
            var nowDayOfWeek = now.getDay() == 0 ? 6 : (now.getDay()-1);
            var startTime = this.getDateStr(new Date(now.getTime() - nowDayOfWeek * 24 * 60 * 60 * 1000)) + ' 00:00:00';
            var endTime = this.getDateStr(now) + ' 23:59:59';
            return [startTime, endTime]
          } else if (type==3) { 
            var nowDay = now.getDate() - 1;
            var startTime = this.getDateStr(new Date(now.getTime() - nowDay * 24 * 60 * 60 * 1000)) + ' 00:00:00';
            var endTime = this.getDateStr(now) + ' 23:59:59';
            return [startTime, endTime]
          } 
        }, 
        async getAllProjectList() {
          this.loading = true
          const { address } = this.$store.state
          const params = {
            address,
            page: 1,
            limit: 1000
          }
          const {data, status} = await this.$api.royalties.getCollections(params)
          this.loading = false
          if (status == 0) {
            this.projectList = data.list || []
            if (this.projectList.length > 0) {
              this.selectItem = this.projectList[0].collection_contract
              this.selectContract = this.projectList[0]
            } 
          }
        },
        handleChangeCantract(e) {  
          this.selectContract = this.projectList.find(item => item.collection_contract == e)
          this.getChartList()
        }, 
        ...mapMutations([ 'changeAddress', 'changeChainId', 'changeWalletID']),
        async connectWallet(click) { 
            this.$nuxt.$emit('connectWallet')
            // try {
            //     if (!wallet.selectedAddress("bitkeep")) {
            //         this.init()
            //     }
            //     const bitkeepaddress = await wallet.connect("bitkeep");
            //     this.chainId = await wallet.getChainId("bitkeep");
            //     const [address] = await wallet.getAccounts("bitkeep");
            //     //先这样实现功能 后续优化
            //     const walletID = await wallet.getWalletID("bitkeep");
            //     if (walletID) {
            //         this.changeWalletID(walletID)
            //     } else {
            //         window.BitKeepInvoke.getHeader(async (err, data) => {
            //             if (data) {
            //                 const walletID = data.TOKEN;
            //                 this.changeWalletID(walletID)
            //             }
            //         })
            //     }
            //     this.address = address;
            //     this.changeAddress(this.address)
            //     this.changeChainId(this.chainId)
            //     localStorage.setItem('connectorId', "injected") 
            //   } catch (error) {
            //     this.$message.error(typeof error == 'object' ? error.message : error);
            // }
        },
    },
    components: { TopNav }
}

</script>

<style lang="less" scoped>
.royalties-data-wrap {
  .data-main {
    #chart-part {
      height: 237px;
      width: 457px;
    }
    .chart-box { 
      width: 497px;
      // height: 327px;
      box-sizing: border-box;
      padding: 20px;
      border: 1px solid #F2F2F5;
      border-radius: 8px;
      .title {
        margin-bottom: 14px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
      }
      .myselect {
        /deep/ .ant-select-selection {
          border: none;
          padding-right: 3px;
          box-shadow: none;
          color: #0e0e0e;

          .ant-select-selection__rendered {
            margin-left: 0;
          }
        }
      }
      .chart-nav-right {
        .btn-time {
          box-sizing: border-box;
          padding: 4px 10px;
          margin-left: 4px;
          height: 24px;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 130%;
          border-radius: 4px;
          cursor: pointer;
          &.active {
            color: #0e0e0e;
            background-color: #F2F2F5;
          }
          &:hover {
            color: #0e0e0e;
            background-color: #F2F2F5;
          }
        }
      }
      
    }

    .my-date-picker {
        width: 0;
        height: 0; 
        overflow: hidden;
    }
  }
  .empty-box {
    text-align: center;
    .empty-icon {
      margin-top: 154px;
      img {
        width: 64px;
        height: 64px;
      }
    }
    .empty-text1 {
      margin-top: 20px;
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
    }
    .empty-text2 {
      margin-top: 10px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
    }
    .route-btn { 
      padding: 0 20px;
      box-sizing: border-box;
      margin-top: 30px; 
      min-width: 200px;
      height: 50px;
      background: #7524F9;
      border-radius: 8px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      color: #fff;
    } 
  }
}

</style>

<style lang="less">
.ant-select-dropdown { 
  min-width: 140px!important;
  border: 1px solid #F2F2F5;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  .my-select-option {
    color: #0e0e0e;
    font-weight: 500;
    font-family: 'PingFang SC';
    font-size: 14px;
    &.ant-select-dropdown-menu-item-selected {
      background: #F2F2F5;
      color: #7524F9;
    }
    &:hover {
      background: #F2F2F5;
    }

  }
} 
</style>