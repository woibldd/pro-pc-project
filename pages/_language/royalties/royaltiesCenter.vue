<template>
  <div class="royalties-center-wrap">
    <div class="nav">
      <TopNav> </TopNav>
    </div>
    <div class="subnav">
      <div class="nav-box" flex="main:justify">
        <div class="nav-left text2"  flex="main:left">
          <div class="btn-tab" :class="{BG2: tab==1, text1: tab==1}" @click="handleTabChange(1)">{{myLang.royalties.nav.profit}}</div>
          <div class="btn-tab" :class="{BG2: tab==2, text1: tab==2}" @click="handleTabChange(2)">{{myLang.royalties.nav.setting}}</div>
        </div>
        <div class="nav-right">
          <div v-if="tab==2 && WalletID" class="sub-btn-add lineBG2 text1" @click="handleClickAddSetting">{{myLang.royalties.nav.add}}</div>
          <div v-else>  
            <!-- <a-range-picker 
              :open='pickerOpen2'
              @openChange="onOpenChange2"
              ref="mytest"
              class="my-date-picker"  
              :format="dateFormat"
              @change="onChange2">
              <span slot="suffixIcon"/>
            </a-range-picker> -->

            <a-select v-model="selectItem" @change="handleChangeCantract"  class="myselect" style="width: 140px;">  
              <a-select-option v-for="item in projectList" :key='item.id' :value="item.collection_contract">{{item.name}}</a-select-option> 
            </a-select>
          </div>
        </div>
      </div> 

    </div>
    <div class="profit-wrap" v-show="tab==1">
      <div class="r1" flex="box:first">
        <div class="profit-view"> 
          <div class="chart-box">
            <div class="chart-header">
              <h3 class="title">{{myLang.dataCenter.title}}</h3>
              <div class="chart-nav" flex="main:justify">
                <div class="chart-nav-left">
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
        </div>
        <div class="profit-list">
          <div class="profit-title" flex="main:justify">
            <h3 flex="cross:center">{{myLang.royalties.profit.table1.title}}</h3>
            <div class="right" flex="main:right cross:center">
              <!-- <span class="title-field">
                <span class="title-label text2">版税比例</span>
                <span class="title-value text1">5%</span>
              </span> -->

              <a-month-picker 
                class="my-date-picker" 
                :open='pickerOpen1' 
                @openChange="onOpenChange1" 
                @change="onChange1" 
                placeholder="Select Month" /> 
              <span class="title-field">
                <span @click="pickerOpen1=true" class="new-btn-time pointer text2" :class="{}">{{myLang.month[dateString1]}}</span> 
              </span>
              <span class="title-field">
                <span class="title-label text2">{{myLang.royalties.profit.table1.amount}}</span>
                <span class="title-value text1">{{accumulated1}} {{symbol}}</span>
              </span>
              <json-excel
                class="export-excel-wrapper"
                :data="list1"
                :fields="json_fields" 
                :name="`${myLang.royalties.profit.table1.title}.xls`"
              >  
                <a-button class="text1 btn-export ">{{myLang.royalties.profit.table1.export}}</a-button>
              </json-excel>
            </div>
          </div> 
          <div v-if="list1.length > 0 || loading1">
            <a-table :loading="loading1" :pagination="false"  :locale="{emptyText:' '}"  :columns="columns1" :data-source="list1"  rowKey="id" :scroll="{y:224}" class="my-table no-border royalty-table ">  
              <span slot="time" slot-scope="time">
                {{time | timeFormat}}
              </span>
              <span slot="price" slot-scope="price, record">{{ `${record.price} ${record.unit}`}} </span>
              <span slot="royalty" slot-scope="royalty, record">{{ `${record.royalty} ${record.unit}`}} </span>
              <span slot="dollar" slot-scope="dollar">{{ `$${dollar}`}} </span>
            </a-table>
          </div>
          <div v-else class="empty-box empty1"> 
            <div class="empty-icon">
              <img src="@/assets/img/components/royalties/icon-empty4.png" alt="">
            </div>
            <div class="empty-text3 text3"> 
              <!-- 暂无记录  -->
              {{$t('royalties.nodata3')}}
            </div> 
          </div>
        </div> 
      </div>
      <div class="r2">
        <div class="profit-title" flex="main:justify">
          <h3 class="main-title text1">{{myLang.royalties.profit.table2.title}} <span class="sub-title text3">{{myLang.royalties.profit.table2.subtitle}}</span></h3>
          <div class="right">

            <a-month-picker 
              class="my-date-picker" 
              :open='pickerOpen2' 
              @openChange="onOpenChange2" 
              @change="onChange2" 
              placeholder="Select Month" /> 
            <span class="title-field">
              <span @click="pickerOpen2=true" class="new-btn-time pointer text2" :class="{}">{{myLang.month[dateString2]}}</span> 
            </span>
            <span class="title-field">
              <span class="title-label text2">{{myLang.royalties.profit.table2.label1}}</span>
              <span class="title-value text1">{{uncollected2}} {{symbol2}}</span>
            </span>
            <span class="title-field">
              <span class="title-label text2">{{myLang.royalties.profit.table2.label2}}</span>
              <span class="title-value text1">{{accumulated2}} {{symbol2}}</span>
            </span> 
          </div>
        </div>

        <div v-if="list2.length > 0 || loading2">
          <a-table :loading="loading2" :locale="{emptyText:' '}" :columns="columns2" :data-source="list2" rowKey="id" :pagination="pagination2" class="my-table royalty-table "> 
              <span slot="timeRange" slot-scope="text, record">
                {{record.start_time | timeFormat('y-M-d')}} ~
                {{record.end_time | timeFormat('y-M-d')}}
              </span>
              <span slot="time" slot-scope="time">
                {{time | timeFormat}}
              </span>
              <span slot="status" slot-scope="status">
                <label   class="status" :class="[`status${status}`]">
                  <!-- {{recordStatus[status]}} -->
                  {{myLang.royalties.profit.table2.recordStatus[status]}}
                </label>
              </span>
              <span slot="collection_contract" :title="collection_contract" slot-scope="collection_contract">
                {{sx(collection_contract)}}
              </span>
              <span slot="beneficiary_contract" :ttile="beneficiary_contract" slot-scope="beneficiary_contract">
                {{sx(beneficiary_contract)}}
              </span>

          </a-table>
        </div>
        <div v-else class="empty-box"> 
          <div class="empty-icon">
            <img src="@/assets/img/components/royalties/icon-empty4.png" alt="">
          </div>
          <div class="empty-text3 text3">
          <!--   {{myLang.dataCenter.nodata}} -->
            <!-- 暂无记录  -->
            {{$t('royalties.nodata3')}}
          </div> 
        </div>
      </div>
    </div>
    <div class="seting-wrap" v-show="tab==2">
      <div  v-if="setingList.length > 0 || loadingSet"> 
        <a-table :loading="loadingSet" :pagination="paginationSet" class="my-table royalty-table " :columns="setColumns" :data-source="setingList">
          <span slot="royalty_status" slot-scope="royalty_status, record">
             <a-tooltip v-if="royalty_status==2" overlayClassName="mytooltip"  :title="`${$t('royalties.reason')}: ${record.royalty_reject_reason || ''}`" >
              <label class="status" :class="[`status2`]">
                {{myLang.royalties.setting.statusDict[royalty_status]}}
                <img class="standard-icon"  src="@/assets/img/components/royalties/icon-reject.svg" alt="">
              </label>
            </a-tooltip>
            <label v-else class="status" :class="[`status${royalty_status}`]"> 
              {{myLang.royalties.setting.statusDict[royalty_status]}}
            </label>
          </span>
          <span slot="royalty_param" slot-scope="royalty_param"> 
              {{`${royalty_param}%`}} 
          </span> 
          <span slot="collection_contract" :title="collection_contract" slot-scope="collection_contract"> 
              {{sx(collection_contract)}}  
          </span>  
          <span slot="royalty_address" :title="royalty_address" slot-scope="royalty_address"> 
              {{sx(royalty_address)}} 
          </span>  
          <span slot="action" slot-scope="text, record"> 
            <span v-if="record.role == 'manager' || record.role == 'admin'"> 
              <a v-if="record.royalty_status>1" @click="()=>handleClickEditSetting(record)" class="Colorpurple table-btn">{{myLang.edit}}</a>
              <a v-if="record.royalty_status>1" @click="()=>handleClickRemoveSetting(record)" class="Colorpurple table-btn">{{myLang.delete}}</a>
            </span>
          </span>
        </a-table>
      </div>
      <div v-else class="empty-box"> 
        <div class="empty-icon">
          <img src="@/assets/img/components/royalties/icon-empty4.png" alt="">
        </div>
        <div class="empty-text3 text3">
         <!--   {{myLang.dataCenter.nodata}} -->
          <!-- 暂无记录 --> 
          {{$t('royalties.nodata3')}}
        </div> 
      </div> 
    </div>
    <v-modal :open.sync="showAddModal">  
      <div class="modal-box modal-apply">
        <div class="title text1">
          <!-- {{modalType == 'create' ? '添加版税' : '修改版税'}} -->
          {{modalType == 'create' ? myLang.royalties.setting.title1 :  myLang.royalties.setting.title2}}
        </div>
        <div class="modal-form">
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.manager.chain}}</label>
            </div>
            <div  class="modal-value"> 
               <a-select
                ref="select"
                class="myselect text1"
                v-model="setParams.chain"
                style="width: 100%" 
                size="large">
                <a-select-option value="eth">ETH</a-select-option>
                <a-select-option value="bnb">BSC</a-select-option> 
                <a-select-option value="matic">Polygon</a-select-option>
              </a-select>
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.royalties.setting.contract}}</label>
            </div>
            <div  class="modal-value">
              <input class="input indent text1 lineBG2" v-model="setParams.contract" type="text">
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.royalties.setting.royalty}}</label>
              <span class="sublabel text3">{{ myLang.royalties.setting.text2}}</span>
            </div>
            <div class="modal-value">  
              <!-- <input class="input text1 lineBG2" @input="handleRoyaltyInput"> -->
              <a-input-number :precision="2" :min="0" :max="10" v-model="setParams.royalty_param"  class="input text1 lineBG2"> </a-input-number>
              <i class="text1">%</i>
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.royalties.setting.address}}</label>
              <span class="sublabel text3">{{ myLang.royalties.setting.text3}}</span>
            </div>
            <div  class="modal-value">
              <input class="input indent text1 lineBG2" v-model="setParams.royalty_address" type="text">
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.royalties.setting.chain}}</label>
            </div>
            <div  class="modal-value"> 
              <a-select
                ref="select"
                class="myselect text1"
                v-model="setParams.royalty_chain"
                style="width: 100%" 
                size="large"
                @change="handleChangeChain"
              >
                <a-select-option value="eth">ERC-20</a-select-option>
                <a-select-option value="bnb">BEP-20</a-select-option> 
                <a-select-option value="matic">Polygon</a-select-option>
                <a-select-option value="tron">TRC-20</a-select-option>
              </a-select>
            </div> 
          </div> 
        </div>
        <div class="model-submit">
          <button @click="handleClickSubmit" class="modal-btn Common_white BGpurple">{{myLang.confirm}}</button>
        </div> 
        <div class="modal-field">
          <div class="text1"> 
            <span class="sublabel text3">{{ myLang.text2}}</span>
          </div>
        </div>
      </div> 
    </v-modal>
    <v-modal :open.sync="showModalConfirm">  
      <div class="modal-confirm"> 
        <div class="modal-content text1">
          {{myLang.royalties.setting.text1}}
        </div>
        <div class="modal-option" flex="box:mean">
          <button class="modal-btn btn-cancle BG1 text1" @click="showModalConfirm=false">{{myLang.cancel}}</button>
          <button class="modal-btn btn-confirm BGpurple " @click="handleConfirmRemove">{{myLang.confirm}}</button>
        </div>
      </div>
    </v-modal> 
  </div>
</template>


<script>
import JsonExcel from 'vue-json-excel'
import TopNav from '@/components/royalties/topNav.vue';
import {Table, Select, InputNumber, DatePicker, Button} from 'ant-design-vue' 
import {parseTime} from '@/utils/public'
import VModal from '@/components/nft/VModal.vue';
// import { wallet } from '@/utils/wallet'
import mixin from '@/mixins/royalty.js'
import Vue from 'vue'

Vue.use(Table)
Vue.use(Select)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Button)

export default {
  layout: 'nft/default',
  name: 'royaltiesCenter',
  components: { TopNav, VModal, JsonExcel }, 
  mixins: [mixin],
  data() {
    return {
      echarts: null,
      mychart: null,
      tab: 1, // 1:版税收益, 2:版税设置 
      showAddModal: false,
      showModalConfirm: false,
      selectedItem: null,
      selectContract:'',
      /*收益列表*/
      columns1: [
        {
          title: this.$t('royalties.royalties.profit.table1.time'),// '时间',
          dataIndex: 'time',//
          key:'time',
          width: '24%',
          scopedSlots: {
            customRender: 'time'
          }
        },
        {
          title: this.$t('royalties.royalties.profit.table1.name'),// 'NFT名',
          dataIndex: 'nft_name',//
          key:'nft_name',
          width: '10%',
        },
        {
          title: 'TokenID',
          dataIndex: 'token_id',//
          key:'token_id',
          width: '16%',
          align: 'right',
        },
        {
          title: this.$t('royalties.royalties.profit.table1.price'),// '售出价',
          dataIndex: 'price',//
          key:'price',
          align: 'right',
          width: '16%',
          scopedSlots: {
            customRender: 'price'
          }
        },
        {
          title: this.$t('royalties.royalties.profit.table1.royalty'),// '版税收入',
          dataIndex: 'royalty',//
          key:'royalty',
          align: 'right',
          width: '18%',
          scopedSlots: {
            customRender: 'royalty'
          }
        },
        {
          title: this.$t('royalties.royalties.profit.table1.dollar'),// '美金计价',
          dataIndex: 'dollar',//
          key:'dollar',
          align: 'right',
          width: '16%',
          scopedSlots: {
            customRender: 'dollar'
          }
        },
      ],
      list1: [],
      loading1: true,
      pagination1: {
        current:1,
        pageSize: 10, 
        total: 0,  
        onChange: this.pageChange1,
        hideOnSinglePage: true
      },
      accumulated1: 0, //累计版税对应美元计价
      symbol: '',
      /*打款记录*/
      columns2: [
        {
          title: this.$t('royalties.royalties.profit.table2.timeRange'),// '时间范围',
          dataIndex: 'start',// 
          width: "16%",
          scopedSlots: {
            customRender: 'timeRange'
          }
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.time'),// '打款时间',
          dataIndex: 'time',//
          key:'time',
          width: "12.5%",
          scopedSlots: {
            customRender: 'time'
          }
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.status'),// '打款状态',
          dataIndex: 'status',//打款状态：1已打款，2未打款
          key:'status',
          width: "12%",
          scopedSlots: {
            customRender: 'status'
          }
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.name'),// '合集名',
          dataIndex: 'collection_name',//
          width: "10%",
          key:'collection_name',
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.contract'),// '合集合约地址',
          dataIndex: 'collection_contract',//
          key:'collection_contract',
          width: "17%",
          scopedSlots: {
            customRender: 'collection_contract'
          }
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.beneficiary'),// '收款合约地址',
          dataIndex: 'beneficiary_contract',//
          key:'beneficiary_contract',
          width: "17%",
          scopedSlots: {
            customRender: 'beneficiary_contract'
          }
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.chain'),// '收款主链',
          dataIndex: 'beneficiary_chain',//
          key:'beneficiary_chain', 
          width: "7%",
        },
        {
          title:  this.$t('royalties.royalties.profit.table2.money'),// '打款金额',
          dataIndex: 'money',//
          key:'money',
          align: 'right',
        },
      ],
      list2:[], 
      loading2: true,
      pagination2: {
        current:1,
        pageSize: 10, 
        total: 0,  
        onChange: this.pageChange2,
        hideOnSinglePage: true
      },
      uncollected2: 0, //待收版税，单位美元
      accumulated2: 0,  //累计版税，单位美元
      symbol2: '',
      chartList: {},
      setingList: [],
      loadingSet: true,
      paginationSet: {
        current:1,
        pageSize: 10, 
        total: 0,  
        onChange: this.pageChangeSet,
        hideOnSinglePage: true
      },
      recordStatus: {
        1: '已打款',
        2: '未打款'
      }, 
      setColumns: [ 
        {
          title: this.$t('royalties.royalties.setting.name'),// '合集名',
          dataIndex: 'name',
          key:'name',
          width: "12%",
        },
        {
          title: this.$t('royalties.royalties.setting.contract'),//'合约地址',
          dataIndex: 'collection_contract',
          key:'collection_contract',
          width: "20%",
          scopedSlots: {
            customRender: 'collection_contract'
          }

        },
        {
          title: this.$t('royalties.royalties.setting.royalty'),//'版税',
          dataIndex: 'royalty_param',
          key:'royalty_param',
          width: "10%",
          scopedSlots: {
            customRender: 'royalty_param'
          }
        },
        {
          title:this.$t('royalties.royalties.setting.address'),// '收款地址',
          dataIndex: 'royalty_address',
          key:'royalty_address',
          width: "20%",
          scopedSlots: {
            customRender: 'royalty_address'
          }
        },
        {
          title:this.$t('royalties.royalties.setting.chain'),// '收款地址主链',
          dataIndex: 'royalty_chain',
          key:'royalty_chain', 
          width: "17%",
        },
        {
          title: this.$t('royalties.royalties.setting.status'),//'状态',
          dataIndex: 'royalty_status',// 审核状态：0审核中，1审核通过，2审核未通过
          key:'royalty_status',
          width: "10%",
          scopedSlots: {
            customRender: 'royalty_status'
          }
        },
        {
          title: this.$t('royalties.royalties.setting.action'),//'操作', 
          key:'action',
          align: 'right',
          width: "11%",
          scopedSlots: {
            customRender: 'action'
          }
        },
      ],
      setParams: {
        chain: '',
        contract: '',
        royalty_param: '', //版税比例，最多两位小数
        royalty_address: '',//版税收款地址
        royalty_chain: '',//版税收款主链
        func: '',//create增加版税；update更新版税
        address: '',//增加版税时校验用户address
      },
      modalType: 'create',
      timeTab: 1,
      chartParams: {
        type: 'day',//X轴时间间隔，hour每小时，day每天
      }, 
      selectItem: '',
      projectList: [],
      dateFormat: 'YYYY/MM/DD',
      pickerOpen: false,
      pickerOpen1: false,
      pickerOpen2: false,
      json_fields: {
        "Time":'time',
        "NFT Name":'nft_name', 
        "Contract":"contract",
        "Chain":"chain",
        "TokenID":'token_id',
        "Price":'price',
        "Royalty":'royalty',
        "Dollar":'dollar',  
      },
      statusDist: {
        0: '审核中',
        1: '已通过',
        2: '未通过', 
        3: '未设置'
      },
      dateString1: '1',
      dateString2: '1',
      picker1: {
        start_time: '',
        end_time: '',
      },
      picker2: {
        start_time: '',
        end_time: '',
      },
      countDown: {}
    }
  }, 
  computed: { 
    myLang() {
      return this.$t('royalties')
    }, 
    WalletID() {
      return this.$store.state.WalletID
    },
  },
  mounted() { 
    this.echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/grid');
    require("echarts/lib/chart/bar");
    require("echarts/lib/component/tooltip")
    require('echarts/lib/chart/line'); 
    const now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let lastDay = new Date(year, month, 0).getDate()
    this.dateString1 = month
    this.dateString2 = month

    this.picker1.start_time = year + '-' + month + '-01 00:00:00' 
    this.picker1.end_time = year + '-' + month + '-' + lastDay + ' 23:59:59'
    this.picker2.start_time = year + '-' + month + '-01 00:00:00' 
    this.picker2.end_time = year + '-' + month + '-' + lastDay + ' 23:59:59'

    this.init();
  },
  watch: { 
    "$store.state.WalletID": function (newVal, oldVal) { 
      this.init()
    },  
  },
  methods: { 
    sx(address) {
      if (address.length > 16) {
        return address.substr(0, 4) + '......' + address.substr(address.length-12)
      } else {
        return address
      }
    },
    handleClickRemoveSetting(item) { 
      this.selectedItem = item
      this.showModalConfirm = true 
    },
    async handleConfirmRemove() { 
      if (!this.selectedItem) return  
      if (this.countDown.Remove && this.countDown.Remove > new Date()) { 
        return
      } else {
        this.countDown.Remove = +new Date() + 5000
      }
      const {token, signature, sign_address} = await this.getSignature()  
      if (token && signature) {
        const params = {
          chain: this.selectedItem.chain,
          contract: this.selectedItem.collection_contract,
          token, signature, sign_address
        }
        
        const res = await this.$api.royalties.removeRoyalty(params)
        if (res.status == 0) {
          this.getSettingList()
          this.showModalConfirm = false 
        }
      }
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
        // this.getRecordList()
        // this.getSaleList()
    }, 
    onOpenChange1(e) {
      this.pickerOpen1 = false
    },
    onChange1(date, dataString) { 
      // console.log(date, dataString, date.months())
      
      const year = date.year()
      const month =  date.month() + 1
      const lastDay = new Date(year, month, 0).getDate()
      this.dateString1 = month
      this.picker1.start_time = dataString + '-01 00:00:00' 
      this.picker1.end_time = year + '-' + month + '-' + lastDay + ' 23:59:59'
      // console.log(this.picker1)
      this.getSaleList()
    },
    onOpenChange2(e) {
      this.pickerOpen2 = false
    },
    onChange2(date, dataString) {  
      const year = date.year()
      const month =  date.month() + 1
      const lastDay = new Date(year, month, 0).getDate()
      this.dateString2 = month
      this.picker2.start_time = dataString + '-01 00:00:00' 
      this.picker2.end_time = year + '-' + month + '-' + lastDay + ' 23:59:59'

      this.getRecordList()
    },
    handleTabChange(tabid) {
      if (tabid != this.tab) {
        this.tab = tabid
        this.init() 
      }
    },
    async init() { 
      if (this.tab==1) {
        this.mychart = this.echarts.init(this.$refs.chartPart); 
        await this.getAllProjectList()
        this.handleChangeTimeTab(2)
        this.getSaleList()
        this.getRecordList()
      } else {
        this.getSettingList()
      }
    }, 
    handleChangeTimeTab(type) {
      if (type==1) {
        this.timeTab = type
        this.chartParams.type = 'hour'
        const ta = this.getDateRange(type) 
        this.chartParams.start_time = ta[0]
        this.chartParams.end_time = ta[1] 
        this.getChartList() 
        // this.getRecordList()
        // this.getSaleList()
      } else if (type==2 || type==3){
        this.timeTab = type
        this.chartParams.type = 'day'
        const ta = this.getDateRange(type) 
        this.chartParams.start_time = ta[0]
        this.chartParams.end_time = ta[1]
        this.getChartList()
        // this.getRecordList()
        // this.getSaleList()
      } else if (type==4) {
        this.pickerOpen = true
      }
    },
    //柱状图列表
    async getChartList() { 
      // const {address} = wallet.getWalletInfo()
      // const [address] = await wallet.getAccounts("bitkeep"); 
      const { address } = this.$store.state
      if (!address) return 
      this.chartParams.address = address
      this.chartParams.contract = this.selectContract.collection_contract // this.selectItem
      this.chartParams.chain = this.selectContract.chain 
      const {data, status} = await this.$api.royalties.getRoyaltyChart(this.chartParams)
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
          tooltip: {
			      crosshairs: true,
          },
          color: '#7524F9', 
          textStyle: {
            color: "#919899" //设置文字颜色
          },
          tooltip: {
            trigger: 'axis', 
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
      // const { address } = wallet.getWalletInfo()
      const { address } = this.$store.state
      const params = {
        address,
        page: 1,
        limit: 1000
      }
      const {data, status} = await this.$api.royalties.getCollections(params)
      if (status == 0) {
        this.projectList = data.list || [] 
        if (this.projectList.length > 0) {
          this.selectItem = this.projectList[0].collection_contract
          this.selectContract = this.projectList[0]
        } 
      }
    },
    handleChangeCantract(e) {  
      // console.log(e)
      this.selectContract = this.projectList.find(item => item.collection_contract == e)
      // console.log('selectContract', this.selectContract)
      // console.log('handleChangeCantract', this.selectContract)
      this.getChartList()
      this.getRecordList() 
      this.getSaleList()
    },
    //收益列表
    async getSaleList() {
      //address=zhengsy-test&chain=eth1&contract=0x918f677b3ab4b9290ca96a95430fd228b2d84817
      let {  address  } =  this.$store.state 
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bnb'
      // } else if (chainId == '0x89') {
      //   chainName='matic'
      // }   
      // const params = {
      //   address:'zhengsy-test',
      //   chain: 'eth',
      //   contract: '0x918f677b3ab4b9290ca96a95430fd228b2d84817'
      // }
      const params = {
        address,
        chain: this.selectContract.chain,
        contract: this.selectContract.collection_contract,
        start_time: this.picker1.start_time,
        end_time: this.picker1.end_time, 
      }
      try { 
        this.loading1 = true
        const {data, status} = await this.$api.royalties.getSaleOrders(params) 
        this.loading1 = false
        if (status==0) { 
          this.list1 = data.list || []
          this.accumulated1 = data.accumulated
          this.symbol = data.symbol
        } 
      } catch (error) {
        console.error(error)
        this.loading1 = false
        
      }
    },
    pageChange1(e) {
      this.pagination1.current = e
      this.getSaleList()
    },
    //打款列表
    async getRecordList() { 
      //address=test_address1&status=1&start_time=2021-07-01&end_time=2022-07-10
      // const {  address } = wallet.getWalletInfo()
      // console.log('getRecordList',this.selectedItem, this.selectContract)
      // const params = {
      //   address: 'test_address1',
      //   status: 1,
      //   start_time: '2021-07-01',
      //   end_time: '2022-07-10'
      // }
    
      const { address } = this.$store.state
      const params = {
        address,
        status: 1,
        start_time: this.picker2.start_time,
        end_time: this.picker2.end_time, 
        contract: this.selectContract.collection_contract,
        chain: this.selectContract.chain,
        page: this.pagination2.current,
        limit: this.pagination2.pageSize
      }
      this.loading2 = true
      try {
        const {data, status} = await this.$api.royalties.getRoyaltyRecord(params) 
        if (status==0) {
          this.pagination2.total = data.total
          this.list2 = data.list || []
          this.uncollected2 = data.uncollected
          this.accumulated2 = data.accumulated
          this.symbol2 = data.symbol
        }
        this.loading2 = false
      } catch (error) {
        console.error(error)
        this.loading2 = false
      }
    },
    pageChange2(e) {
      this.pagination2.current = e
      this.getRecordList()
    },
    //设置列表 
    async getSettingList() { 
      // const walletid = this.$store.state.WalletID 
      // const {  address } = wallet.getWalletInfo()
      const { address } = this.$store.state
      const params = {
        address,  
        filter: 'royalty',
        page: this.paginationSet.current,
        limit: this.paginationSet.pageSize
      }

      this.loadingSet = true
      try {
        const {data, status} = await this.$api.royalties.getCollections(params)
        this.loadingSet = false
        if (status==0) {
          this.paginationSet.total = data.total
          this.setingList = data.list || []
        }
      } catch (error) {
        console.error(error)
        this.loadingSet = false
      }
    },
    pageChangeSet(e) { 
      this.paginationSet.current = e
      this.getSettingList()
    },
    handleClickAddSetting() {
      this.$Ta.track( {
        name:"Royalty_Settings", 
      })
      this.modalType = 'create'
      this. setParams ={ 
        chain: '',
        contract: '',
        royalty_param: '', //版税比例，最多两位小数
        royalty_address: '',//版税收款地址
        royalty_chain: '',//版税收款主链
        func: 'create',//create增加版税；update更新版税
        address: '',//增加版税时校验用户address
      }  
      this.showAddModal = true
    }, 
    handleClickEditSetting(item) { 
      this.modalType = 'update'
      this. setParams ={ 
        chain: item.chain,
        contract: item.collection_contract,
        royalty_param: item.royalty_param, //版税比例，最多两位小数
        royalty_address: item.royalty_address,//版税收款地址
        royalty_chain: item.royalty_chain,//版税收款主链
        func: 'update',//create增加版税；update更新版税
        address: item.royalty_chain,//增加版税时校验用户address
      }
      this.showAddModal = true
    },
    async handleClickSubmit() { 
      // const {  address } = wallet.getWalletInfo()
      const { address } = this.$store.state 
      if (this.countDown.Submit && this.countDown.Submit > new Date()) { 
        return
      } else {
        this.countDown.Submit = +new Date() + 5000
      }
      const {token, signature, sign_address} = await this.getSignature() 
      
      this.setParams.contract = this.setParams.contract.trim()
      this.setParams.royalty_address = this.setParams.royalty_address.trim()
      if (token && signature) {
        if (this.modalType=='create') {
          this.setParams.address = address
          this.setParams.token = token
          this.setParams.signature = signature
          this.setParams.sign_address = sign_address
          // this.setParams.chain = this.setParams.royalty_chain

          const res = await this.$api.royalties.setRoyalty(this.setParams)
          if (res.status == 0) { 
            if (res.data.success == false ) {
              // this.$message.error(res.data.msg)
              this.$message.error(this.$t('royalties.text3'))
            } else {
              // this.$message.success('添加成功')
              this.$message.success(this.$t('royalties.addSuccess'))
              this.showAddModal = false 
              this.getSettingList() 
            }
          } else {
            // this.$message.error('添加失败')
            this.$message.error(this.$t('royalties.addFail'))
          } 
        } else {
          this.setParams.address = address
          this.setParams.token = token
          this.setParams.signature = signature
          this.setParams.sign_address = sign_address
          const res = await this.$api.royalties.setRoyalty(this.setParams)
          if (res.status == 0) {
            if (res.data.success == false ) {
              this.$message.error(data.msg)
            } else { 
              this.$message.success(this.$t('royalties.editSuccess'))
              this.showAddModal = false 
              this.getSettingList() 
            }
          } else { 
            this.$message.error(this.$t('royalties.editFail'))
          } 

        }
      }

    },
    async handleChangeChain() {
    }, 
    handleRoyaltyInput(e) {  
      e.target.value=e.target.value.replace(/[^\d]/g,'');
      if (+e.target.value > 10) { 
        e.target.value = '10' 
      }
      this.setParams.royalty_param = e.target.value
    }
  },
  filters: { 
    timeFormat(time, format='y-M-d h:m') {   
      return parseTime(time, format);
    },
  }
}

</script>

<style lang="less" scoped>
.royalties-center-wrap {
  .subnav {
    margin-top: 20px;
    margin-bottom: 20px;
    .btn-tab {
      margin-left: 10px;
      min-width: 100px;
      padding: 0 10px;
      height: 36px;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      cursor:pointer;
    }
    .sub-btn-add {
      height: 36px;
      box-sizing: border-box;
      padding: 5px 14px;
      border: 1px solid;
      cursor:pointer; 
      border-radius: 8px;;
    }
  } 
  .new-btn-time {
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
    color: #0e0e0e;
    background-color: #F2F2F5;
  }
  .profit-wrap { 
    margin-bottom: 60px;
    .r1 {
      gap:20px;
      .profit-view {
        padding: 20px 20px 20px 20px;
        /* Light/bg2 */ 
        border: 1px solid #F2F2F5;
        border-radius: 8px;

        .chart-box {
          // height: 290px;
          width: 457px;
          box-sizing: border-box;
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
          #chart-part {
            height: 250px;
            width: 457px;
          } 
        }  
      }
      .profit-list {
        padding: 20px 20px 0px 20px;
        border-radius: 8px;
        /* Light/bg2 */ 
        border: 1px solid #F2F2F5;
      }
    }
    .r2 {
      margin-top: 40px;
      .profit-title {
        .main-title {
          font-family: 'PingFang SC'; 
          font-weight: 600;
          font-size: 18px;
          line-height: 20px;
        }
        .sub-title {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
        }
      } 
      .status {
        padding: 4px 8px;
        border-radius: 4px;
        &.status2 {
          color: #FFB800;
          background-color: rgba(255, 184, 0, 0.1);
        }
        &.status1 {
          color: #1BC89E;
          background: rgba(27, 200, 158, 0.1);
        }
      } 
    }
    .title-field  {
      margin-left: 20px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      .title-value {
        margin-left: 4px;
        font-weight: 600;
      }
    }
    .btn-export {
      // padding: 10px 12px;
      margin-left: 20px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      // border: 1px solid #F2F2F5;
      border-radius: 8px;
    }
  }
  .my-table {
    font-size: 14px;
    /deep/.ant-table-thead > tr > th, 
    /deep/.ant-table-tbody > tr > td {
      padding: 16px 0;
      background-color: #fff; 
    }
    &.no-border { 
      /deep/.ant-table-thead > tr > th, 
      /deep/.ant-table-tbody > tr > td {
        border: none;
      }
    }

    .status {
      padding: 4px 8px;
      border-radius: 4px;
      &.status0 {
        color: #FFB800;
        background-color: rgba(255, 184, 0, 0.1);
      }
      &.status1 {
        color: #1BC89E;
        background: rgba(27, 200, 158, 0.1);;

      }
      &.status2 {
        color: #F36464;
        background:  rgba(243, 100, 100, 0.1);
      }
    }
  } 

  .empty-box {
    text-align: center; 
    .empty-icon {
      margin-top: 124px;
      img {
        width: 64px;
        height: 64px;
      }
    }
    &.empty1 {
      .empty-icon {
        margin-top: 100px;
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

    .empty-text3 {
      margin-top: 10px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
    }
    .route-btn {
      margin-top: 30px;
      width: 200px;
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

  .table-btn {
    margin-left: 20px
  }
  .modal-box {
    width: 620px;
    box-sizing: border-box;
    padding: 20px;

    .title { 
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 20px; 
    }
    .modal-form {
      margin: 30px 0 50px;
    }
    .modal-field {
      &:not(:first-child) {
        margin-top:20px;
      }
      .modal-value {
        position: relative;
        margin-top: 8px;
        i {
          position: absolute;
          top: 15px;
          right: 10px;
          font-size: 14px;
          font-style: normal;
        }
      }
    }
    .label {
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
    .input { 
      width: 580px;
      height: 50px;
      line-height: 50px;
      border-radius: 4px;
      border: 1px solid; 
    }
    .indent {
      text-indent: 10px;
    }
    .modal-btn {
      padding: 13px 0;
      width: 580px;
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      border-radius: 8px;
    }
    .ant-checkbox-wrapper {
      /deep/ .ant-checkbox-inner {
        border-radius: 50%;
      }
      /deep/ .ant-checkbox-checked::after {
        border-radius: 50%;
      }
    }

    .myselect {
      height: 50px;
      line-height: 50px;
      border-radius: 4px; 
      /deep/.ant-select-selection {
        border-color: #F2F2F5;
        height: 50px;
        .ant-select-selection__rendered {
          line-height: 50px;
        }

      }
      /deep/.ant-select-lg {
        height: 50px;
      }
    }
   
  }

  .modal-confirm {
    width: 420px;
    box-sizing: border-box;
    padding: 20px;
    .modal-content {
      margin-top: 80px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 130%;
      text-align: center;
    }
    .modal-option {
      margin-top: 90px;
      gap: 10px;
      .modal-btn {
        padding: 13px 0; 
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        border-radius: 8px;
        .btn-cancle { 
        }
        &.btn-confirm {
          color: #fff;
        }

      }
    }
  }
  .my-date-picker {
      width: 0;
      height: 0;  
      overflow: hidden;
  }
  
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  
  input::-webkit-outer-spin-button{
    -webkit-appearance: none !important;
  }
  
  input[type="number"]{
    -moz-appearance: textfield;
  } 
  /deep/ .ant-input-number-handler-wrap {
    display: none!important;
  }
}
</style>