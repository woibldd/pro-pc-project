<template>
  <div class="nft-wrap">
    <Nav>
      <div class="assets-top-right">
        <!-- <button @click="goPath('/nft/orders')" class="nav-btn text1">我的订单</button> -->
      </div>
    </Nav>
    <div class="nft-orders-wrap">
      <div class="orders-top">
        <h1 class="page-title text1">{{$t('nft.myOrder')}}</h1>
      </div>
      <div>
        <nav class="orders-nav" flex="main:justify cross:center"> 
          <div class="nav-left" flex="main:left">
              <div class="label-button text2" @click="handleTabChange(0)" :class="[tab==0? 'Common_light_purple Colorpurple':'']">{{$t('nft.orders.all')}} {{all_count}}</div>
              <div class="label-button text2" @click="handleTabChange(1)" :class="[tab==1? 'Common_light_purple Colorpurple':'']">{{$t('nft.onSale')}} {{saling_count}}</div>
              <div class="label-button text2" @click="handleTabChange(2)" :class="[tab==2? 'Common_light_purple Colorpurple':'']">{{$t('nft.saled')}} {{saled_count}}</div>
            </div>
          <div class="nav-right"> 
            <a-dropdown placement="bottomRight" overlayClassName="orders-dropdown-list">
              <label class="dropdown lineBG2 text1">
                <span>{{selectProjectItem.name}}</span> 
                <img src="@/assets/img/components/nft/icon-arrow-down.svg" alt="">
              </label>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="0" :class="{active: selectProject=='0'}">
                  {{$t('nft.allProject')}}
                </a-menu-item>
                <a-menu-item 
                  v-for="item in projectList" 
                  v-show="item.name"
                  :key="item.contract"  
                  :class="{active: selectProject==item.contract}">
                  <div class="my-dropdown-item" :title="item.name">{{item.name}}</div> 
                </a-menu-item> 
              </a-menu>
            </a-dropdown>
          </div>
        </nav>
        <div class="order-list-wrap" v-if="list.length > 0 || loading"> 
          <div v-if="loading" class="loading-box">
            <a-spin  size="large"></a-spin>
          </div>
          <div v-else class="orders-list"> 
            <div class="nft-orders-item" v-for="item in list" :key="item.order_id">
              <card-orders 
                :info="item"
                @click="handleClickDetail(item)"
                @clickCancel="handleClickCancelOrder(item)"
                @clickEdit="handleClickEditOrder(item)"
                @clickExtend="handleClickExtendOrder(item)"
                @clickReopen="handleClickReopenOrder(item)">
              </card-orders>
            </div>
          </div>
          <a-pagination 
            style="text-align:right;"
            v-model="pagination.current" 
            :total="pagination.total" 
            :pageSize="pagination.pageSize"
            @change="pagination.onChange"
            :hideOnSinglePage="pagination.hideOnSinglePage"/>
        </div>
        <div class="nft-no-item" v-else>
          <div class="empty">
            <div>
              <img src="@/assets/img/components/royalties/icon-empty.png" alt=""/>
            </div>
            <div> 
              <label class="text3">{{$t('nft.orders.nodata')}}</label>
            </div> 
          </div>
        </div>
      </div>

      <v-modal :open.sync="showCancelModal">
        <div class="modal-box modal-cancel">
          <div class="modal-title"></div>
          <div class="modal-content">
            <div class="modal-content-title text1">
              {{$t('nft.orders.text1')}}
            </div>
            <div class="modal-option">
              <div class="modal-option-btn" flex="box:mean">
                <div class="btn-cancel BG1 btn-modal" @click="showCancelModal=false">
                  {{$t('nft.orders.continue')}}
                </div>
                <div class="btn-confirm BGpurple btn-modal Common_white" @click="handleClickCancelConfirm">
                  {{$t('nft.orders.cancel')}}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </v-modal>
      <v-modal :open.sync="showExtendModal">
        <div class="modal-box modal-extend">
          <div class="modal-title"></div>
          <div class="modal-content">
            <div class="modal-content-title text1">
              {{$t('nft.orders.text2')}}
            </div>
            <div class="modal-option">
              <div class="modal-option-btn" flex="box:mean">
                <div class="btn-cancel BG1 btn-modal" @click="showExtendModal=false">
                  {{$t('nft.cancel')}}
                </div>
                <div class="btn-confirm BGpurple btn-modal Common_white" @click="handleClickExtendConfirm">
                  {{$t('nft.confirm')}}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </v-modal> 
      <v-modal :open.sync="showEditModal">
        <div class="modal-box modal-edit">
          <div class="modal-title text1">{{$t('nft.orders.text3')}}</div>
          <order-item 
            v-if="selectOrder" 
            :info="selectOrder" 
            v-model="selectOrder.amount"
            :ableEdit="true" 
            :showPrice="true">
          </order-item> 
          <div v-if="selectOrder" class="modal-content"> 
            <div class="modal-option">
              <div class="modal-option-title text1">
                {{$t('nft.orders.text4')}}
              </div>
              <div class="modal-option-list">
                <div @click="handleOrderTermChange(1)" :class="[orderTerm==1? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" class="button">{{$t('nft.time1')}}</div>
                <div @click="handleOrderTermChange(2)" :class="[orderTerm==2? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" class="button">{{$t('nft.time2')}}</div>
                <div @click="handleOrderTermChange(3)" :class="[orderTerm==3? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time3')}}</div>
                <div @click="handleOrderTermChange(4)" :class="[orderTerm==4? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time4')}}</div>
                <div @click="handleOrderTermChange(5)" :class="[orderTerm==5? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time5')}}</div>
                <!-- <div @click="handleOrderTermChange(6)" :class="[orderTerm==6? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">
                  自定义
                </div> -->
                <a-date-picker  
                  class="my-date-picker"
                  :class="[orderTerm==6? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" 
                  :disabled-date="disabledDate"
                  :placeholder="$t('nft.time6')" 
                  :format="dateFormat"  
                  @change="onChange">
                  <span slot="suffixIcon"/>
                </a-date-picker>
              </div> 
              <div class="modal-option-btn" flex="box:mean">
                <div class="btn-cancel BG1 btn-modal" @click="showEditModal=false">
                  {{$t('nft.cancel')}}
                </div>
                <div class="btn-confirm BGpurple btn-modal Common_white" @click="handleClickEditConfirm">
                  {{$t('nft.series.next')}}
                </div> 
              </div>
              <!-- <div class="btn-next BGpurple" @click="handleClickNext">
                下一步
              </div> -->
            </div>
          </div>
        </div>
      </v-modal> 
      <v-modal :open.sync="showConfirmSaleModal">
        <div class="modal-box modal-edit">
          <div class="modal-title text1">{{$t('nft.orders.text5')}}</div>
          <order-item  v-if="selectOrder" :info="selectOrder" :ableEdit="false"></order-item> 
          <div v-if="selectOrder" class="modal-content">
            <div class="modal-table">
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">{{$t('nft.series.order.platform')}}</div>
                <div class="modal-value text1">BitKeep</div>
              </div>
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">{{$t('nft.orders.time2')}}</div>
                <div class="modal-value text1">{{parseTime(end_time)}}</div>
              </div>
              <div class="modal-line  BG2"></div>
              <!-- <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">{{$t('nft.series.order.minPrice')}}</div>
                <div class="modal-value text1">{{selectOrder.amount ||0}} {{selectOrder.symbol}}</div>
              </div>
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">{{$t('nft.series.order.maxPrice')}}</div>
                <div class="modal-value text1">{{selectOrder.amount ||0}} {{selectOrder.symbol}}</div>
              </div> -->
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">
                  {{$t('nft.series.order.handling_fee')}} 
                  <a-tooltip overlayClassName="mytooltip"  :title="`${$t('nft.text1')}`" >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </div>
                <!-- <div class="modal-value text1">{{(selectOrder.amount ||0) * (selectOrder.handling_fee || 0)}} {{selectOrder.symbol}}</div> -->
                <div class="value text1">{{selectOrder.handling_fee || 0}}%</div>
              </div>
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">
                  {{$t('nft.series.order.royalty_param')}}
                  <a-tooltip overlayClassName="mytooltip"  :title="`${$t('nft.text3')}`" >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </div>
                <!-- <div class="modal-value text1">{{(selectOrder.amount ||0)  * (selectOrder.royalty_param || 0)}} {{selectOrder.symbol}}</div> -->
                <div class="value text1">{{selectOrder.royalty_param || 0}}%</div>
              </div>
              <div class="modal-line  BG2"></div>
              <div class="modal-field" flex="main:justify">
                <div class="modal-label text3">{{$t('nft.orders.price')}}</div>
                <div class="modal-value text1">
                  <!-- {{selectOrder.amount}} {{selectOrder.symbol}} -->
                  <div class="summary text1" flex="main:right">{{selectOrder.amount}} {{upcase(selectOrder.symbol)}}</div>
                  <div class="valuation text3" flex="main:right"> 
                    ~<fiatMoney :base="selectOrder.symbol" :value="selectOrder.amount"></fiatMoney>
                  </div>
                </div>
              </div>
            </div> 
            <div class="modal-option"> 
              <div class="modal-option-btn" flex="box:mean">
                <div class="btn-cancel BG1 btn-modal" @click="showConfirmSaleModal=false">
                  {{$t('nft.cancel')}}
                </div>
                <div class="btn-confirm BGpurple btn-modal Common_white" @click="handleClickSaleConfirm">
                  {{$t('nft.confirm')}}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </v-modal> 
      <v-modal :open.sync="showOrderDetailModal">
        <div class="modal-box modal-order-detail"> 
          <div class="modal-title text1">{{$t('nft.orders.detail')}}</div>
          <div v-if="selectOrder" class="modal-detail-status" flex="main:left cross:center">
            <div class="modal-detail-status-icon">
              <img class="modal-icon-order" src="@/assets/img/components/nft/icon-order.png" alt="">
              <img v-if="selectOrder.status==1 || selectOrder.status==5" class="modal-icon-status icon-status-saling" src="@/assets/img/components/nft/icon-status-saling.png" alt="">
              <img v-if="selectOrder.status==2" class="modal-icon-status icon-status-cancel" src="@/assets/img/components/nft/icon-status-cancel.png" alt="">
              <img v-if="selectOrder.status==3 || selectOrder.status==6" class="modal-icon-status icon-status-fail" src="@/assets/img/components/nft/icon-status-fail.png" alt="">
              <img v-if="selectOrder.status==4" class="modal-icon-status icon-status-success" src="@/assets/img/components/nft/icon-status-success.png" alt="">
            </div>
            <div class="modal-detail-status-text text1">
              <!-- {{orderStatusDict[selectOrder.status || 0]}} -->
              {{$t(`nft.orders.orderDict.${selectOrder.status || 0}`)}}
            </div>
          </div> 
          <div v-if="selectOrder" class="modal-content">
            <div class="modal-detail-info-box"> 
              <card-orders-m
                :info="selectOrder"
                :ableEdit="false"> 
              </card-orders-m>
            </div>
            <div class="modal-detail-info-list" v-if="selectOrderDetail">
              <div class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.platform')}}</div>
                <div class="modal-detail-value text2">
                  <img v-if="selectOrderDetail.platform_image" class="platform_image" :src="selectOrderDetail.platform_image" alt="">
                  <span>{{selectOrderDetail.platform}}</span>
                </div>
              </div>
              <div v-if="selectOrder.status==4" class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.from')}}</div>
                <div class="modal-detail-value text2 pointer" @click.stop="handleCopy(selectOrderDetail.from)">
                  {{selectOrderDetail.from}}
                  <img src="@/assets/img/components/nft/icon-copy.svg" alt="">
                </div>
              </div>
              <div v-if="selectOrder.status==4" class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.to')}}</div>
                <div class="modal-detail-value text2 pointer" @click.stop="handleCopy(selectOrderDetail.to)">
                  {{selectOrderDetail.to}}
                  <img src="@/assets/img/components/nft/icon-copy.svg" alt="">
                </div>
              </div> 
              <div v-if="selectOrder.status==4" class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.fee')}}</div>
                <div class="modal-detail-value text2">
                  {{selectOrderDetail.platform_fee}} {{selectOrderDetail.price_symbol}}
                </div>
              </div>
              <div  v-if="selectOrder.status==4" class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.creatorFee')}}</div>
                <div class="modal-detail-value text2">
                  {{selectOrderDetail.creatorFee}} {{selectOrderDetail.price_symbol}}
                </div>
              </div>
              <div v-if="selectOrder.status==4" class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.txid')}}</div>
                <div class="modal-detail-value text2 pointer"  @click.stop="handleCopy(selectOrderDetail.tx_hash)">
                  {{selectOrderDetail.tx_hash}}
                  <img src="@/assets/img/components/nft/icon-copy.svg" alt="">
                </div>
              </div>
              <div  class="modal-detail-field" flex="box:first">
                <div class="modal-detail-label">{{$t('nft.detailTable.time')}}</div>
                <div class="modal-detail-value text2">{{selectOrderDetail.create_time}}</div>
              </div>
            </div>
          </div>
        </div>
      </v-modal> 
    </div>
  </div>
</template>


<script>
import {parseTime} from '@/utils/public'
import CardOrders from '@/components/nft/CardOrders'
import CardOrdersM from '@/components/nft/CardOrdersM'
import Nav from '@/components/nft/nav'
import VModal from '@/components/nft/VModal.vue'
import OrderItem from '@/components/nft/OrderItemSeries.vue'
import fiatMoney from '@/components/nft/FiatMoney.vue'
import {wallet} from '@/utils/wallet'
import { Dropdown, DatePicker, Pagination, Icon, Spin } from 'ant-design-vue' 
import copy from 'copy-to-clipboard';
import Vue from 'vue'   

Vue.use(Dropdown)
Vue.use(DatePicker) 
Vue.use(Pagination)
Vue.use(Icon)
Vue.use(Spin)

export default {
  layout: 'nft/assets',
  data() {
    return {
      detail: {},
      list: [],
      projectList: [],
      tab: 0,
      orderTerm: 1,
      showEditModal: false,
      showCancelModal: false,
      showExtendModal: false,
      showConfirmSaleModal: false,
      showOrderDetailModal: false,
      showModal: false,
      dateFormat: 'YYYY/MM/DD',
      // disabledDate: false,
      pagination: {
        current:1,
        pageSize: 12, 
        total: 0,  
        onChange: this.pageChange,
        hideOnSinglePage: true
      },
      isFirst: true,
      loading: false,
      selectProject: '0',
      selectProjectItem: {name: this.$t('nft.allProject')},
      selectOrder: null,
      selectOrderDetail: null,
      selectNft: null,
      all_count: 0,
      saled_count: 0,
      saling_count: 0,
      end_time: '',
      orderStatusDict: [
        '',
        '出售中',
        '已取消出售',
        '超过出售时间',
        '出售成功',
        '上架中...',
        '上架失败',
      ]
    }
  },
  watch: {
    "$store.state.WalletID": function (newVal, oldVal) {
      // console.log({newVal, oldVal})
      if (this.isFirst) {
        this.pagination.current = 1
        this.getList()   
      }
    },
    "$store.state.chainId": function (newVal, oldVal) { 
      if (this.isFirst) {
        this.pagination.current = 1
        this.getList()  
      }
    }
  },
  components: {
    CardOrders,
    CardOrdersM,
    OrderItem,
    VModal,
    fiatMoney,
    Nav 
  },
  methods: {
    parseTime,
    upcase(str='') {
      if (str) {
        return str.toUpperCase()
      }
    },
    goPath(path) {
      const { language } = this.$route.params
      this.$router.push({
        path: '/'+ language + path
      })
    },
    handleTabChange(id) {
      this.tab = id
      this.pagination.current = 1
      this.getList()
    },
    handleOrderTermChange(id) {
      if (id != 6) {
        this.orderTerm = id 
        this.end_time = new Date() 
        switch (id) {
          case 1: //7天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 7
            break;
          case 2: //30天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 30
            break;
          case 3: //90天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 90
            break;
          case 4: //180天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 180
            break;
          case 5: //10年后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 365 * 10
            break; 
          default:
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 7
            break;
        }
      }  
    },
    onChange(date, dateString) {
      // console.log(date, dateString);
      if (!date) {
        this.orderTerm = 0
      } else {
        let date = new Date(dateString + ' 23:59:59')
        this.end_time = +date
        this.orderTerm = 6
      }
    },
    disabledDate(current) { 
      return current && current < new Date();
    },
    getChainName(chinid) { 
      switch (chinid) {
        case "0x80":
          return "HT";
        case "0x42":
          return "OKT";
        case "0x38":
          return "BNB";
        case "0x89":
          return "MATIC";
        case "0xa86a":
          return "AVAX";
        case "0xfa":
          return "FTM";
        case "0xa4b1":
          return "ARBITRUM";
        case "0x141":
          return "KCC";
        case "0x7a":
          return "FUSE";
        case "0x1":
          return "ETH";
        case "0x2019":
          return "KLAY";
        case "0xa":
          return "OP";
        case "0x120":
          return "BOBA";
        case "0xc7":
          return "BTT";
        default:
          return "ETH";
      }
    },
    async getList() { 
      // const { address } = this.$store.state  
      //出售状态：saling出售中，saled已出售
      const dict = ['', 'saling', 'saled']
      const status = dict[this.tab ] 

      const { chainId, address } = this.$store.state
      if (!chainId || !address) {
        this.isFirst = false
        return
      }
      let chain = this.getChainName(chainId).toLowerCase()
      // if (chainId=='0x1') {
      //   chain='eth'
      // } else if (chainId == '0x38') {
      //   chain='bnb'
      // } else if (chainId == '0x89') {
      //   chain='matic'
      // }   
      
      const params = {
        chain,
        address,
        status,
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
      //chain=bnb&page=1&limit=1&contract=0xbd241a0a4af64738dc7e8a78abda9d2fe1256dc4&address=0x0A1Cf7B323D6ADe8c311Fc01fF81b652861c3581
      // const params = {
      //   address:'0x0A1Cf7B323D6ADe8c311Fc01fF81b652861c3581',
      //   chain:'bnb', 
      //   status,
      //   page: this.pagination.current,
      //   limit: this.pagination.pageSize
      // }
      this.loading = true
      if (this.selectProject!='0') {
        params.contract = this.selectProject
      }
      try {
        const res = await this.$api.nft.getMyOrders(params) 
        this.isFirst = false
        // console.log(res)
        if (res.status==0) {
          this.loading = false
          this.list = res.data.list
          this.all_count = res.data.all_count
          this.saled_count = res.data.saled_count
          this.saling_count = res.data.saling_count
          this.pagination.total = res.data.total
        } else { 
          if (res.data?.message != 'canceled') {
            this.loading = false
            this.list = []
            this.pagination.total = 0
            this.all_count = 0
            this.saled_count = 0
            this.saling_count = 0
          }   
        } 
      } catch (error) {
        this.isFirst = false
        this.loading = false
        console.error(error)
      }
    }, 
    async getProjectList() {  
      // this.loading = true 
      const { chainId, address } = this.$store.state
      let chainName = this.getChainName(chainId).toLowerCase()
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bnb'
      // } else if (chainId == '0x89') {
      //   chainName='matic'
      // }   
      const params = {
        address,  
        chain: chainName 
      } 
      //测试数据
      //chain=matic&address=0xe2A2669ae5819bBfA2bd4022a7DCC9f16ba3086d
      // params.address = '0xe2A2669ae5819bBfA2bd4022a7DCC9f16ba3086d'
      // params.chain='matic'
      try {  
        const {data, status} = await this.$api.nft.getMyCollections(params)  
        if (status==0) { 
          this.projectList = data || []
        } 
        // this.loading = false
      } catch (error){ 
        console.error(error)
        // this.loading = false
      }
    },
    pageChange(e) { 
      this.pagination.current = e
      this.getList()
    },
    handleMenuClick(e, item) {
      // console.log(e, item, 'lll')
      this.selectProject = e.key
      if (e.key == 0) {
        this.selectProjectItem = {name: this.$t('nft.allProject')}
      } else {
        this.selectProjectItem = this.projectList.find(item => item.contract==e.key)
      }

      this.pagination.current = 1
      this.getList()
    },
    async getToken() { 
      const { address } = this.$store.state
      const res = await this.$api.nft.getToken({address})
      if (res.status==0) {
        return res.data.market_token
      } else {
        return ''
      }
    }, 
    //详情
    async handleClickDetail(order) {  
      this.selectOrder = order
      const res = await this.$api.nft.getOrderDetail({id: order.order_id}) 
      if (res.status == 0) { 
        this.selectOrderDetail = res.data
      } else {
        this.selectOrderDetail = {} 
      }
      // console.log(res.data)

      this.showOrderDetailModal = true
    },
    //取消订单
    handleClickCancelOrder(order) {
      // console.log(order)
      this.selectOrder = order
      this.showCancelModal = true
    },
    //修改订单
    handleClickEditOrder(order) { 
      this.selectOrder = order
      // this.selectOrder.amount = this.selectOrder.price
      this.$set(this.selectOrder, 'amount',  this.selectOrder.price)
      this.showEditModal = true
      this.handleOrderTermChange(1)
      // console.log(order,'aaaaaaaa')
      // this.orderCreate(this.selectOrder, '2022-8-1 01:01:01')
    },
    //延长至售出
    handleClickExtendOrder(order) {
      // console.log(order,22222) 
      this.selectOrder = order
      this.showExtendModal = true
    },
    //重新打开
    handleClickReopenOrder(order) {
      // console.log(order)
      this.selectOrder = order
    },
    //取消出售
    async handleClickCancelConfirm() {
      const { address } = this.$store.state
      const market_token = await this.getToken()
      if (!market_token) return 
      // console.log('selectOrder:', this.selectOrder) 
      const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const verifyToken = await wallet.CheckSign(market_token + str, address)  
      const params = {
        market_token,
        address,
        verifyToken,
        order_id: this.selectOrder.order_id,
      }
      const res = await this.$api.nft.cancelOrder(params) 
      // console.log(res)
      if (res.status == 0 && !res.data.errMsg) {
        this.showCancelModal = false
        this.getList()
      } else {
        this.$message.error(this.$t('nft.submitFail'))
      }
    }, 
    async handleClickExtendConfirm() { 
      // await this.orderCancel(this.selectOrder) 
      const newEndTime = (+new Date()) + 1000 * 60 * 60 * 24 * 365 * 10
      const result = await this.orderCancel(this.selectOrder)
      if (result) {
        await this.orderCreate(this.selectOrder, newEndTime)
      }
    }, 
    async handleClickEditConfirm() {
      if (!this.selectOrder.amount || this.selectOrder.amount == 0) {
        this.$message.warn(this.$t('nft.orders.text6'))
        return 
      }
      this.showEditModal = false
      this.showConfirmSaleModal = true
    }, 
    async handleClickSaleConfirm() {
      const result = await this.orderCancel(this.selectOrder)
      if (result) {
        await this.orderCreate(this.selectOrder, this.end_time)
      }
    }, 
    async orderCancel(order ) { 
      try { 
        const { address } = this.$store.state
        const market_token = await this.getToken()
        if (!market_token) return false
        // console.log('selectOrder:', order) 
        const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' 
        const verifyToken = await wallet.CheckSign(market_token+str, address)  
        const params = {
          market_token,
          address,
          verifyToken,
          order_id: order.order_id,
        }
        const res = await this.$api.nft.cancelOrder(params) 
        if (res.status==0 && res.data.status==0) {
          return true
        } else { 
          this.$message.error(res.data.errMsg)
          return false
        }
      } catch (error) {
        console.error(error)
        return false
        // this.$message.error(error)
      }
    },
    async orderCreate(order, end_time) {
      // console.log('asdfasdf') 
      const { address } = this.$store.state 
      const params = {
        address,
        chain: order.chain,
        contract: order.collection_contract,
        token_id: order.token_id,
        sale_end_time: end_time,
        price: order.amount || order.price,
        price_coins: {
          chain: order.chain,
          symbol: order.symbol,
          contract:'0x0000000000000000000000000000000000000000'
        },
        platform: 'BitKeep'
      }
      try { 
        const res = await this.$api.nft.confirmSale(params) 
        if (res.status == 0 && res.data.status ==0) {
          let {order_id, sign_data, txs} = res.data   
          const order_sign = await wallet.CheckSign(sign_data, address) 

          const params2 = {
            order_id,
            order_sign, 
          }
          const result = await this.$api.nft.saveSign(params2)

          if (res.status == 0 && res.data.status ==0) {
            this.$message.success(this.$t('nft.editSuccess'))
            this.showConfirmSaleModal = false
            this.showExtendModal=false
            this.getList()
          } else {
            this.$message.error(this.$t('nft.editFail')) 
          }
        } 
      } catch (error) {
        console.error(error)
        // this.$message.error(error)
      }
    }, 
    handleCopy(data) {
        if (!data) {
          this.$message.warning(this.$t('header.Nocopy'))
          return
        }
        copy(data)
        this.$message.success(this.$t('header.copySuccess'))
    },

  },
  mounted() {
    this.getProjectList()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.nft-orders-wrap {
  min-width: 1200px;
  .orders-top {
    .page-title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
    }
  }
  .orders-nav {
    height: 50px;
    .nav-left {
      .label-button {
        padding: 10px 15px;
        margin-right: 10px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px; 
        border-radius: 100px;
        cursor: pointer;
      }
    }
    .nav-right {
      .dropdown {
        padding: 10px 14px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 500;
        font-style: normal;
        font-family: 'PingFang SC';
        border: 1px solid ;
        border-radius: 8px;
        img {
          margin-left: 5.5px;
        }
      }
    }
  }
  .order-list-wrap {
    margin-bottom: 63px;
    .loading-box {
      margin-top: 180px;
      margin-bottom: 180px;
      text-align: center;
    }
    .orders-list { 
      display: grid;
      margin-top: 10px;
      margin-bottom: 23px;
      gap: 20px;
    } 
  }
  .nft-no-item {
    padding: 138px 0;
    text-align: center;
    img {
      width: 64px;
    }
  }

  .my-date-picker {
      border: 1px solid;
      border-radius: 100px;
      overflow: hidden;
      min-width: 118px!important;
      /deep/ .ant-input { 
        height: 38px;
        line-height: 38px;
        border:none;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        text-align: center; 
        cursor: pointer; 
        background-color: transparent;
      &::-webkit-input-placeholder{
          color:@theme-light-text1;
      }
      &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:@theme-light-text1;
      }
      &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:@theme-light-text1;
      }
      &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
          color:@theme-light-text1;
      }

    }
  }
} 


.nft-wrap {
  min-width: 1200px;
  .nav-btn {
    padding: 6.5px 14px;
    border: 1px solid #F2F2F5;
    border-radius: 8px;
  }
}

.orders-dropdown-list {
  max-height: 250px;
  overflow-y: scroll;
  .ant-dropdown-menu-item {
    min-width: 174px;
    padding: 14px 0;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    line-height: 130%;
    &.active {
      color: @theme-light-purple;
      font-weight: 600; 
    }
  }
}

.modal-box { 
    width: 420px;
  .modal-title {
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    
  }
  .modal-content { 
    padding: 0 20px;
    .modal-content-title {
      margin-top: 40px;
      margin-bottom: 78px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      /* identical to box height, or 140% */ 
      text-align: center; 
      line-height: 60px;
      height: 60px;
      /* Light/text1 */ 
      color: #0E0E0E;
    }
    .modal-option {
      .modal-option-title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        height: 32px;
      }
      .modal-option-btn {
        margin-top: 30px;
        gap: 12px;
        .btn-modal { 
          height: 50px;
          line-height: 50px;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }
      }
      .modal-option-list { 
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 13px;
        grid-row-gap: 10px; 
        .button {
          padding: 10px 0;
          border: 1px solid;
          border-radius: 100px;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          cursor: pointer;
        } 
      }
    }

    .modal-table { 
      .modal-line {
        margin: 15px 0;
        height: 1px;
      } 
      .modal-field {
        margin-bottom: 15px;
        .modal-label {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
        }
        .modal-value {
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          .summary {
            font-weight: 600;
            font-size: 24px;
            line-height: 150%;
          }
          .valuation {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px; 
          }
        }
      } 
    } 
  } 
  &.modal-order-detail { 
    border-radius: 12px;
    overflow: hidden;
    .modal-title,.modal-detail-status {
      background-color: #F8F8F9;
    }
    .modal-detail-status {
      padding: 0 20px;
      margin-bottom: 20px;
      height: 80px;
      .modal-detail-status-icon {
        position: relative;
        .modal-icon-order {
          height: 50px;
          width: 50px;
        }
        .modal-icon-status {
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 18px;
          height: 18px;
        }
      }
      .modal-detail-status-text {
        margin-left: 20px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
      } 
    }
    .modal-detail-info-list {
      margin-top: 30px;
      .modal-detail-field {
        margin-bottom: 15px;
        .modal-detail-label {
          width: 114px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
        }
        .modal-detail-value { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          word-break: break-all; 
          .platform_image {
            margin-right: 4px;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

}

.ant-dropdown-content {
  max-height: 350px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      display: none;
  }
  .ant-dropdown-menu-item {
    .my-dropdown-item {
      max-width: 200px;
      overflow: hidden;
      margin: 0 20px;
      text-overflow: ellipsis; 
    }
  } 
}

.nft-wrap {
  .nav-btn {
    padding: 6.5px 14px;
    border: 1px solid #F2F2F5;
    border-radius: 8px;
  }
}

// @media screen and (max-width: 1200px) and (min-width: 831px) {
@media screen and (min-width: 1500px) { 
  .order-list-wrap {
    .orders-list { 
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
}

@media screen and (max-width: 1499px)  {
  .order-list-wrap {
    .orders-list { 
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

</style>


<style  lang="less">
.mytooltip {
  max-width: 240px;
  .ant-tooltip-content {
    .ant-tooltip-inner {
      padding:10px;
      border: 1px solid #F2F2F5;
      box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      background-color: #fff;
      color: #0E0E0E;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
    } 
    .ant-tooltip-arrow:before {
      background-color: #fff;
    }
  } 
}
</style>